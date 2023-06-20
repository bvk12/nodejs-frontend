import { axiosClient } from "../apis/configs/axiosApiClient";
const RESOURCE_NM = "/subscription";
const GET_SUB = RESOURCE_NM + "/getSub";

const GET_ALL_SUB = RESOURCE_NM + "/all";
const GET_ALL_INSTANCES = RESOURCE_NM + "/instance";

const getSub = (userId) => {
  console.log("get subscription call.....");
  return axiosClient.get(GET_SUB + "?userId=" + userId);
};

const getAllSubscriptions = () => {
  return axiosClient.get(GET_ALL_SUB);
};

const getInstanceDetails = () => {
  return axiosClient.get(GET_ALL_INSTANCES);
};

export const SubscriptionAPI = {
  getSub,
  getAllSubscriptions,
  getInstanceDetails,
};
