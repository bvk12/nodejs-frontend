import { axiosClient } from "../apis/configs/axiosApiClient";
const RESOURCE_NM = "/payment/";
const CHECKOUT_STRIPE = RESOURCE_NM + "checkoutStripe";
const CHECKOUT_RAZOR = RESOURCE_NM + "checkoutRazor";
const CHECKOUT_PAYPALL = RESOURCE_NM + "checkoutPaypal";
const CREATE_PAYMENT = RESOURCE_NM + "createPayment";
const SEND_SUCCESS_EMAIL = RESOURCE_NM + "sendPaymentSuccessEmail"

const createPayment = (paymentRequest) => {   
    console.log("payment call.....")
    return axiosClient.post(CREATE_PAYMENT , paymentRequest);
}

const sendPaymentSuccessEmail =(orderId,paymentId,amount,courseTitle,email )=>{
    var requestBody = {
        orderId,paymentId,amount,courseTitle,email 
    };
    return axiosClient.post(SEND_SUCCESS_EMAIL,requestBody)
}

const createStripePayment = ({amount,productIds,orderId,userId}) =>{
    //create-checkout-session
    var requestBody = {
        amount,
        productIds,
        orderId,
        userId
    };
    console.log("Stripe payment call.....")
    return axiosClient.post(CHECKOUT_STRIPE , requestBody);
}

const createRazorPayment = ({amount,productIds,orderId,userId}) =>{
    //create-checkout-session
    var requestBody = {
        amount,
        productIds,
        orderId,
        userId
    };
    console.log("Razor payment call.....")
    return axiosClient.post(CHECKOUT_RAZOR , requestBody);
}

const createPaypallPayment = ({amount,productIds,orderId,userId}) =>{
    //create-checkout-session
    var requestBody = {
        amount,
        productIds,
        orderId,
        userId
    };
    console.log("Paypall payment call.....")
    return axiosClient.post(CHECKOUT_PAYPALL , requestBody);
}

export const PaymentAPI = {
    createPayment,
    sendPaymentSuccessEmail
};

