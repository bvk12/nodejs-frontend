import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { UserAPI } from "../services/apis/UserAPI";
import { routes, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const useResetPassword = () => {
  const { showToast } = useToast();
  const router = useIonRouter();

  const [stepNo, setStepNo] = useState(1);

  // state info
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");

  const [userId, setUserId] = useState("");

  const goToStep = (stepCount) => {
    setErrorText("");
    setStepNo(stepNo + stepCount);
  };

  const sendOtp = async () => {
    try {
      const reponse = email
        ? await UserAPI.sendEmailOtp({ email })
        : await UserAPI.sendMobileOtp({
            mobile: "+" + mobileNumber,
          });
      showToast(
        "OTP Sent Successfully, Please check your mobile ",
        ToastVariants.success
      );
      console.info("sent otp mobile..", reponse, mobileNumber);
    } catch (error) {
      showToast("Sending OTP failed, Please try again ", ToastVariants.error);

      const { response } = error;
      throw response.data.message;
    }
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
    sendOtp,
    userId,
    setUserId,
  };
};

export default useResetPassword;
