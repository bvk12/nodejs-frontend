import { axiosClient } from "./configs/axiosApiClient";
const RESOURCE_NM = "/orders/";
const CHECKOUT_CREATE_ORDER = RESOURCE_NM + "createOrder";

const createOrder = (paymentGateway,userId) => {
  var body = createRequestBody(paymentGateway,userId);
  return axiosClient.post(CHECKOUT_CREATE_ORDER , body);
}

const createRequestBody = (paymentGateway,userId) => {
    var requestBody = {
        paymentGateway,
        userId
    };
    return requestBody;
}

export const OrdersAPI = {
    createOrder
};

