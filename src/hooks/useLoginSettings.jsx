import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useLoginSettings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loginData, setLoginData] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const getLoginSettings = async () => {
    try {
      setLoading(true);
      setError(false);

      // TODO: call backend API and get data
      // then set profile data
      setLoginData({
        email: "vinaykota1729@gmail.com",
        password: "password",
        phoneNumber: "9848409555",
      });
    } catch (error) {
      setError(true);
      console.error(
        "useLoginSettings: getProfileSettings: geting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoginSettings();
  }, []);

  const setLoginSettings = (data) => {
    // call backend API to update profile settings
  };

  return {
    loading,
    error,
    loginData,
    setLoginSettings,
    handleSubmit,
    control,
    errors,
  };
};

export default useProfileSettings;
