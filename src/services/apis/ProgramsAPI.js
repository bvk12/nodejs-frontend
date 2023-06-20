import { axiosClient } from "./configs/axiosApiClient";

const PROGRAMS_URL = "/programs/admin";
const CREATE_PROGRAMS = PROGRAMS_URL + "/create";
const UPDATE_PROGRAMS = PROGRAMS_URL + "/update";



function getPrograms(params) {
  return axiosClient.get(PROGRAMS_URL, { params });
}

function createProgram(requestBodyParams) {
  return axiosClient.post(CREATE_PROGRAMS, requestBodyParams);
}

function updateProgram(requestBodyParams) {
  return axiosClient.put(UPDATE_PROGRAMS, requestBodyParams);
}
export const ProgramsAPI = {
  getPrograms,
  createProgram,
  updateProgram
}
