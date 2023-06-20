import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AccountAPI } from "../services/apis/AccountAPI";
import { AuthContext } from "../context/AuthContextProvider";
import { UtilsAPI } from "../services/apis/UtilsAPI";
import useToast from "./useToast";
import { ToastVariants } from "../utils/constants";

const useProfileSettings = () => {
  const { user, auth, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [errorText, setErrorTetxt] = useState("");

  const [countries, setCountries] = useState();

  const { showToast } = useToast();

  const getProfileSettings = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data: responseData } = await AccountAPI.getProfileSettings(
        user.userId
      );

      if (responseData.status === "SUCCESS") {
        setProfileData(responseData.data);
      } else {
        throw responseData.message;
      }

      const { data: countriesData } = await UtilsAPI.getCountries();

      if (countriesData.status === "SUCCESS") {
        setCountries(countriesData.data);
      } else {
        throw countriesData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useProfileSettings: getProfileSettings: geting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileSettings();
  }, [user]);

  const setProfileSettings = async (data) => {
    setErrorTetxt("");

    // call backend API to update profile settings
    try {
      const { data: response } = await AccountAPI.updateProfileSettings(
        data,
        user.userId
      );
      if (response.status !== "SUCCESS") {
        throw response.message;
      }

      setUser({
        ...user,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      showToast("Successfully updated Profile Settings", ToastVariants.success);
    } catch (error) {
      console.error(
        "useProfileSettings: setProfileSettings: updating data failed, error:",
        error
      );

      showToast(
        "Failed to update Profile Settings. Please try laters",
        ToastVariants.error
      );

      if (error.response) {
        setErrorTetxt(error.response.data.message);
      } else {
        setErrorTetxt(error);
      }
    }
  };

  return {
    loading,
    error,
    profileData,
    setProfileSettings,
    countries,
    errorText,
  };
};

export default useProfileSettings;
