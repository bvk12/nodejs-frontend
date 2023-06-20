import { axiosClient } from "../apis/configs/axiosApiClient";
const RESOURCE_NM = "/subscription/";
const GET_SUB = RESOURCE_NM + "getSub";

const getSub = (userId) => {   
    console.log("get subscription call.....")
    return axiosClient.get(GET_SUB +"?userId="+userId);
} 

export const SubscriptionAPI = {
    getSub
};

