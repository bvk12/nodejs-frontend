import { useEffect, useState } from "react";
import { FeaturesAPI } from "../services/apis/FeaturesAPI";
import { RolesAPI } from "../services/apis/RolesAPI";
import { RoleCodesMap, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const useRoleFeatures = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [roleData, setRoleData] = useState();
  const [selectedRoleCode, setSelectedRoleCode] = useState();
  const [featureData, setFeatureData] = useState([]);
  const [permissionTypes, setPermissionTypes] = useState([]);

  const { showToast } = useToast();

  const getRolefeatureData = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await RolesAPI.getRoles();

      if (responseData.status === "SUCCESS") {
        const roles = responseData.data.roles;

        // filtering super admin role
        const filteredRoles =
          roles?.filter(
            (role) =>
              role.roleCode !== RoleCodesMap.SuperAdmin &&
              role.roleCode !== RoleCodesMap.Student
          ) || [];

        setRoleData(filteredRoles);
        setSelectedRoleCode(filteredRoles[0]?.roleCode);
      } else {
        throw responseData.message;
      }

      const { data: featureResponseData } = await FeaturesAPI.getFeatures();

      if (featureResponseData.status === "SUCCESS") {
        setFeatureData(featureResponseData.data.features);
      } else {
        throw featureResponseData.message;
      }

      const { data: permissionResponseData } =
        await FeaturesAPI.getPermissionTypes();

      if (permissionResponseData.status === "SUCCESS") {
        setPermissionTypes(permissionResponseData.data.permissionTypes);
      } else {
        throw permissionResponseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useRoleFeatures: getRolefeatureData: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getSelectedRole = () => {
    const selectedRole = roleData.find(
      (role) => role.roleCode === selectedRoleCode
    );

    return selectedRole;
  };

  const getSelectedRolePermissions = () => {
    const selectedRole = getSelectedRole();
    return selectedRole.featurePermissions;
  };

  // returns if permission is present for selected feature and role
  const isPermissionPresent = (permission, featureId) => {
    const roleFeatures = getSelectedRolePermissions();

    const assignedPermissions = roleFeatures.find(
      (feature) => feature.featureCode === featureId
    );

    if (!assignedPermissions) {
      return false;
    }

    return assignedPermissions.permissions.includes(permission);
  };

  const isAllPermissionPresent = (featureCode) => {
    const roleFeatures = getSelectedRolePermissions();

    const assignedPermissions = roleFeatures.find(
      (feature) => feature.featureCode === featureCode
    );

    if (!assignedPermissions) {
      return false;
    }

    return assignedPermissions.permissions.includes("all");
  };

  const updateAllPermission = (featureId, checked) => {
    const selectedRole = getSelectedRole();

    let roleFeatures = [...getSelectedRolePermissions()];

    if (checked) {
      roleFeatures.push({
        featureCode: featureId,
        permissions: ["all"],
      });
    } else {
      roleFeatures = roleFeatures.filter(
        (feature) => feature.featureCode !== featureId
      );
    }

    const newRoleData = {
      ...selectedRole,
      featurePermissions: roleFeatures,
    };

    editRole(newRoleData.roleCode, newRoleData);
  };

  const updatePermission = (permission, featureId, checked) => {
    let roleFeatures = [...getSelectedRolePermissions()];

    let assignedPermissions = roleFeatures.find(
      (feature) => feature.featureCode === featureId
    );

    if (!assignedPermissions) {
      roleFeatures.push({
        featureCode: featureId,
        permissions: [permission],
      });
    } else {
      let newPermissions = [...assignedPermissions.permissions];

      if (checked) {
        newPermissions.push(permission);
      } else {
        newPermissions = [
          ...assignedPermissions.permissions.filter(
            (perm) => perm !== permission
          ),
        ];
      }

      let newFeature = {
        featureCode: featureId,
        permissions: newPermissions,
      };

      let newRoleFeatures = roleFeatures.filter(
        (feature) => feature.featureCode !== featureId
      );

      if (newFeature.permissions.length !== 0) {
        newRoleFeatures.push(newFeature);
      }
      roleFeatures = newRoleFeatures;
    }

    const selectedRole = getSelectedRole();
    const newRoleData = {
      ...selectedRole,
      featurePermissions: roleFeatures,
    };

    editRole(newRoleData.roleCode, newRoleData);
  };

  const editRole = async (roleCode, newRoleData) => {
    delete newRoleData.id;
    delete newRoleData.roleCode;

    try {
      const body = {
        roleCode,
        role: {
          featurePermissions: newRoleData.featurePermissions,
          roleName: newRoleData.roleName,
          displayName: newRoleData.displayName,
          description: newRoleData.description,
          isActive: newRoleData.isActive,
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
        showToast("Successfully Updated Permissions", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error("useRoles: editRole: update permission failed:", error);
      showToast(
        "Failed to edit permission. Please try again.",
        ToastVariants.error
      );
    }
  };

  useEffect(() => {
    getRolefeatureData();
  }, []);

  return {
    loading,
    error,
    roleData,
    featureData,
    permissionTypes,
    selectedRoleCode,
    setSelectedRoleCode,
    isPermissionPresent,
    updatePermission,
    isAllPermissionPresent,
    updateAllPermission,
  };
};

export default useRoleFeatures;
