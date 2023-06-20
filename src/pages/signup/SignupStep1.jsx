import { Form } from "react-bootstrap";

import SignupStepFooter from "./SignupStepFooter";
import { INPUT_VALIDATION_STATES } from "../../utils/constants";
import EmailInput from "./EmailInput";

const SignupStep1 = ({ signupContext }) => {
  const {
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    sendMobileOtp,
    goToStep,
    setErrorText,
    sendEmailOtp
  } = signupContext;

  const onSubmit = async (event) => {
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

  

  return (
    <Form onSubmit={onSubmit} className="login-form">

    
<EmailInput
        className="mb-4"
        email={email}
        setEmail={setEmail}
        inputState={INPUT_VALIDATION_STATES.input}
      />
      {/* <MobileInput
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        inputState={INPUT_VALIDATION_STATES.input}
      /> */}

      <SignupStepFooter submitText={"Generate OTP"} />
    </Form>
  );
};

export default SignupStep1;
