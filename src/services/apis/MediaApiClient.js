import { axiosFormClient,axiosClient } from "./configs/axiosApiClient";

const RESOURCE_NM = "/media/";
const ACTION_URL = RESOURCE_NM + "img/upload/";
const NAMEDUPLOAD_ACTION_URL = RESOURCE_NM + "img/namedUpload/";

const DELETE_URL = RESOURCE_NM + "img/delete";

function uploadImage(formData) {
  console.log("Upload image", formData);
  return axiosFormClient.post(ACTION_URL, formData);
}

function uploadNamedImage(formData) {

  console.log("Upload Named image", formData);
  return axiosFormClient.post(NAMEDUPLOAD_ACTION_URL, formData);
}

function deleteImage(params) {
  return axiosClient.delete(DELETE_URL, {
    data: params,
  });
}

export const MediaAPI = {
  uploadImage,
  deleteImage,
  uploadNamedImage
};
