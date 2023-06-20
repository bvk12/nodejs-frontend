import { useEffect, useState } from "react";
import { CourseDataAPI } from "../services/apis/CourseDataAPI";

const useCourseCategories = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [courseCategories, setCourseCategories] = useState([]);

  const getCourseCategories = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await CourseDataAPI.getCourseCategories({
        type: "category",
        isProgramCategory: false,
      });

      if (responseData.status === "SUCCESS") {
        setCourseCategories(responseData.data.category);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useCourseCategories: getCatgetCourseCategoriesegories: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseCategories();
  }, []);

  return {
    loading,
    error,
    courseCategories,
  };
};

export default useCourseCategories;
