import { useIonRouter } from "@ionic/react";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CategoriesAPI } from "../services/apis/CategoriesAPI";
import { ProgramDataAPI } from "../services/apis/ProgramDataAPI";
import { CoursesAPI } from "../services/apis/CoursesAPI";
import { AuthContext } from "../context/AuthContextProvider";
import { CourseDataAPI } from "../services/apis/CourseDataAPI";


const useProgramListing = () => {
  const location = useLocation();
  const router = useIonRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [programs, setPrograms] = useState();
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    label: "All",
    value: -1,
  });
  const { user } = useContext(AuthContext);


  const [tagsData, setTagsData] = useState({});
  const [selectedProgram, setSelectedProgram] = useState({
    label: "All",
    value: -1,
  });

  useEffect(() => {
  //  console.log("You are in program listing")
    const params = new URLSearchParams(location.search);
    let categoryId = params.get("categoryId");
    let programId = params.get("programId");

   // console.log("Category id",categoryId,programId,categories)

    if (categoryId) {
      categoryId = Number(categoryId);
    //  console.log("categoryId from params",categoryId,categories)

      let selectedCategoryObj = categories.find(
        (category) => category.id === categoryId
      );

     // console.log("selectedCategoryObj",selectedCategoryObj)


      if (!selectedCategoryObj) {
        return;
      }

      let selectedCategoryTitle = selectedCategoryObj.title;

    //  console.log("selectedCategoryTitle",selectedCategoryTitle)

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

    if (programId) {
      programId = Number(programId);

      let selectedProgramObj = filteredPrograms.find(
        (program) => program.id === programId
      );

      if (!selectedProgramObj) {
        return;
      }

      let selectedProgramTitle = selectedProgramObj.title;

      setSelectedProgram({
        label: selectedProgramTitle,
        value: programId,
      });

    } else {
      setSelectedProgram({
        label: "All",
        value: -1,
      });
    }

  }, [location.search, categories]);


  const getCategoryOptions = () => {
    let options = categories.map((category) => ({
      label: category.title,
      value: category.id,
    }));

    return [{ label: "All", value: -1 }, ...options];
  };

  const getProgramOptions = () => {
    let options = filteredPrograms.map((prog) => ({
      label: prog.title,
      value: prog.id,
    }));

    return [{ label: "All", value: -1 }, ...options];
  }

  const getCategoriesFromPrograms = (programs) => {
    var programCatSet = new Set();
    programs.forEach((prog) => {
      programCatSet.add(prog.category);
    })
   // console.log("Program category set", programCatSet);
    return programCatSet;
  }

  const getProgramData = async () => {
    try {
      setLoading(true);
      setError(false);
      var catWithPrograms = {};
      const { data: programResponseData } = await ProgramDataAPI.getPrograms({});
   //   console.log("Recieved program data:", programResponseData)
      if (programResponseData.status === "SUCCESS") {
        setPrograms(programResponseData.data.programs);
        catWithPrograms = getCategoriesFromPrograms(programResponseData.data.programs)
      } else {
        throw programResponseData.message;
      }

      const { data: responseData } = await CategoriesAPI.getCategories({
        showMapping: true,
        isProgramCategory: true,
      });

      if (responseData.status === "SUCCESS") {

        var allCategories = responseData.data.category;
     //   console.log("All categories ", allCategories)
        var filteredCats = [];
        catWithPrograms.forEach((item) => {
          var find = allCategories.find((allItem) => { return allItem.id == item });
          if (find) filteredCats.push(find);
        })
        setCategories(responseData.data.category);
      //  console.log("Filtered cats", filteredCats)
       // setCategories(filteredCats);
      } else {
        throw responseData.message;
      }

      var params = new URLSearchParams();
      params.append("type", "Difficulty Level");
      params.append("type", "Content Speciality");
      params.append("type", "Skill")
      const { data: tagsData } = await CoursesAPI.getTags(params);

      if (tagsData.status === "SUCCESS") {
       // console.log("tagsData:", tagsData)
        setTagsData(tagsData.data.tags[0]);
      } else {
        throw tagsData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useProgramCategories: getProgramData: getting data failed, error:",
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
      params.delete("programId");
     // console.log("Category updated",category)
      setSelectedProgram({
        label: "All",
        value: -1,
      });
    } else {
      params.delete("categoryId");
      setSelectedCategory({
        label: "All",
        value: -1,
      });

      params.delete("programId");
      setSelectedProgram({
        label: "All",
        value: -1,
      });

    }

    router.push({ search: params.toString() });
  };

  const handleProgramChange = (program) => {
    const params = new URLSearchParams(location.search);
    if (program.value !== -1) {
      params.set("programId", program.value);
      console.log("Settign program value ", program)
      setSelectedProgram({ ...program });
    } else {
      params.delete("programId");
      setSelectedProgram({
        label: "All",
        value: -1,
      });
    }

    router.push({ search: params.toString() });
  };

  useEffect(() => {
    console.log("Calling getProgramData()")
    getProgramData();
  }, []);

  useEffect(() => {
    if (!programs) return;
    if (selectedCategory.label !== "All") {
      if (selectedCategory.label !== "All") {
        setFilteredPrograms(
          programs.filter(
            (item) => item.category === selectedCategory.value
          )
        );
      }
    } else {
      setFilteredPrograms(programs);
    }
  }, [programs, selectedCategory]);

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

  const getSkillTags = (skillIds) => {
    if (!tagsData["Skill"]) return;

    let skills = tagsData["Skill"];
    var setSkills = [];
    skillIds.forEach(item => {
      setSkills.push(skills.find((skill) => {
        return (skill.id === item)
      }))
    });
    return setSkills;
  }

  return {
    loading,
    filteredPrograms,
    categories,
    getCategoryOptions,
    selectedCategory,
    setSelectedCategory,
    handleCategoryChange,
    handleProgramChange,
    getDifficultyLevelTitle,
    getContentSpecialityTitle,
    getSkillTags,
    getProgramOptions,
    selectedProgram,
    user
  };
};

export default useProgramListing;
