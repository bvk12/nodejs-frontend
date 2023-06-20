import { useEffect, useState } from "react";
import { CategoriesAPI } from "../services/apis/CategoriesAPI";
import { ProgramsAPI } from "../services/apis/ProgramsAPI";

import { ACTIVE_FILTER_STATES, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const useManagePrograms = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeFilter, setActiveFilter] = useState(ACTIVE_FILTER_STATES.active);
  const [selectedCategory, setSelectedCategory] = useState({
    label: "All",
    value: "All",
  });

  const [programsData, setProgramsData] = useState();
  const [categories, setCategories] = useState();
  const [filteredData, setFilteredData] = useState();

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await ProgramsAPI.getPrograms({
        isActive: "A",
        showPrices: true,
      });
      console.log("Programs data:", responseData.data.programs);
      if (responseData.status === "SUCCESS") {
        setProgramsData(responseData.data.programs);
      } else {
        throw responseData.message;
      }

      const { data: categoriesData } = await CategoriesAPI.getCategories({
        showMapping: true,
        isProgramCategory: true,
      });

      if (responseData.status === "SUCCESS") {
        setCategories(categoriesData.data.category);
        console.log("Categories data:", categoriesData.data.category);
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
    console.log("Calling useEffect of useManagePrograms-- getData()");
    getData();
  }, []);

  const getCategoryOptions = () => {
    let options = categories.map((category) => ({
      label: category.title,
      value: category.id,
    }));

    return [{ label: "All", value: "All" }, ...options];
  };

  const getCategoryTitle = (id) => {
    console.log("Category id for title lookup:", id);
    let option = categories.find((item) => {
      return item.id === id;
    });
    if (!option) return "";
    console.log("Category title:", option);
    return option.title;
  };

  useEffect(() => {
    if (!programsData) return;

    let newFilteredCourses = [];

    if (activeFilter === ACTIVE_FILTER_STATES.active) {
      newFilteredCourses = programsData.filter((course) => course.isActive);
    } else if (activeFilter === ACTIVE_FILTER_STATES.inActive) {
      newFilteredCourses = programsData.filter((course) => !course.isActive);
    } else {
      newFilteredCourses = [...programsData];
    }

    if (selectedCategory.label !== "All") {
      newFilteredCourses = newFilteredCourses.filter(
        (program) => program.category === selectedCategory.value
      );
    }

    setFilteredData(newFilteredCourses);
  }, [programsData, activeFilter, selectedCategory]);

  const deleteProgram = async (deletedProgram) => {
    const newProgramData = {
      ...deletedProgram,
      isActive: false,
    };

   delete newProgramData.id;

   newProgramData.basicPrice = newProgramData.prices.basicPrice;
   newProgramData.offerId= newProgramData.prices.offerId;
   newProgramData.offerAmtApplied = newProgramData.prices.offerAmtApplied;
   newProgramData.postOfferPrice = newProgramData.prices.postOfferPrice;

   delete newProgramData.prices;

    try {
      const { data: responseData } = await ProgramsAPI.updateProgram({
        programId: deletedProgram.id,
        program: newProgramData,
      });

      if (responseData.status === "SUCCESS") {
        let newPrograms = programsData.filter(
          (program) => program.id !== newProgramData.id
        );

        setProgramsData([...newPrograms, responseData.data.program]);
        showToast("Successfully Deleted Program", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "useManageCourses: deleteCourse: delete program failed:",
        error
      );
      showToast(
        "Failed to delete program. Please try again",
        ToastVariants.error
      );
    }
  };

  return {
    loading,
    error,
    programsData,
    activeFilter,
    filteredData,
    setActiveFilter,
    getCategoryOptions,
    setSelectedCategory,
    selectedCategory,
    getCategoryTitle,
    getData,
    deleteProgram,
  };
};

export default useManagePrograms;
