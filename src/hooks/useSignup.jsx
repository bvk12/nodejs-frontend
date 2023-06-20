import { useIonRouter } from "@ionic/react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { UserAPI } from "../services/apis/UserAPI";
import { routes, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const useSignup = () => {
  const { showToast } = useToast();
  const router = useIonRouter();
  const { setUser } = useContext(AuthContext);

  const [stepNo, setStepNo] = useState(1);

  // state info
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");

  const goToStep = (stepCount) => {
    setErrorText("");
    setStepNo(stepNo + stepCount);
  };

  const checkEmail = async (email) => {
    try {
      const response = await UserAPI.checkEmail({ email });
      return response;
    } catch (err) {
      return {
        status: "ERROR",
        message: "Unkonwn server error.",
      };
    }
  };
  const checkMobile = async (mobile) => {
    try {
      const response = await UserAPI.checkEmail({ mobile });
      return response;
    } catch (err) {
      return {
        status: "ERROR",
        message: "Unkonwn server error.",
      };
    }
  };

  const sendMobileOtp = async (mobileNumber) => {
    try {
      const isRegistered = await UserAPI.checkMobile({ mobileNumber });
      console.info("IS Moble registered..", isRegistered);
      if (isRegistered?.data?.status === "ERROR") {
        showToast(isRegistered.data?.message, ToastVariants.info);
        //throw new String(isRegistered.data?.message);
      }


      let addPlusNewMobile = mobileNumber

      if (!mobileNumber.startsWith("+")) {
        addPlusNewMobile = "+" + mobileNumber;
      }

      const reponse = await UserAPI.sendMobileOtp({
        mobile: addPlusNewMobile,
      });
      showToast(
        "OTP Sent Successfully, Please check your mobile ",
        ToastVariants.success
      );
      console.info("sent otp mobile..", reponse, mobileNumber);
      return true;
    } catch (error) {
      if (error instanceof String) {
        throw error;
      }

      showToast("Sending OTP failed, Please try again ", ToastVariants.error);
      const { response } = error;
      throw response.data.message;
    }
  };

  const sendEmailOtp = async (email) => {
    try {
      const isEmailRegistered = await UserAPI.checkEmail({ email });
      // console.info("IS Email registered..", isEmailRegistered);
      if (isEmailRegistered?.data?.status === "ERROR") {
        showToast(isEmailRegistered.data?.message, ToastVariants.error);
        throw new String(isEmailRegistered.data?.message);
      }

      const response = await UserAPI.sendEmailOtp({ email });
      showToast(
        "OTP Sent Successfully, Please Check your email ",
        ToastVariants.success
      );
      console.info("sent otp email..", response, email);
      return true;
    } catch (error) {
      if (error instanceof String) throw error;

      showToast("Sending OTP failed, Please try again ", ToastVariants.error);
      const { response } = error;
      throw response.data.message;
    }
  };

  const hanldeSignup = (data) => {
    setUser({
      email: data.email,
      password: data.password,
    });
    router.push(routes.home, "forward", "push");
  };

  return {
    stepNo,
    goToStep,
    mobileNumber,
    setMobileNumber,
    email,
    setEmail,
    errorText,
    setErrorText,
    sendMobileOtp,
    sendEmailOtp,
    hanldeSignup,
  };
};

export default useSignup;
