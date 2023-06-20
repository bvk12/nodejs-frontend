import { Form } from "react-bootstrap";

import MobileInput from "./MobileInput";
import { INPUT_VALIDATION_STATES } from "../../utils/constants";
import { isValidNumber } from "libphonenumber-js";

import SignupStepFooter from "./SignupStepFooter";
import EmailInput from "./EmailInput";

const SignupStep3 = ({ signupContext }) => {
  const {
    mobileNumber,
    email,
    setEmail,
    goToStep,
    setErrorText,
    sendMobileOtp,
    setMobileNumber
  } = signupContext;

  const onSubmit2 = async (event) => {
    event.preventDefault();
    console.info("email", email);

    try {
      let success = await sendEmailOtp(email);
      if (success)
        goToStep(+1);
    } catch (error) {
      console.error("otp sending failed", error);
      setErrorText(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.info("mobile Number", mobileNumber);

    let addPlusNewMobile = mobileNumber
      
    if(!mobileNumber.startsWith("+")){
     addPlusNewMobile = "+"+ mobileNumber;
    }

    if (!isValidNumber( addPlusNewMobile)) {
      setErrorText("Please Enter Valid Mobile Number");
      return;
    }
    console.log("SEnding moble otp...",addPlusNewMobile)
    try {
      await sendMobileOtp(addPlusNewMobile);
      goToStep(+1);
    } catch (error) {
      console.error("otp sending failed", error);
      setErrorText(error);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="login-form">

      <EmailInput
        className="mb-4"
        email={email}
        setEmail={setEmail}
        inputState={INPUT_VALIDATION_STATES.validated}
      />

      <MobileInput
        className="mb-4"
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        inputState={INPUT_VALIDATION_STATES.input}
      />



      <SignupStepFooter submitText={"Generate OTP"} />
    </Form>
  );
};

export default SignupStep3;
