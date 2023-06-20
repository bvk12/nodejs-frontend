import { axiosClient } from "./configs/axiosApiClient";

const COURSES_URL = "/admin/courses";
const CREATE_COURSES = COURSES_URL + "/create";
const UPDATE_COURSES = COURSES_URL + "/update";

const TAGS_URL = COURSES_URL + "/tags";
const CREATE_TAG = TAGS_URL + "/create";
const UPDATE_TAG = TAGS_URL + "/update";

const TAG_TYPES_URL = COURSES_URL + "/tagTypes";

const CHAPTERS_URL = COURSES_URL + "/chapters";
const CREATE_CHAPTERS = CHAPTERS_URL + "/create";
const UPDATE_CHAPTERS = CHAPTERS_URL + "/update";

const SECTIONS_URL = COURSES_URL + "/sections";
const CREATE_SECTIONS = SECTIONS_URL + "/create";
const UPDATE_SECTIONS = SECTIONS_URL + "/update";

function getTags(params = {}) {
  return axiosClient.get(TAGS_URL, {
    params,
  });
}

function getTagTypes() {
  return axiosClient.get(TAG_TYPES_URL);
}

function createTag(requestBodyParams) {
  return axiosClient.post(CREATE_TAG, requestBodyParams);
}

function updateTag(requestBodyParams) {
  return axiosClient.put(UPDATE_TAG, requestBodyParams);
}

function getCourses(params) {
  return axiosClient.get(COURSES_URL, {
    params: { ...params, replaceIds: false },
  });
}

function getChapters(params) {
  return axiosClient.get(CHAPTERS_URL, { params });
}

function getSections(params) {
  return axiosClient.get(SECTIONS_URL, params);
}

function createCourse(requestBodyParams) {
  return axiosClient.post(CREATE_COURSES, requestBodyParams);
}

function updateCourse(requestBodyParams) {
  return axiosClient.put(UPDATE_COURSES, requestBodyParams);
}

function createChapter(params) {
  return axiosClient.post(CREATE_CHAPTERS, params);
}

function updateChapter(params) {
  return axiosClient.put(UPDATE_CHAPTERS, params);
}

function createSection(params) {
  return axiosClient.post(CREATE_SECTIONS, params);
}

function updateSection(params) {
  return axiosClient.put(UPDATE_SECTIONS, params);
}

export const CoursesAPI = {
  getTags,
  createTag,
  updateTag,
  getCourses,
  getChapters,
  createChapter,
  updateChapter,
  getSections,
  createSection,
  updateSection,
  createCourse,
  updateCourse,
  getTagTypes,
};
