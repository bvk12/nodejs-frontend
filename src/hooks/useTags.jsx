import { useRef, useState, useEffect } from "react";

import { CoursesAPI } from "../services/apis/CoursesAPI";
import { ACTIVE_FILTER_STATES, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const useTags = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedTagType, setSelectedTagType] = useState("All");
  const [activeFilter, setActiveFilter] = useState(ACTIVE_FILTER_STATES.active);

  const [tagsData, setTagsData] = useState([]);
  const [tagTypes, setTagTypes] = useState([]);

  const [filteredData, setFilteredData] = useState();

  const [tag, setTag] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const getTagTypeOptions = () => {
    let options = tagTypes
      ? tagTypes.map((tag) => ({
          label: tag,
          value: tag,
        }))
      : [];

    return [...options];
  };

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: tagsData } = await CoursesAPI.getTags({
        isActive: "A",
      });

      if (tagsData.status === "SUCCESS") {
        setTagsData(tagsData.data.tags);
      } else {
        throw tagsData.message;
      }

      const { data: tagTypesData } = await CoursesAPI.getTagTypes();

      if (tagTypesData.status === "SUCCESS") {
        setTagTypes(tagTypesData.data.tagTypes);
      } else {
        throw tagTypesData.message;
      }
    } catch (error) {
      setError(true);
      console.error("useTags: getData: getting tags failed, error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!tagsData) return;

    let newFilteredTags = [];

    if (activeFilter === ACTIVE_FILTER_STATES.active) {
      newFilteredTags = tagsData.filter((tag) => tag.isActive);
    } else if (activeFilter === ACTIVE_FILTER_STATES.inActive) {
      newFilteredTags = tagsData.filter((tag) => !tag.isActive);
    } else {
      newFilteredTags = [...tagsData];
    }

    if (selectedTagType !== "All") {
      newFilteredTags = newFilteredTags.filter(
        (tag) => tag.type === selectedTagType
      );
    }

    setFilteredData(newFilteredTags);
  }, [tagsData, activeFilter, selectedTagType]);

  const createTag = async () => {
    try {
      const tagData = {
        name: tag.name,
        type: tag.type,
      };

      const { data: responseData } = await CoursesAPI.createTag({
        tag: tagData,
      });

      if (responseData.status === "SUCCESS") {
        let newTagsData = [...tagsData, responseData.data.tag];
        setTagsData(newTagsData);

        showToast("Successfully Created Tag", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error("useTags: createTag: create tag failed:", error);
      showToast("Failed to create tag. Please try again.", ToastVariants.error);
    }
  };

  const updateTag = async () => {
    try {
      const tagData = {
        name: tag.name,
        type: tag.type,
        isActive: tag.isActive,
      };

      const { data: responseData } = await CoursesAPI.updateTag({
        tagId: tag.id,
        tag: tagData,
      });

      if (responseData.status === "SUCCESS") {
        let newTagsData = tagsData.filter(
          (tag) => tag.id !== responseData.data.tag.id
        );
        setTagsData([...newTagsData, responseData.data.tag]);

        showToast("Successfully Updated Tag", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error("useTags: updateTag: update tag failed:", error);
      showToast("Failed to update tag. Please try again.", ToastVariants.error);
    }
  };

  const deleteTag = async (deletedTag) => {
    try {
      const tagData = {
        name: deletedTag.name,
        type: deletedTag.type,
        isActive: false,
      };

      delete tagData.id;

      const { data: responseData } = await CoursesAPI.updateTag({
        tagId: deletedTag.id,
        tag: tagData,
      });

      if (responseData.status === "SUCCESS") {
        let newTagsData = tagsData.filter(
          (tag) => tag.id !== responseData.data.tag.id
        );
        setTagsData([...newTagsData, responseData.data.tag]);

        showToast("Successfully Deleted Tag", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error("useTags: deletedTag: delete tag failed:", error);
      showToast("Failed to delete tag. Please try again.", ToastVariants.error);
    }
  };

  return {
    loading,
    filteredData,
    selectedTagType,
    setSelectedTagType,
    getTagTypeOptions,
    setTag,
    tag,
    setShowAddModal,
    setShowEditModal,
    showAddModal,
    showEditModal,
    createTag,
    updateTag,
    setActiveFilter,
    activeFilter,
    deleteTag,
  };
};

export default useTags;
