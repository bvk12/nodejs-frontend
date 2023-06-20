import { axiosClient } from "./configs/axiosApiClient";

const RESOURCE_NM = "/admin/";

const PERMISSIONS_URL = RESOURCE_NM + "permissions/";
const FEATURES_URL = PERMISSIONS_URL + "features/";
const CREATE_FEATURE = FEATURES_URL + "create";
const UPDATE_FEATURE = FEATURES_URL + "update";

const PERMISSION_TYPES_URL = PERMISSIONS_URL + "types";

function getFeatures(params = {}) {
  const { isActive } = params;

  return axiosClient.get(FEATURES_URL, {
    params: {
      isActive,
    },
  });
}

function createFeature(requestBodyParams) {
  return axiosClient.post(CREATE_FEATURE, requestBodyParams);
}

function updateFeature(requestBodyParams) {
  return axiosClient.put(UPDATE_FEATURE, requestBodyParams);
}

function getPermissionTypes() {
  return axiosClient.get(PERMISSION_TYPES_URL);
}

export const FeaturesAPI = {
  getFeatures,
  createFeature,
  updateFeature,
  getPermissionTypes,
};
