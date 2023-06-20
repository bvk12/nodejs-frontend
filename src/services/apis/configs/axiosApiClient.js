import axios from "axios";
import _ from "lodash";
import { LocalStorageKeys } from "../../../utils/constants";
import { getItem, setItem } from "../../../utils/storageUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  var tokensData = await getItem(LocalStorageKeys.loginAuthKey);

  if (_.isEmpty(tokensData)) {
    if (config.url.includes("login")) return config;
  }

  // if user is not logged in,  don't send auth headers. (some pages are public)
  if (config.headers && tokensData && tokensData.accessToken) {
    config.headers["Authorization"] = `bearer ${tokensData.accessToken}`;
  }

  return config;
});

export const axiosFormClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: "",
  },
});

axiosFormClient.interceptors.request.use(async (config) => {
  var tokensData = await getItem(LocalStorageKeys.loginAuthKey);

  if (_.isEmpty(tokensData)) {
    if (config.url.includes("login")) return config;
  }

  // if user is not logged in,  don't send auth headers. (some pages are public)
  if (config.headers && tokensData && tokensData.accessToken) {
    config.headers["Authorization"] = `bearer ${tokensData.accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    //  console.log("Interceptor:Successful ")
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      console.log("Token Expired");
      const authData = await getItem(LocalStorageKeys.loginAuthKey);
      // console.log("401 Error:refreshToken",authData)
      var headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "bearer " + authData.refreshToken,
      };
      try {
        let apiResponse = await axios.get(BASE_URL + "user/refresh", {
          headers,
        });
        console.log("RefreshToken/AccessToken recieved", apiResponse);
        setItem(LocalStorageKeys.loginAuthKey, apiResponse.data.data.auth);
        return axiosClient(originalConfig);
      } catch (_error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
