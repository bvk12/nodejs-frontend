import { axiosClient } from "../apis/configs/axiosApiClient";
import { PriceMetadataAPI } from "./PriceMetadataAPI";
const RESOURCE_NM = "/price/";
const GET_PRICE = RESOURCE_NM + "getPrice";

const UPDATE_PRICE = RESOURCE_NM + "admin/updatePrice";

const getPrice = async (courseId, courseType) => {
    var requestParams = "?courseId=" + courseId + "&courseType=" + courseType;
    var priceData = await axiosClient.get(GET_PRICE + requestParams);
    var latestPriceIndex = priceData.data.data.prices.length - 1;
    var latestPrice = -1;
    console.log("Price data:", priceData.data.data.prices[0].postOfferPrice);
    if (priceData && priceData.data.data.prices.length > 0) {
        latestPrice = priceData.data.data.prices[latestPriceIndex].postOfferPrice;
    }
    else {
        console.error("Unable to fetch price of the caritem");
    }
    return latestPrice;
}


const getPriceDetails = async (courseId, courseType) => {
    var requestParams = "?courseId=" + courseId + "&courseType=" + courseType;
    var priceData = await axiosClient.get(GET_PRICE + requestParams);
 //   console.log("Get price details:",courseId,courseType,priceData.data.data.prices[0])
    return priceData.data.data.prices;
}


const updatePrice = async (courseId, courseType, newBasePrice) => {
    var priceInfo = await PriceAPI.getPriceDetails(courseId, courseType);
    var offerId = priceInfo[0].offerId;
    console.log("Offer id for the priceid", priceInfo, offerId, newBasePrice);
    var offerDetails = await PriceMetadataAPI.getOfferDetails(offerId)
    console.log("Offer details", offerDetails)
    var postOfferPrice = newBasePrice;
    var offerAmountApplied = 0;
    if (offerDetails[0].offerType === "discount" && offerDetails[0].offerPercent > 0) {
        var percent = offerDetails[0].offerPercent;
        offerAmountApplied = newBasePrice * (percent / 100);
        postOfferPrice  = newBasePrice - offerAmountApplied;

    } else if (offerDetails[0].offerType === "offer" && offerDetails[0].offerAmount > 0) {
        offerAmountApplied = newBasePrice - offerDetails[0].offerAmount;
        postOfferPrice  = newBasePrice - offerAmountApplied;
    }

    const price = {
        priceId: priceInfo[0].id,
        price: {
            basicPrice: newBasePrice,
            postOfferPrice: postOfferPrice,
            offerAmtApplied: offerAmountApplied
        }
    }
    console.log("new price calculated after ofer", price)
    var priceData = await axiosClient.put(UPDATE_PRICE, price);
    //console.log("priceData", priceData)
}

export const PriceAPI = {
    getPrice,
    getPriceDetails,
    updatePrice
}; 