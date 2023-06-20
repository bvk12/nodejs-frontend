import { axiosClient } from "./configs/axiosApiClient";

const RESOURCE_NM = "/admin/";

const PERMISSIONS_URL = RESOURCE_NM+'permissions/';
const ROLES_URL= PERMISSIONS_URL+ 'roles/';
const CREATE_ROLE = ROLES_URL + 'create';
const UPDATE_ROLE = ROLES_URL + 'update';


function getRoles(params = {}) {
  const { isActive  } = params;

  return axiosClient.get(ROLES_URL, {
    params: {
      isActive
    }
  })
}

function createRole(requestBodyParams) {
  return axiosClient.post(CREATE_ROLE, requestBodyParams);
}

function updateRole(requestBodyParams) {
  return axiosClient.put(UPDATE_ROLE, requestBodyParams);

}

 
export const RolesAPI = {
  getRoles,
  createRole,
  updateRole
}
