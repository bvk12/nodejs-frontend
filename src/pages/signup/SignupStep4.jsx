import { useState } from "react";
import { Form } from "react-bootstrap";

import { UserAPI } from "../../services/apis/UserAPI";
import { INPUT_VALIDATION_STATES } from "../../utils/constants";
import EmailInput from "./EmailInput";
import MobileInput from "./MobileInput";
import OtpInput from "./OtpInput";
import SignupStepFooter from "./SignupStepFooter";

const SignupStep4 = ({ signupContext }) => {
  const { mobileNumber, email, goToStep, setErrorText, 
    sendMobileOtp } =
    signupContext;

  const [mobileOtp, setMobileOtp] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    
    let addPlusNewMobile = mobileNumber;
      
    if(!mobileNumber.startsWith("+")){
     addPlusNewMobile = "+"+ mobileNumber;
    }
  
    try {
      const response = await UserAPI.verifyOtpMobile({
        userOtp: mobileOtp,
        mobile: addPlusNewMobile
      });
      const { data } = response;
      console.info("successfully otp mobile..", data);

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
        inputState={INPUT_VALIDATION_STATES.validated}
        goToBackStep={() => goToStep(-1)}
      />

      <MobileInput
        className="mb-4"
        mobileNumber={mobileNumber}
        state={INPUT_VALIDATION_STATES.input}
      />

      
      <OtpInput
        setOtp={setMobileOtp}
        resendOtp={async () => {
          try {
            await sendMobileOtp(mobileNumber);
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

export default SignupStep4;
