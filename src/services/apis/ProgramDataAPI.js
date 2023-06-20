import { axiosClient } from "./configs/axiosApiClient";

const PROGRAMS_URL = "/programs";

function getPrograms(params = {}) {
  return axiosClient.get(PROGRAMS_URL, {
    params: { ...params, replaceIds: false , showPrices:true, isActive:true},
  });
}

function getProgramDetails(programId, params = {}) {
  return axiosClient.get(`${PROGRAMS_URL}/?id=${programId}`, {
    params: { ...params, replaceIds: false },
  });
}

export const ProgramDataAPI = {
  getPrograms,
  getProgramDetails,  
};
