import { axiosClient } from "./configs/axiosApiClient";

function getCountries() {
  return axiosClient.get("/countries");
}

export const UtilsAPI = {
  getCountries,
};
