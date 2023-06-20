import { useEffect, useState } from "react";
import { FeaturesAPI } from "../services/apis/FeaturesAPI";

import { ACTIVE_FILTER_STATES, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const useFeatures = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeFilter, setActiveFilter] = useState(ACTIVE_FILTER_STATES.active);

  const [showAddFeaturePopover, setshowAddFeaturePopover] = useState(false);
  const [showEditFeaturePopover, setshowEditFeaturePopover] = useState(false);
  const [editFeatureData, seteditFeatureData] = useState();

  const [featureData, setFeatureData] = useState();
  const [filteredData, setFilteredData] = useState();

  const getFeatures = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await FeaturesAPI.getFeatures({
        isActive: "A",
      });

      if (responseData.status === "SUCCESS") {
        setFeatureData(responseData.data.features);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useFeatures: getFeatures: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeatures();
  }, []);

  useEffect(() => {
    if (!featureData) return;

    let newFilteredFeatures = [];

    if (activeFilter === ACTIVE_FILTER_STATES.active) {
      newFilteredFeatures = featureData.filter((feature) => feature.isActive);
    } else if (activeFilter === ACTIVE_FILTER_STATES.inActive) {
      newFilteredFeatures = featureData.filter((feature) => !feature.isActive);
    } else {
      newFilteredFeatures = [...featureData];
    }

    setFilteredData(newFilteredFeatures);
  }, [featureData, activeFilter]);

  const editFeature = async (featureCode, newFeatureData) => {
    try {
      const body = {
        featureCode,
        feature: {
          ...newFeatureData,
        },
      };
      const { data: responseData } = await FeaturesAPI.updateFeature(body);

      if (responseData.status === "SUCCESS") {
        // update the local state
        let newFeatures = featureData.filter(
          (featureItem) => featureItem.featureCode !== featureCode
        );

        let newData = [...newFeatures, responseData.data.feature];
        setFeatureData(newData);

        showToast("Successfully Updated Feature", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error("useFeatures: editFeature: update feature failed:", error);
      showToast(
        "Failed to edit feature. Please try again.",
        ToastVariants.error
      );
    }
  };

  const createFeature = async (newFeatureData) => {
    try {
      // TODO: get this from backend
      // currently getting the last number from row code and adding 1 to it.
      let sortedFeatureCodes = featureData
        .map(({ featureCode }) => Number(featureCode.slice(1)))
        .sort((a, b) => a - b);
      const newFeatureCode =
        "R" + (sortedFeatureCodes[sortedFeatureCodes.length - 1] + 1);

      const body = {
        feature: {
          ...newFeatureData,
          featureCode: newFeatureCode,
        },
      };
      const { data: responseData } = await FeaturesAPI.createFeature(body);

      if (responseData.status === "SUCCESS") {
        // update the local state
        setFeatureData([...featureData, responseData.data.feature]);
        showToast("Successfully Created Feature", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useFeatures: createFeature: create feature failed:",
        error
      );
      showToast(
        "Failed to create feature. Please try again.",
        ToastVariants.error
      );
    }
  };

  return {
    loading,
    error,
    featureData,
    editFeature,
    activeFilter,
    filteredData,
    setActiveFilter,
    createFeature,
    showAddFeaturePopover,
    setshowAddFeaturePopover,
    showEditFeaturePopover,
    setshowEditFeaturePopover,
    editFeatureData,
    seteditFeatureData,
  };
};

export default useFeatures;
