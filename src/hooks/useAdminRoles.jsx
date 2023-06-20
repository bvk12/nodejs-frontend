import { useEffect, useState } from "react";
import { RolesAPI } from "../services/apis/RolesAPI";

import {
  ACTIVE_FILTER_STATES,
  RoleCodesMap,
  ToastVariants,
} from "../utils/constants";
import useToast from "./useToast";

const useRoles = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeFilter, setActiveFilter] = useState(ACTIVE_FILTER_STATES.active);

  const [showAddRolePopover, setShowAddRolePopover] = useState(false);
  const [showEditRolePopover, setShowEditRolePopover] = useState(false);
  const [editRoleData, setEditRoleData] = useState();

  const [roleData, setRoleData] = useState();
  const [filteredData, setFilteredData] = useState();

  const getRoles = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await RolesAPI.getRoles({ isActive: "A" });

      if (responseData.status === "SUCCESS") {
        const roles = responseData.data.roles;

        // filtering super admin role
        const filteredRoles = roles?.filter(
          (role) => role.roleCode !== RoleCodesMap.SuperAdmin
        );
        setRoleData(filteredRoles);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error("useRoles: getRoles: getting data failed, error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (!roleData) return;

    let newFilteredRoles = [];

    if (activeFilter === ACTIVE_FILTER_STATES.active) {
      newFilteredRoles = roleData.filter((role) => role.isActive);
    } else if (activeFilter === ACTIVE_FILTER_STATES.inActive) {
      newFilteredRoles = roleData.filter((role) => !role.isActive);
    } else {
      newFilteredRoles = [...roleData];
    }

    setFilteredData(newFilteredRoles);
  }, [roleData, activeFilter]);

  const editRole = async (roleCode, newRoleData) => {
    try {
      const body = {
        roleCode,
        role: {
          ...newRoleData,
        },
      };
      const { data: responseData } = await RolesAPI.updateRole(body);

      if (responseData.status === "SUCCESS") {
        // update the local state
        let newRoles = roleData.filter(
          (roleItem) => roleItem.roleCode !== roleCode
        );

        let newData = [...newRoles, responseData.data.role];
        setRoleData(newData);
        showToast("Successfully Updated Role", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error("useRoles: editRole: update role failed:", error);
      showToast("Failed to edit role. Please try again.", ToastVariants.error);
    }
  };

  const createRole = async (newRoleData) => {
    try {
      // TODO: get this from backend
      // currently getting the last number from row code and adding 1 to it.
      let sortedRoleCodes = roleData
        .map(({ roleCode }) => Number(roleCode.slice(1)))
        .sort((a, b) => a - b);
      const newRoleCode =
        "R" + (sortedRoleCodes[sortedRoleCodes.length - 1] + 1);

      const body = {
        role: {
          ...newRoleData,
          roleCode: newRoleCode,
          featurePermissions: [],
        },
      };
      const { data: responseData } = await RolesAPI.createRole(body);

      if (responseData.status === "SUCCESS") {
        // update the local state
        setRoleData([...roleData, responseData.data.role]);

        showToast("Successfully Created Role", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error("useRoles: createRole: create role failed:", error);
      showToast(
        "Failed to create role. Please try again.",
        ToastVariants.error
      );
    }
  };

  return {
    loading,
    error,
    roleData,
    editRole,
    activeFilter,
    filteredData,
    setActiveFilter,
    createRole,
    showAddRolePopover,
    setShowAddRolePopover,
    showEditRolePopover,
    setShowEditRolePopover,
    editRoleData,
    setEditRoleData,
  };
};

export default useRoles;
