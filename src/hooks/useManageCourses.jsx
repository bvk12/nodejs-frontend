import { useEffect, useState } from "react";
import { CategoriesAPI } from "../services/apis/CategoriesAPI";
import { CoursesAPI } from "../services/apis/CoursesAPI";

import { ACTIVE_FILTER_STATES, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const useManageCourses = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeFilter, setActiveFilter] = useState(ACTIVE_FILTER_STATES.active);
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const [coursesData, setCoursesData] = useState();
  const [categories, setCategories] = useState();
  const [filteredData, setFilteredData] = useState();

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await CoursesAPI.getCourses({
        isActive: "A",
      });

      if (responseData.status === "SUCCESS") {
        setCoursesData(responseData.data.courses);
      } else {
        throw responseData.message;
      }

      const { data: categoriesData } = await CategoriesAPI.getCategories({
        showMapping: true,
      });

      if (responseData.status === "SUCCESS") {
        setCategories(categoriesData.data.category);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useCategories: getData: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getCategoryOptions = () => {
    let options = categories.map((category) => ({
      label: category.title,
      value: category.id,
      options:
        category.subCategories && category.subCategories.length > 0
          ? category.subCategories.map((subCategory) => ({
              label: subCategory.title,
              value: subCategory.id,
            }))
          : [],
    }));

    return [{ label: "All", value: -1 }, ...options];
  };

  const getCategoryTitle = (categoryId) => {
    if (categoryId === -1) return "All";

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

  useEffect(() => {
    if (!coursesData) return;

    let newFilteredCourses = [];

    if (activeFilter === ACTIVE_FILTER_STATES.active) {
      newFilteredCourses = coursesData.filter((course) => course.isActive);
    } else if (activeFilter === ACTIVE_FILTER_STATES.inActive) {
      newFilteredCourses = coursesData.filter((course) => !course.isActive);
    } else {
      newFilteredCourses = [...coursesData];
    }

    if (selectedCategory !== -1) {
      newFilteredCourses = newFilteredCourses.filter(
        (course) => course.category === selectedCategory
      );
    }

    setFilteredData(newFilteredCourses);
  }, [coursesData, activeFilter, selectedCategory]);

  const deleteCourse = async (deletedCourse) => {
    const newCourseData = {
      ...deletedCourse,
      isActive: false,
    };

    delete newCourseData.id;

    try {
      const { data: responseData } = await CoursesAPI.updateCourse({
        courseId: deletedCourse.id,
        course: newCourseData,
      });

      if (responseData.status === "SUCCESS") {
        let newCourses = coursesData.filter(
          (course) => course.id !== deletedCourse.id
        );

        setCoursesData([...newCourses, responseData.data.course]);
        showToast("Successfully Deleted Course", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "useManageCourses: deleteCourse: delete course failed:",
        error
      );
      showToast(
        "Failed to delete course. Please try again",
        ToastVariants.error
      );
    }
  };

  return {
    loading,
    error,
    coursesData,
    activeFilter,
    filteredData,
    setActiveFilter,
    getCategoryOptions,
    setSelectedCategory,
    selectedCategory,
    getData,
    deleteCourse,
    getCategoryTitle,
  };
};

export default useManageCourses;
