import { axiosClient } from "./configs/axiosApiClient";

const COURSES_URL = "/admin/courses";

const CATEGORIES_URL = COURSES_URL + "/categories";
const CREATE_CATEGORY = CATEGORIES_URL + "/create";
const UPDATE_CATEGORY = CATEGORIES_URL + "/update";

function getCategories(params = {}) {
  return axiosClient.get(CATEGORIES_URL, {
    params,
  });
}

function createCategory(requestBodyParams) {
  return axiosClient.post(CREATE_CATEGORY, requestBodyParams);
}

function updateCategory(requestBodyParams) {
  return axiosClient.put(UPDATE_CATEGORY, requestBodyParams);
}

function deleteCategory(categoryId) {
  return axiosClient.put(UPDATE_CATEGORY + "/" + categoryId);
}

export const CategoriesAPI = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
