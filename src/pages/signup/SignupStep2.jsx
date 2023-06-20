import { useState } from "react";
import { Form } from "react-bootstrap";

import { UserAPI } from "../../services/apis/UserAPI";
import { INPUT_VALIDATION_STATES } from "../../utils/constants";
import MobileInput from "./MobileInput";
import OtpInput from "./OtpInput";
import SignupStepFooter from "./SignupStepFooter";
import EmailInput from "./EmailInput";

const SignupStep2 = ({ signupContext }) => {
  const {
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    goToStep,
    setErrorText,
    sendMobileOtp,
    sendEmailOtp
  } = signupContext;

  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await UserAPI.verifyOtpEmail({
        userOtp: emailOtp,
        email,
      });
      const { data } = response;
      console.info("successfully otp email..", data);

      if (data.status === "SUCCESS") {
        goToStep(+1);
      } else {
        setErrorText(data.message);
      }
    } catch (error) {
      const { response } = error;
      setErrorText(response.data.message);
    }
  };

  const onSubmit2 = async (event) => {
    event.preventDefault();

    try {
      const reponse = await UserAPI.verifyOtpMobile({
        userOtp: mobileOtp,
        mobile: "+" + mobileNumber,
      });

      const { data } = reponse;
      console.info("otp mobile..", data, mobileNumber);

      if (data.status === "SUCCESS") {
        goToStep(+1);
      } else {
        setErrorText(data.message);
      }
    } catch (error) {
      const { response } = error;
      setErrorText(response.data.message);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="login-form">
      
      <EmailInput
        className="mb-4"
        email={email}
        inputState={INPUT_VALIDATION_STATES.verification}
        goToBackStep={() => goToStep(-1)}
    />

      <OtpInput
        setOtp={setEmailOtp}
        resendOtp={async () => {
          try {
            await sendEmailOtp(email);
          } catch (error) {
            console.error("resending otp failed", error);
            setErrorText(error);
          }
        }}
      />
  
      <SignupStepFooter submitText={"Verify OTP"} />
    </Form>
  );
};

export default SignupStep2;
