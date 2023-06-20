import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { AdminAPI } from "../services/apis/AdminAPI";
import { FeaturesAPI } from "../services/apis/FeaturesAPI";
import { RolesAPI } from "../services/apis/RolesAPI";
import { UserAPI } from "../services/apis/UserAPI";
import {
  ACTIVE_FILTER_STATES,
  RoleCodesMap,
  ToastVariants,
} from "../utils/constants";
import useToast from "./useToast";

const useManageUsers = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [userData, setUserData] = useState();
  const [roleData, setRoleData] = useState();

  const [filteredData, setFilteredData] = useState();

  const [activeFilter, setActiveFilter] = useState(ACTIVE_FILTER_STATES.active);
  const [selectedRoleCode, setSelectedRoleCode] = useState("All");

  const [showAddUserPopover, setShowAddUserPopover] = useState(false);
  const [showEditUserPopover, setShowEditUserPopover] = useState(false);
  const [editUserData, setEditUserData] = useState();
  const [errorText, setErrorText] = useState();

  const { user } = useContext(AuthContext);

  const getData = async (showLoading = true) => {
    try {
      setLoading(showLoading);
      setError(false);

      const { data: responseData } = await RolesAPI.getRoles();

      if (responseData.status === "SUCCESS") {
        setRoleData(responseData.data.roles);
      } else {
        throw responseData.message;
      }

      const { data: userData } = await AdminAPI.getAllUsers({
        showLearners: false,
      });

      if (userData.status === "SUCCESS") {
        const userRoleCode = user.roleCode;

        // if user is not super admin, hide super admin users
        if (userRoleCode !== RoleCodesMap.SuperAdmin) {
          const users = userData.data.user;

          const filteredUsers = users?.filter(
            (user) => user.roleCode !== RoleCodesMap.SuperAdmin
          );
          setUserData(filteredUsers);
        } else {
          setUserData(userData.data.user);
        }
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useManageUsers: getData: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!userData) return;

    let newFilteredData = [];

    if (activeFilter === ACTIVE_FILTER_STATES.active) {
      newFilteredData = userData.filter((user) => user.isActive);
    } else if (activeFilter === ACTIVE_FILTER_STATES.inActive) {
      newFilteredData = userData.filter((user) => !user.isActive);
    } else {
      newFilteredData = [...userData];
    }

    if (selectedRoleCode !== "All") {
      newFilteredData = newFilteredData.filter(
        (user) => user.roleCode === selectedRoleCode
      );
    }

    setFilteredData(newFilteredData);
  }, [userData, activeFilter, selectedRoleCode]);

  const editUser = async (newUserInfo, userId) => {
    try {
      const body = {
        userId,
        user: newUserInfo,
      };

      const { data: responseData } = await AdminAPI.updateUser(body);

      if (responseData.status === "SUCCESS") {
        getData(false);
        showToast("Successfully Updated User", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error("useManageUsers: editUser: update user failed:", error);
      showToast(
        "Failed to update user. Please try again.",
        ToastVariants.error
      );
    }
  };

  const isUserEmailPresent = async (email) => {
    try {
      setErrorText("");
      const { data: responseData } = await UserAPI.checkEmail({ email });

      if (responseData.status === "SUCCESS") {
        return false;
      } else {
        setErrorText("User Email already exits. Please use new email address");

        
        return true;
      }
    } catch (error) {
      console.error(
        "useManageUsers: isUserEmailPresent: unable to check if user email exists or not",
        error
      );
      setErrorText("Unable to verify Email, Please try again");
      return true;
    }
  };

  const createUser = async (newUserInfo) => {
    try {
      const body = newUserInfo;
      const { data: responseData } = await AdminAPI.createNewUser(body);

      if (responseData.status === "SUCCESS") {
        // update the local state
        setUserData([...userData, responseData.data.user]);

        showToast("Successfully Added User", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error("useManageUsers: createUser: create user failed:", error);
      showToast(
        "Failed to create user. Please try again.",
        ToastVariants.error
      );
    }
  };

  let getRoleNameForRoleCode = (roleCode) => {
    if (!roleCode || !roleData) return "";

    const role = roleData.find((role) => role.roleCode === roleCode);
    return role?.displayName;
  };

  const getUserRoleNumber = () => {
    if (user.roleCode) {
      return Number(user.roleCode.slice(1));
    }
  };

  const getLowerRoleData = () => {
    if (!roleData) return [];

    return roleData.filter((role) => {
      const roleRoleNumber = Number(role.roleCode.slice(1));
      const userRoleNumber = getUserRoleNumber();

      // don't give super admin option in role dropdowns
      if (role.roleCode === RoleCodesMap.SuperAdmin) return false;

      // super admin has role code R1, highest role has smallest role number
      if (userRoleNumber <= roleRoleNumber) return true;
      else return false;
    });
  };

  const showEditForRoleCode = (roleCode) => {
    // don't give edit option for super admin users
    if (roleCode === RoleCodesMap.SuperAdmin) return false;

    const roleRoleNumber = Number(roleCode.slice(1));
    const userRoleNumber = getUserRoleNumber();

    if (userRoleNumber <= roleRoleNumber) return true;
    else return false;
  };

  return {
    loading,
    error,
    userData,
    roleData,
    filteredData,
    selectedRoleCode,
    setSelectedRoleCode,
    activeFilter,
    setActiveFilter,
    showAddUserPopover,
    setShowAddUserPopover,
    showEditUserPopover,
    setShowEditUserPopover,
    editUserData,
    setEditUserData,
    createUser,
    editUser,
    getRoleNameForRoleCode,
    isUserEmailPresent,
    errorText,
    setErrorText,
    getLowerRoleData,
    showEditForRoleCode,
  };
};

export default useManageUsers;
