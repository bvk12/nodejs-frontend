import { useEffect, useState } from "react";
import { CoursesAPI } from "../services/apis/CoursesAPI";

import { ACTIVE_FILTER_STATES, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const useCurriculum = (courseId) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [showEditChapterModal, setShowEditChapterModal] = useState(false);
  const [addEditChapterData, setaddEditChapterData] = useState({});

  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [showEditSectionModal, setShowEditSectionModal] = useState(false);
  const [addEditSectionData, setAddEditSectionData] = useState({});

  const [chapterData, setChapterData] = useState([]);

  const getData = async () => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await CoursesAPI.getChapters({
        courseId,
        showSections: true,
      });

      if (responseData.status === "SUCCESS") {
        setChapterData(responseData.data.chapters);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useCurriculum: getData: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const openCreateChapterModal = () => {
    setShowAddChapterModal(true);
    setaddEditChapterData({
      courseId,
      title: "",
      ordering: chapterData.length + 1,
      noOfChapters: chapterData.length,
    });
  };

  const openEditChapterModal = (chapter) => {
    setShowEditChapterModal(true);
    setaddEditChapterData({
      courseId,
      noOfChapters: chapterData.length,
      ...chapter,
    });
  };

  const getFirstChapterId = () => {
    return chapterData.length > 0 ? chapterData[0].id : null;
  };

  const getSectionCountOfChapter = (chapterId) => {
    if (!chapterId) return 0;
    let chapter = chapterData.find((chapter) => chapter.id === chapterId);

    return chapter.sections ? chapter.sections.length : 0;
  };

  const openCreateSectionModal = () => {
    const firstChapterId = getFirstChapterId();
    const firstChapterSectionCount = getSectionCountOfChapter(firstChapterId);

    setShowAddSectionModal(true);
    setAddEditSectionData({
      chapterId: firstChapterId,
      title: "",
      ordering: firstChapterSectionCount + 1,
      noOfSections: firstChapterSectionCount,
      contentType: "video",
      contentUrl: "",
      isFree: false,
      duration: 0,
    });
  };

  const openEditSectionModal = (section) => {
    const { chapterId } = section;
    const sectionCount = getSectionCountOfChapter(chapterId);

    setShowEditSectionModal(true);
    setAddEditSectionData({
      noOfChapters: chapterData.length,
      ...section,
      noOfSections: sectionCount,
    });
  };

  const createChapter = async () => {
    let newData = {
      ordering: addEditChapterData.ordering,
      title: addEditChapterData.title,
      courseId: addEditChapterData.courseId,
    };

    try {
      const { data: responseData } = await CoursesAPI.createChapter({
        chapter: newData,
      });

      if (responseData.status === "SUCCESS") {
        let newChapterData = [...chapterData, responseData.data.chapter];
        setChapterData(newChapterData);

        showToast("Successfully Created Chapter", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "usecurriculum: createChapter: create chaptor failed:",
        error
      );
      showToast(
        "Failed to create chaptor. Please try again.",
        ToastVariants.error
      );
    }
  };

  const updateChapter = async () => {
    let newData = {
      ordering: addEditChapterData.ordering,
      title: addEditChapterData.title,
      courseId: addEditChapterData.courseId,
      isActive: addEditChapterData.isActive,
    };

    try {
      const { data: responseData } = await CoursesAPI.updateChapter({
        chapterId: addEditChapterData.id,
        chapter: newData,
      });

      if (responseData.status === "SUCCESS") {
        let newChapterData = chapterData.filter(
          (chapter) => chapter.id !== addEditChapterData.id
        );
        newChapterData = [...newChapterData, responseData.data.chapter];
        setChapterData(newChapterData);

        showToast("Successfully updated chapter", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "usecurriculum: updatechapter: create chapter failed:",
        error
      );
      showToast(
        "Failed to create chapter. Please try again.",
        ToastVariants.error
      );
    }
  };

  const deleteChapter = async (deleteChapter) => {
    let newData = {
      ordering: deleteChapter.ordering,
      title: deleteChapter.title,
      courseId: deleteChapter.courseId,
      isActive: false,
    };

    try {
      const { data: responseData } = await CoursesAPI.updateChapter({
        chapterId: deleteChapter.id,
        chapter: newData,
      });

      if (responseData.status === "SUCCESS") {
        let newChapterData = chapterData.filter(
          (chapter) => chapter.id !== deleteChapter.id
        );
        newChapterData = [...newChapterData];
        setChapterData(newChapterData);

        showToast("Successfully deleted chapter", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "usecurriculum: deleteChapter: delete chapter failed:",
        error
      );
      showToast(
        "Failed to delete chapter. Please try again.",
        ToastVariants.error
      );
    }
  };

  const createSection = async () => {
    let newData = {
      ordering: addEditSectionData.ordering,
      title: addEditSectionData.title,
      chapterId: addEditSectionData.chapterId,
      contentType: "video",
      contentUrl: addEditSectionData.contentUrl,
      isFree: addEditSectionData.isFree,
      duration: addEditSectionData.duration,
    };

    try {
      const { data: responseData } = await CoursesAPI.createSection({
        section: newData,
      });

      if (responseData.status === "SUCCESS") {
        let chapter = chapterData.find(
          (chapter) => chapter.id === addEditSectionData.chapterId
        );

        let chapterSections = chapter.sections ? chapter.sections : [];
        let newSections = [...chapterSections, responseData.data.section];

        chapter.sections = newSections;

        let newChapterData = chapterData.filter(
          (chapter) => chapter.id !== addEditSectionData.chapterId
        );
        newChapterData = [...newChapterData, chapter];
        setChapterData(newChapterData);

        showToast("Successfully Created Section", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "usecurriculum: createSection: create section failed:",
        error
      );
      showToast(
        "Failed to create section. Please try again.",
        ToastVariants.error
      );
    }
  };

  const updateSection = async () => {
    let newData = {
      ordering: addEditSectionData.ordering,
      title: addEditSectionData.title,
      chapterId: addEditSectionData.chapterId,
      contentType: "video",
      contentUrl: addEditSectionData.contentUrl,
      isFree: addEditSectionData.isFree,
      duration: addEditSectionData.duration,
      isActive: addEditSectionData.isActive,
    };

    try {
      const { data: responseData } = await CoursesAPI.updateSection({
        sectionId: addEditSectionData.id,
        section: newData,
      });

      if (responseData.status === "SUCCESS") {
        getData();

        showToast("Successfully Updated Section", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "usecurriculum: updateSection: update section failed:",
        error
      );
      showToast(
        "Failed to update section. Please try again.",
        ToastVariants.error
      );
    }
  };

  const deleteSection = async (deleteSection) => {
    let newData = {
      ordering: deleteSection.ordering,
      title: deleteSection.title,
      chapterId: deleteSection.chapterId,
      contentType: "video",
      contentUrl: deleteSection.contentUrl,
      isFree: deleteSection.isFree,
      duration: deleteSection.duration,
      isActive: false,
    };

    try {
      const { data: responseData } = await CoursesAPI.updateSection({
        sectionId: deleteSection.id,
        section: newData,
      });

      if (responseData.status === "SUCCESS") {
        getData();

        showToast("Successfully Deleted Section", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "usecurriculum: delete section: delete section failed:",
        error
      );
      showToast(
        "Failed to delete section. Please try again.",
        ToastVariants.error
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    loading,
    error,
    chapterData,
    showAddChapterModal,
    showEditChapterModal,
    setShowAddChapterModal,
    setShowEditChapterModal,
    addEditChapterData,
    setaddEditChapterData,
    openEditChapterModal,
    openCreateChapterModal,
    createChapter,
    updateChapter,
    deleteChapter,

    setAddEditSectionData,
    setShowAddSectionModal,
    setShowEditSectionModal,
    showAddSectionModal,
    showEditSectionModal,
    openCreateSectionModal,
    openEditSectionModal,
    addEditSectionData,
    deleteSection,
    createSection,
    updateSection,
    getSectionCountOfChapter,
  };
};

export default useCurriculum;
