import { useState, useEffect } from "react";
import { PriceMetadataAPI } from "../services/apis/PriceMetadataAPI";

const usePriceData = (id, type) => {
  const [priceData, setPriceData] = useState({});
  const [priceLoading, setPriceLoading] = useState(true);

  const getPriceDetails = async () => {
    try {
      setPriceLoading(true);

      const { data: responseData } = await PriceMetadataAPI.getPriceDetails(
        id,
        type
      );

      if (responseData.status === "SUCCESS") {
        setPriceData(responseData.data.prices[0] || {});
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "usePriceData: getPriceDetails: getting data failed, error:",
        error
      );
    } finally {
      setPriceLoading(false);
    }
  };
  useEffect(() => {
    if (!id || !type) {
      setPriceLoading(false);
      return;
    }

    getPriceDetails();
  }, []);

  return {
    priceData,
    setPriceData,
    priceLoading,
  };
};

export default usePriceData;
