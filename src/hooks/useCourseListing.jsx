import { useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CategoriesAPI } from "../services/apis/CategoriesAPI";
import { CourseDataAPI } from "../services/apis/CourseDataAPI";
import { CoursesAPI } from "../services/apis/CoursesAPI";

const useCourseListing = () => {
  const location = useLocation();
  const router = useIonRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [courses, setCourses] = useState();
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    label: "All",
    value: -1,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [tagsData, setTagsData] = useState({});

  const [selectedSubCategory, setSelectedSubcategory] = useState({
    label: "All",
    value: -1,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let categoryId = params.get("categoryId");

    if (categoryId) {
      categoryId = Number(categoryId);

      let selectedCategoryObj = categories.find(
        (category) => category.id === categoryId
      );

      if (!selectedCategoryObj) {
        return;
      }

      let selectedCategoryTitle = selectedCategoryObj.title;

      setSelectedCategory({
        label: selectedCategoryTitle,
        value: categoryId,
      });
    } else {
      setSelectedCategory({
        label: "All",
        value: -1,
      });
    }

    const searchText = params.get("searchQuery");
    setSearchQuery(searchText);
  }, [location.search, categories]);

  const getCategoryOptions = () => {
    let options = categories.map((category) => ({
      label: category.title,
      value: category.id,
    }));

    return [{ label: "All", value: -1 }, ...options];
  };

  const getSubcategoryOptions = () => {
    if (selectedCategory.value === -1) {
      return [];
    }

    let selectedCategoryObj = categories.find(
      (category) => category.id === selectedCategory.value
    );

    if (!selectedCategoryObj) return [];

    let options =
      selectedCategoryObj.subCategories &&
      selectedCategoryObj.subCategories.length > 0
        ? selectedCategoryObj.subCategories.map((subCategory) => ({
            label: subCategory.title,
            value: subCategory.id,
          }))
        : [];

    return [{ label: "All", value: -1 }, ...options];
  };

  const getCourseData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: courseResponseData } = await CourseDataAPI.getCourses({
        showPrices: true,
        isProgram: false,
      });

      if (courseResponseData.status === "SUCCESS") {
        setCourses(courseResponseData.data.courses);
      } else {
        throw courseResponseData.message;
      }

      const { data: responseData } = await CategoriesAPI.getCategories({
        showMapping: true,
        isProgramCategory: false,
      });

      if (responseData.status === "SUCCESS") {
        setCategories(responseData.data.category);
      } else {
        throw responseData.message;
      }

      var params = new URLSearchParams();
      params.append("type", "Difficulty Level");
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
        "useCourseCategories: getCourseData: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(location.search);
    if (category.value !== -1) {
      params.set("categoryId", category.value);

      setSelectedCategory({ ...category });
    } else {
      params.delete("categoryId");

      setSelectedCategory({
        label: "All",
        value: -1,
      });
    }

    setSelectedSubcategory({
      label: "All",
      value: -1,
    });

    router.push({ search: params.toString() });
  };

  const handleSubcategoryChange = (subCategory) => {
    setSelectedSubcategory({
      ...subCategory,
    });
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const getTrendingCourses = () => {
    if (!courses) return {};
    let trendingCourses = courses.filter((course) =>
      course.contentSpecialityTags.includes(13)
    );
    return trendingCourses;
  };

  useEffect(() => {
    if (!courses) return;

    let newFilteredCourses = courses;

    if (selectedCategory.label !== "All") {
      if (selectedSubCategory.label !== "All") {
        newFilteredCourses = courses.filter(
          (course) => course.category === selectedSubCategory.value
        );
      } else {
        newFilteredCourses = courses.filter((course) => {
          let courseSubCategory = course.category;

          let selectedCategoryObj = categories.find(
            (category) => category.id === selectedCategory.value
          );

          let subCategoryIds = selectedCategoryObj.subCategories
            ? selectedCategoryObj.subCategories.map(
                (subCategory) => subCategory.id
              )
            : [];

          return subCategoryIds.includes(courseSubCategory);
        });
      }
    }
    if (searchQuery) {
      newFilteredCourses = newFilteredCourses.filter((course) =>
        course?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(newFilteredCourses);
  }, [courses, selectedCategory, selectedSubCategory, searchQuery]);

  const getContentSpecialityTitle = (contentSpecialityTag) => {
    if (!tagsData["Content Speciality"]) return;

    let contentSpecialityTags = tagsData["Content Speciality"].find(
      (tag) => tag.id === contentSpecialityTag
    );
    return contentSpecialityTags?.name;
  };

  const getDifficultyLevelTitle = (levelTag) => {
    if (!tagsData["Difficulty Level"]) return;

    let difficultyLevels = tagsData["Difficulty Level"].find(
      (tag) => tag.id === levelTag
    );
    return difficultyLevels?.name;
  };

  return {
    loading,
    filteredCourses,
    categories,
    getCategoryOptions,
    selectedCategory,
    setSelectedCategory,
    handleCategoryChange,
    getSubcategoryOptions,
    handleSubcategoryChange,
    selectedSubCategory,
    getDifficultyLevelTitle,
    getContentSpecialityTitle,
    getTrendingCourses,
  };
};

export default useCourseListing;
