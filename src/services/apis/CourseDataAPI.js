import { axiosClient } from "./configs/axiosApiClient";

const COURSES_URL = "/courses";

const CATEGORIES_URL = COURSES_URL + "/categories";
const COURSE_DETAIL_URL = COURSES_URL + "/detail";
const COURSES_PROGRESS = COURSES_URL + "/progress";

const WATCH_PROGRESS_URL = COURSES_URL + "/watch-history/update";
const COURSE_SUBSCRIPTION_URL = "/subscription/verify";

function getCourseCategories(params = {}) {
  return axiosClient.get(CATEGORIES_URL, {
    params,
  });
}

function getCoursesProgress() {
  return axiosClient.get(COURSES_PROGRESS);
}

function getCourses(params = {}) {
  //console.log("Gettign courses:",...params)
  if (params instanceof URLSearchParams) {
    params.append("replaceIds", false);
  } else {
    params = {
      ...params,
      replaceIds: false,
    };
  }
  return axiosClient.get(COURSES_URL, { params },
  );
}


function getCoursesProg(params = {}) {
   return axiosClient.get(COURSES_URL, { params },
  );
}


function getCourseDetails(courseId, params = {}) {
  return axiosClient.get(`${COURSE_DETAIL_URL}/${courseId}`, {
    params: { ...params, replaceIds: false },
  });
}

function sendSectionProgress(progressData) {
  return axiosClient.post(WATCH_PROGRESS_URL, progressData);
}

function getCourseSubscription(params) {
  return axiosClient.get(COURSE_SUBSCRIPTION_URL, {
    params,
  });
}

export const CourseDataAPI = {
  getCourseCategories,
  getCourses,
  getCoursesProg,
  getCourseDetails,
  sendSectionProgress,
  getCoursesProgress,
  getCourseSubscription,
};
