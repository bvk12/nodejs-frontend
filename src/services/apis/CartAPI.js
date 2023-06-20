import { axiosClient } from "../apis/configs/axiosApiClient";
const RESOURCE_NM = "/cart/";
const ADD_TO_CART = RESOURCE_NM + "createCartItem";
const GET_CART_ITEMS = RESOURCE_NM + "getCartItems";
const CLEAR_CART_ITEMS = RESOURCE_NM + "clearCartItems";
const REMOVE_CART_ITEM = RESOURCE_NM + "removeCartItem";

const createCartItem = (courseId,courseType,userId,) => {
  var body = createRequestBody(courseId,courseType,userId);
  return axiosClient.post(ADD_TO_CART , body);
}

const getCartItems = async (userId) => {
    var requestParams = "?userId="+userId;
    return await axiosClient.get(GET_CART_ITEMS +requestParams);
}

const clearCartItems = async (userId)=>{
    var requestParams =  "?userId="+userId;
    return await axiosClient.get(CLEAR_CART_ITEMS + requestParams)
}


const removeCartItem = async (userId,courseId,courseType)=>{
    var requestParams =  "?userId="+userId+"&courseId="+courseId+"&courseType="+courseType;;
    return await axiosClient.get(REMOVE_CART_ITEM + requestParams)
}


const createRequestBody = (courseId,courseType,userId) => {
    var requestBody = {
        courseType,
        courseId,
        userId
    };
    return requestBody;
}

export const CartAPI = {
    createCartItem,
    getCartItems,
    clearCartItems,
    removeCartItem
};