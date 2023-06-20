import { useRef, useState, useEffect } from "react";

import { PriceMetadataAPI } from "../services/apis/PriceMetadataAPI";
import { ACTIVE_FILTER_STATES, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

import { isOfferActive } from "../utils/helper";

const useOffers = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedType, setSelectedType] = useState("All");
  const [activeFilter, setActiveFilter] = useState(ACTIVE_FILTER_STATES.active);

  const [offersData, setOffersData] = useState([]);
  const [filteredData, setFilteredData] = useState();

  const [offer, setOffer] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const getOfferTypeOptions = () => {
    let options = [
      {
        label: "discount",
        value: "discount",
      },
      {
        label: "offer",
        value: "offer",
      },
    ];

    return [...options];
  };

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data } = await PriceMetadataAPI.getAdminOfferDetails();

      if (data.status === "SUCCESS") {
        setOffersData(data.data.offers);
      } else {
        throw data.message;
      }
    } catch (error) {
      setError(true);
      console.error("useOffers: getData: getting offers failed, error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!offersData) return;

    let newFilteredOffers = [];

    if (activeFilter === ACTIVE_FILTER_STATES.active) {
      newFilteredOffers = offersData.filter(isOfferActive);
    } else if (activeFilter === ACTIVE_FILTER_STATES.inActive) {
      newFilteredOffers = offersData.filter((offer) => !isOfferActive(offer));
    } else {
      newFilteredOffers = [...offersData];
    }

    if (selectedType !== "All") {
      newFilteredOffers = newFilteredOffers.filter(
        (offer) => offer.offerType === selectedType
      );
    }

    setFilteredData(newFilteredOffers);
  }, [offersData, activeFilter, selectedType]);

  const createOffer = async () => {
    try {
      const offerData = {
        offerName: offer.offerName,
        offerCode: offer.offerCode,
        offerDesc: offer.offerDesc,
        offerType: offer.offerType || "discount",
        offerAmount: offer.offerAmount,
        offerPercent: offer.offerPercent,
        startDate: offer.startDate,
        endDate: offer.endDate,
      };

      const { data: responseData } = await PriceMetadataAPI.createOffer({
        offer: offerData,
      });

      if (responseData.status === "SUCCESS") {
        let newsOfferData = [...offersData, responseData.data.offer];
        setOffersData(newsOfferData);

        showToast("Successfully Created Offer", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error("useOffers: createOffer: create offer failed:", error);
      showToast(
        "Failed to create offer. Please try again.",
        ToastVariants.error
      );
    }
  };

  const updateOffer = async () => {
    try {
      const offerData = {
        offerName: offer.offerName,
        offerCode: offer.offerCode,
        offerDesc: offer.offerDesc,
        offerType: offer.offerType || "discount",
        offerAmount: offer.offerAmount,
        offerPercent: offer.offerPercent,
        startDate: offer.startDate,
        endDate: offer.endDate,
        isActive: offer.isActive,
      };

      const { data: responseData } = await PriceMetadataAPI.updateOffer({
        offerId: offer.id,
        offer: offerData,
      });

      if (responseData.status === "SUCCESS") {
        let newOffersData = offersData.filter(
          (offer) => offer.id !== responseData.data.offer.id
        );
        setOffersData([...newOffersData, responseData.data.offer]);

        showToast("Successfully Updated Offer", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error("useOffers: updateOffer: update offer failed:", error);
      showToast(
        "Failed to update offer. Please try again.",
        ToastVariants.error
      );
    }
  };

  const deleteOffer = async (offer) => {
    try {
      const offerData = {
        offerName: offer.offerName,
        offerCode: offer.offerCode,
        offerDesc: offer.offerDesc,
        offerType: offer.offerType || "discount",
        offerAmount: offer.offerAmount,
        offerPercent: offer.offerPercent,
        startDate: offer.startDate,
        endDate: offer.endDate,
        isActive: false,
      };

      const { data: responseData } = await PriceMetadataAPI.updateOffer({
        offerId: offer.id,
        offer: offerData,
      });

      if (responseData.status === "SUCCESS") {
        let newOffersData = offersData.filter(
          (offer) => offer.id !== responseData.data.offer.id
        );
        setOffersData([...newOffersData, responseData.data.offer]);

        showToast("Successfully Deleted Offer", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error("useOffers: deleteOffer: delete offer failed:", error);
      showToast(
        "Failed to delete offer. Please try again.",
        ToastVariants.error
      );
    }
  };

  return {
    loading,
    filteredData,
    selectedType,
    setselectedType: setSelectedType,
    getOfferTypeOptions,
    offer,
    setOffer,
    setShowAddModal,
    setShowEditModal,
    showAddModal,
    showEditModal,
    createOffer,
    updateOffer,
    setActiveFilter,
    activeFilter,
    deleteOffer,
  };
};

export default useOffers;
