import { useState, useEffect } from "react";
import { CategoriesAPI } from "../services/apis/CategoriesAPI";
import { CoursesAPI } from "../services/apis/CoursesAPI";
import { ProgramsAPI } from "../services/apis/ProgramsAPI";
import { PriceAPI } from "../services/apis/PriceAPI";
import useToast from "./useToast";
import { ToastVariants } from "../utils/constants";

const useProgramDetails = (props) => {
  const { program } = props;
  const { showToast } = useToast();
  const [programFormData, setProgramFormData] = useState(
    program ? program : {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tagsData, setTagsData] = useState({});
  const [priceData, setPriceData] = useState({
    offerId: -1,
    basicPrice: 0,
  });

//console.log("Program detals",props)

  const getPriceInfo = async (programId) => {
    if (programId) {
      var priceInfo = await PriceAPI.getPriceDetails(programId, "program");
    //  console.log("Loaded Priceinfo of program :", programId, priceInfo);
      return priceInfo;
    }
    return {};
  };

  const updateProgramFormData = (newData) => {
    setProgramFormData((formData) => ({
      ...formData,
      ...newData,
    }));
  };

  const getCourses = () => {
    return courses;
  };

  const getPrice = () => {
  //  console.log("Calling get price...now price data is:", priceData);
    return priceData;
  };

  const loadCourses = async () => {
    var coursesRes = await CoursesAPI.getCourses();
   // console.log("Retrieved courses data..", coursesRes.data.data.courses);
    var coursesExtract = coursesRes.data.data.courses;
    var transformedCourses = coursesExtract.map((course) => {
      return { value: course.id, label: course.title };
    });
    setCourses(transformedCourses);
  };

  const isProgramCreated = () => {
    return program ? true : false;
  };

  const handleSubmit = async () => {
    const programData = {
      title: programFormData.title,
      description: programFormData.description,
      orderBy: programFormData.orderBy,
      category: programFormData.category,
      courseIds: programFormData.courses,
      bannerUrl: programFormData.bannerUrl,
      isActive: programFormData.isActive,
      //Price data.
      basicPrice: programFormData.basicPrice ? programFormData.basicPrice : 0,
      offerId: programFormData.offerId,
      offerAmtApplied: programFormData.offerAmtApplied,
      postOfferPrice: programFormData.postOfferPrice,
      reviewStatus: programFormData.reviewStatus
        ? programFormData.reviewStatus.toLowerCase()
        : "pending",
      contentSpecialityTags: programFormData.contentSpecialityTags,
      skillTags: programFormData.skillTags,
    };

    console.log("Program data recieved to be saved.:::::", programData);

    try {
      const { data: responseData } = await (isProgramCreated()
        ? ProgramsAPI.updateProgram({
            programId: programFormData.id,
            program: programData,
          })
        : ProgramsAPI.createProgram({
            program: programData,
          }));

      if (responseData.status === "SUCCESS") {
        const program = responseData.data.program;

        showToast(
          !isProgramCreated()
            ? "Successfully Created Program"
            : "Successfully Updated Program",
          ToastVariants.success
        );

        return program;
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "useProgramDetails: handleSubmit: create/update program failed:",
        error
      );
      showToast(
        !isProgramCreated()
          ? "Failed to create program. Please try again."
          : "Failed to create program. Please try again",
        ToastVariants.error
      );

      throw error;
    }
  };

  


  const getCategoryOptions = () => {
    return categories
      ? categories.map((category) => {
          return {
            label: category.title,
            value: category.id,
          };
        })
      : [];
  };

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await CategoriesAPI.getCategories({
        showMapping: false,
        type: "category",
        isProgramCategory: true,
      });

      if (responseData.status === "SUCCESS") {
       // console.log("Recieved categories information",responseData.data)
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

      await loadCourses();
      if (programFormData.id) {
        var programPrice = await getPriceInfo(programFormData.id);
        setPriceData(programPrice[0]);
       // console.log("Getting price data of programid", programFormData.id,programPrice);

        updateProgramFormData({
          basicPrice: (programPrice[0] || {}).basicPrice,
        });
      //  console.log("Recieved price data", programPrice[0]);
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

  const getReviewStatusOptions = () => {
    return tagsData["Review Status"]
      ? tagsData["Review Status"].map((tag) => ({
          label: tag.name,
          value: tag.name,
        }))
      : [];
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

  useEffect(() => {   
    getData();   
  }, []);

  return {
    programFormData,
    updateProgramFormData,
    loading,
    getCourses,
    getPrice,
    getCategoryOptions,
    handleSubmit,
    isProgramCreated,
    getReviewStatusOptions,
    getContentSpecialityOptions,
    getContentSpecialityTitle,
    getSkillLevelTitle,
    getSkillOptions,
  };
};

export default useProgramDetails;
