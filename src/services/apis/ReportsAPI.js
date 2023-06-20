import { axiosClient } from "./configs/axiosApiClient";
const RESOURCE_NM = "/admin/reports/";
const GET_SALES_REPORT = RESOURCE_NM + "salesReport"
const GET_SUB_REPORT = RESOURCE_NM + "subscriptionReport"
const GET_USER_REPORT = RESOURCE_NM + "userReport"

const getSalesReport =()=>{
      return axiosClient.get(GET_SALES_REPORT)
}

const getSubscriptionReport =()=>{
    return axiosClient.get(GET_SUB_REPORT)
}

const getUserReport =()=>{
    return axiosClient.get(GET_USER_REPORT)
}

export const ReportsAPI = {

    getSalesReport,
    getSubscriptionReport,
    getUserReport
};

