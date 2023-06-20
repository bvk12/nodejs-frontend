import { axiosClient } from "../apis/configs/axiosApiClient";
const RESOURCE_NM = "/price-metadata/";
const GET_OFFER_DETAILS = RESOURCE_NM + "offers";

const ADMIN_OFFERS_DETAILS = "/price-metadata/admin/offers";
const CREATE_OFFER = ADMIN_OFFERS_DETAILS + "/create";
const UPDATE_OFFER = ADMIN_OFFERS_DETAILS + "/update";

const ADMIN_PRICE = "/price/admin";
const GET_PRICE = ADMIN_PRICE + "/getPrice";
const ADD_PRICE = ADMIN_PRICE + "/addPrice";
const EDIT_PRICE = ADMIN_PRICE + "/updatePrice";

const getOfferDetails = async (offerId) => {
  var requestParams = "?id=" + offerId;
  var offerData = await axiosClient.get(GET_OFFER_DETAILS + requestParams);
  return offerData.data.data.offers;
};

const getAdminOfferDetails = async () => {
  return axiosClient.get(ADMIN_OFFERS_DETAILS);
};

const createOffer = async (offerData) => {
  return axiosClient.post(CREATE_OFFER, offerData);
};

const updateOffer = async (offerData) => {
  return axiosClient.put(UPDATE_OFFER, offerData);
};

const getPriceDetails = async (id, type) => {
  return axiosClient.get(GET_PRICE, {
    params: {
      courseId: id,
      courseType: type,
    },
  });
};

const addPrice = async (priceData) => {
  return axiosClient.post(ADD_PRICE, priceData);
};

const updatePrice = async (priceData) => {
  return axiosClient.put(EDIT_PRICE, priceData);
};

export const PriceMetadataAPI = {
  getOfferDetails,
  getAdminOfferDetails,
  createOffer,
  updateOffer,
  getPriceDetails,
  addPrice,
  updatePrice,
};
