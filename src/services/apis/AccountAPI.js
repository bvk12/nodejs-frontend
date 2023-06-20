import { axiosClient } from "../apis/configs/axiosApiClient";
import { axiosFormClient } from "./configs/axiosApiClient";

const RESOURCE_NM = "/account/";

const PROFILESETTINGS_URL = RESOURCE_NM + "profile";
const LOGINSETTINGS_URL = RESOURCE_NM + "login";

function getProfileSettings(userId) {
  // remove the params once user auth workflow is complete
  return axiosClient.get(PROFILESETTINGS_URL, {
    params: {
      userId,
    },
  });
}

function updateProfileImage(formData){
 // console.log("Form data",formData);
   return axiosFormClient.post(PROFILESETTINGS_URL + "/uploadImage", formData);
}

function updateProfileSettings(profileSettings, userId) {
  var requestBody = {
    userId,
    profile: profileSettings,
  };

  return axiosClient.put(PROFILESETTINGS_URL + "/update", requestBody);
}

function updateUserAccount(userId, userSettings) {
  var requestBody = {
    userId,
    user: {
      ...userSettings,
    },
  };

  return axiosClient.put(LOGINSETTINGS_URL + "/update", requestBody);
}

export const AccountAPI = {
  getProfileSettings,
  updateProfileSettings,
  updateUserAccount,
  updateProfileImage
};
