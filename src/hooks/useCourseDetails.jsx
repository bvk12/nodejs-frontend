import { useRef, useState, useEffect } from "react";

import { CategoriesAPI } from "../services/apis/CategoriesAPI";
import { CoursesAPI } from "../services/apis/CoursesAPI";
import { PriceMetadataAPI } from "../services/apis/PriceMetadataAPI";
import { ReviewStatusStates, ToastVariants } from "../utils/constants";
import usePriceData from "./usePriceData";
import useToast from "./useToast";
import { isCourseFree } from "../utils/helper";

const useCourseDetails = (props) => {
  const { course } = props;

  const { showToast } = useToast();

  const [courseFormData, setCourseFormData] = useState(course ? course : {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [categories, setCategories] = useState([]);
  const [tagsData, setTagsData] = useState({});

  const { priceData, setPriceData, priceLoading } = usePriceData(
    courseFormData.id,
    "course"
  );

  const updateCourseFormData = (newData) => {
    setCourseFormData((courseFormData) => ({
      ...courseFormData,
      ...newData,
    }));
  };

  const isCourseCreated = () => {
    return course ? true : false;
  };

  const handleSubmit = async () => {
    const courseData = {
      title: courseFormData.title,
      shortDescription: courseFormData.shortDescription,
      description: courseFormData.description,
      category: courseFormData.category,
      levelTag: courseFormData.levelTag,
      language: "English",
      skillTags: courseFormData.skillTags,
      contentSpecialityTags: courseFormData.contentSpecialityTags,
      requirements: courseFormData.requirements,
      outcomes: courseFormData.outcomes,
      metaKeywords: courseFormData.metaKeywords,
      metaDescription: courseFormData.metaDescription,
      overviewProvider: courseFormData.overviewProvider,
      overviewUrl: courseFormData.overviewUrl,
      thumbnailUrl: courseFormData.thumbnailUrl,
      reviewStatus: courseFormData.reviewStatus,
      isActive: courseFormData.isActive,
      isProgram: courseFormData.isProgram,
    };

    try {
      const { data: responseData } = await (isCourseCreated()
        ? CoursesAPI.updateCourse({
            courseId: courseFormData.id,
            course: courseData,
          })
        : CoursesAPI.createCourse({
            course: courseData,
          }));

      if (responseData.status === "SUCCESS") {
        const course = responseData.data.course;

        showToast(
          !isCourseCreated()
            ? "Successfully Created Course"
            : "Successfully Updated Course",
          ToastVariants.success
        );

        const isFreeCourse = isCourseFree(courseFormData.contentSpecialityTags);

        if (!isFreeCourse) {
          // updating course price
          const { data } = await (!priceData.id
            ? PriceMetadataAPI.addPrice({
                price: {
                  ...priceData,
                  courseId: course.id,
                  courseType: "course",
                },
              })
            : PriceMetadataAPI.updatePrice({
                priceId: priceData.id,
                price: {
                  basicPrice: priceData.basicPrice,
                  offerAmtApplied: priceData.offerAmtApplied,
                  postOfferPrice: priceData.postOfferPrice,
                  offerId: priceData.offerId,
                },
              }));
        }

        return course;
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "useCourseDetails: handleSubmit: create/update course failed:",
        error
      );
      showToast(
        !isCourseCreated()
          ? "Failed to create course. Please try again."
          : "Please try again. Failed to update course. "+error,
        ToastVariants.error
      );

      throw error;
    }
  };

  const getCategoryOptions = () => {
    return categories
      ? categories.map((category) => ({
          label: category.title,
          value: category.id,
          options:
            category.subCategories && category.subCategories.length > 0
              ? category.subCategories.map((subCategory) => ({
                  label: subCategory.title,
                  value: subCategory.id,
                }))
              : [],
        }))
      : [];
  };

  const getCategoryTitle = (categoryId) => {
    if (!categories) return;

    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];

      if (!category.subCategories) continue;

      let subCategories = category.subCategories;
      for (let j = 0; j < subCategories.length; j++) {
        if (subCategories[j].id === categoryId) {
          return subCategories[j].title;
        }
      }
    }
  };

  const getDifficultyLevelOptions = () => {
    return tagsData["Difficulty Level"]
      ? tagsData["Difficulty Level"].map((tag) => ({
          label: tag.name,
          value: tag.id,
        }))
      : [];
  };

  const getDifficultyLevelTitle = (levelTag) => {
    if (!tagsData["Difficulty Level"]) return;

    let difficultyLevels = tagsData["Difficulty Level"].find(
      (tag) => tag.id === levelTag
    );
    return difficultyLevels?.name;
  };

  const getSkillOptions = () => {
    return tagsData["Skill"]
      ? tagsData["Skill"].map((tag) => ({
          label: tag.name,
          value: tag.id,
        }))
      : [];
  };

  const getSkillLevelTitle = (skillTag) => {
    if (!tagsData["Skill"]) return;

    let skillTags = tagsData["Skill"].find((tag) => tag.id === skillTag);
    return skillTags?.name;
  };

  const getContentSpecialityOptions = () => {
    return tagsData["Content Speciality"]
      ? tagsData["Content Speciality"].map((tag) => ({
          label: tag.name,
          value: tag.id,
        }))
      : [];
  };

  const getContentSpecialityTitle = (contentSpecialityTag) => {
    if (!tagsData["Content Speciality"]) return;

    let contentSpecialityTags = tagsData["Content Speciality"].find(
      (tag) => tag.id === contentSpecialityTag
    );
    return contentSpecialityTags?.name;
  };

  const getReviewStatusOptions = () => {
    // for now using hardcoded review statuses
    // return tagsData["Review Status"]
    //   ? tagsData["Review Status"].map((tag) => ({
    //       label: tag.name,
    //       value: tag.name,
    //     }))
    //   : [];

    return Object.values(ReviewStatusStates).map((reviewState) => ({
      label: getReviewStatusLabel(reviewState),
      value: reviewState,
    }));
  };

  const getReviewStatusLabel = (reviewStatus) => {
    return reviewStatus
      ? reviewStatus.charAt(0).toUpperCase() + reviewStatus.slice(1)
      : "";
  };

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await CategoriesAPI.getCategories({
        showMapping: true,
      });

      if (responseData.status === "SUCCESS") {
        setCategories(responseData.data.category);
      } else {
        throw responseData.message;
      }

      var params = new URLSearchParams();
      params.append("type", "Difficulty Level");
      params.append("type", "Skill");
      params.append("type", "Review Status");
      params.append("type", "Content Speciality");
      const { data: tagsData } = await CoursesAPI.getTags(params);

      if (tagsData.status === "SUCCESS") {
        setTagsData(tagsData.data.tags[0]);
      } else {
        throw tagsData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useCategories: getCategories: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    courseFormData,
    updateCourseFormData,
    loading,
    getCategoryOptions,
    getDifficultyLevelOptions,
    handleSubmit,
    getSkillOptions,
    getContentSpecialityOptions,
    getReviewStatusOptions,
    isCourseCreated,
    getCategoryTitle,
    getDifficultyLevelTitle,
    getSkillLevelTitle,
    getContentSpecialityTitle,
    getReviewStatusLabel,
    priceData,
    priceLoading,
    setPriceData,
  };
};

export default useCourseDetails;
