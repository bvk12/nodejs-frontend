import { axiosClient } from "../apis/configs/axiosApiClient";

const RESOURCE_NM = "/user/";

const CHECKUSER_URL = RESOURCE_NM + "checkUser";
const SENDEMAILVERIFICATIONOTP_URL = RESOURCE_NM + "sendEmailVerificationOTP";
const SENDMOBILEVERIFICATIONOTP_URL = RESOURCE_NM + "sendMobileVerificationOTP";
const REGISTER_URL = RESOURCE_NM + "register";
const VERIFYMOBILE_URL = RESOURCE_NM + "verifyMobile";
const VERIFYEMAIL_URL = RESOURCE_NM + "verifyEmail";
const LOGIN_URL = RESOURCE_NM + "login";
const LOGIN_APPLE_URL = RESOURCE_NM + "login/apple";
const LOGIN_GOOGLE_URL = RESOURCE_NM + "login/google";
const VERIFY_TOKEN_URL = RESOURCE_NM + "verifyToken";
const RESET_PASSWORD_URL = RESOURCE_NM + "updatePassword";
const GET_FAVOURITES_URL = RESOURCE_NM + "getFavourites";
const ADD_FAVOURITES_URL = RESOURCE_NM + "addFavourites";
const GET_TESTIMONIALS_URL = RESOURCE_NM + "getTestimonials";
const GET_LOGOSETTINGS_URL = RESOURCE_NM + "getLogoSettings";
const GET_FOOTERSETTINGS_URL = RESOURCE_NM + "getFooterSettings"


const ROLE_PERMISSIONS_URL = RESOURCE_NM + "getRoleFeatures";

function verifyToken() {
  console.log("Verifying token.");
  return axiosClient.get(VERIFY_TOKEN_URL);
}

function sendEmailOtp(requestBodyParams) {
  var apiRequestBody = {
    email: requestBodyParams.email,
  };
  console.log("sending otp Email.", apiRequestBody);
  return axiosClient.post(SENDEMAILVERIFICATIONOTP_URL, apiRequestBody);
}

function sendMobileOtp(requestBodyParams) {
  console.log("Checking Mobile.", requestBodyParams);
  var apiRequestBody = {
    mobile: requestBodyParams.mobile,
  };
  return axiosClient.post(SENDMOBILEVERIFICATIONOTP_URL, apiRequestBody);
}

function registerUser(requestBodyParams) {
  var apiRequestBody = {
    ...requestBodyParams,
  };
  console.log("Registering user.");
  return axiosClient.post(REGISTER_URL, apiRequestBody);
}

function checkMobile(requestBodyParams) {
  var apiRequestBody = {
    type: "mobile",
    value: requestBodyParams.mobileNumber,
  };
  //console.log("apiRequestBody for mobile",apiRequestBody)
  return axiosClient.post(CHECKUSER_URL, apiRequestBody);
}

function checkEmail(requestBodyParams) {
  console.log("Checking Email.");
  var apiRequestBody = {
    type: "email",
    value: requestBodyParams.email,
  };
  return axiosClient.post(CHECKUSER_URL, apiRequestBody);
}

function verifyOtpMobile(requestBodyParams) {
  var apiRequestBody = {
    userOtp: requestBodyParams.userOtp,
    mobile: requestBodyParams.mobile,
  };
  return axiosClient.post(VERIFYMOBILE_URL, apiRequestBody);
}

function verifyOtpEmail(requestBodyParams) {
  var apiRequestBody = {
    userOtp: requestBodyParams.userOtp,
    email: requestBodyParams.email,
  };
  console.log("Verify otp email:", apiRequestBody);
  return axiosClient.post(VERIFYEMAIL_URL, apiRequestBody);
}

function login(requestBodyParams) {
  var apiRequestBody = {
    username: requestBodyParams.email,
    type: "email",
    password: requestBodyParams.password,
  };

  return axiosClient.post(LOGIN_URL, apiRequestBody);
}

function loginApple(requestBodyParams) {
  var apiRequestBody = {
    authorization: requestBodyParams?.authorization,
    user: requestBodyParams?.user,
    id_token: requestBodyParams?.id_token,
  };

  return axiosClient.post(LOGIN_APPLE_URL, apiRequestBody);
}

function loginGoogle(requestBodyParams) {
  var apiRequestBody = {
    email: requestBodyParams?.email,
    family_name: requestBodyParams?.family_name,
    given_name: requestBodyParams?.given_name,
    picture: requestBodyParams?.picture,
  };

  return axiosClient.post(LOGIN_GOOGLE_URL, apiRequestBody);
}

function resetPassword(requestBodyParams) {
  return axiosClient.post(RESET_PASSWORD_URL, requestBodyParams);
}

function addFavourites() {}

function getFavourites() {
  return axiosClient.get(GET_FAVOURITES_URL);
}

function getUserPermissions() {
  return axiosClient.get(ROLE_PERMISSIONS_URL);
}

function getTestimonials(){
  return axiosClient.get(GET_TESTIMONIALS_URL);
}
function getLogoSettings(){
  return axiosClient.get(GET_LOGOSETTINGS_URL);
}
function getFooterSettings(){
  return axiosClient.get(GET_FOOTERSETTINGS_URL);
}
export const UserAPI = {
  login,
  verifyOtpEmail,
  verifyOtpMobile,
  sendMobileOtp,
  registerUser,
  sendEmailOtp,
  checkMobile,
  checkEmail,
  loginApple,
  loginGoogle,
  verifyToken,
  resetPassword,
  addFavourites,
  getFavourites,
  getUserPermissions,
  getTestimonials,
  getLogoSettings,
  getFooterSettings
};
