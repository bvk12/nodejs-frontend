import { axiosClient } from "./configs/axiosApiClient";

const RESOURCE_NM = "/admin/";
const SETTINGS_URL = RESOURCE_NM + "settings";
const PUBLIC_SETTINGS_URL = RESOURCE_NM + "settings/public";

const USERS_URL = RESOURCE_NM + "users";

function getConfigSettings(requestURLParams) {
  var apiRequestUrlParams = "?name=" + requestURLParams.name;
  console.log("Get System settings", apiRequestUrlParams);
  return axiosClient.get(SETTINGS_URL + apiRequestUrlParams);
}

function getPublicConfigSettings(requestURLParams){
  var apiRequestUrlParams = "?name=" + requestURLParams.name;
  console.log("Get Public System settings", apiRequestUrlParams);
  return axiosClient.get(PUBLIC_SETTINGS_URL + apiRequestUrlParams);
}

function saveConfigSettings(requestBodyParams) {
  var apiRequestBody = {
    name: requestBodyParams.name,
    title: requestBodyParams.title,
    data: requestBodyParams.data,
    metaData: requestBodyParams.metaData,
  };
  //console.warn("===AdminAPI -saving admin settings",apiRequestBody);
  return axiosClient.put(SETTINGS_URL, apiRequestBody);
}

function getAllUsers(params = {}) {
  const { showLearners } = params;

  return axiosClient.get(`${USERS_URL}`, {
    params: {
      showLearners,
    },
  });
}

function createNewUser(body) {
  return axiosClient.post(`${USERS_URL}/create`, body);
}

function updateUser(body) {
  return axiosClient.put(`${USERS_URL}/update`, body);
}

export const AdminAPI = {
  getConfigSettings,
  getPublicConfigSettings,
  saveConfigSettings,  
  getAllUsers,
  createNewUser,
  updateUser,
};
