import { Form } from "react-bootstrap";
import MobileInput from "../signup/MobileInput";
import { INPUT_VALIDATION_STATES } from "../../utils/constants";
import ResetPasswordFooter from "./ResetPasswordFooter";
import EmailInput from "../signup/EmailInput";
import { UserAPI } from "../../services/apis/UserAPI";
import { isValidNumber } from "libphonenumber-js";

const ResetPasswordStep1 = ({ resetPasswordContext }) => {
  const {
    mobileNumber,
    setMobileNumber,
    sendOtp,
    goToStep,
    setErrorText,
    email,
    setEmail,
    userId,
    setUserId,
  } = resetPasswordContext;

  const onSubmit = async (event) => {
    event.preventDefault();
    let addPlusNewMobile = mobileNumber;

    if (!mobileNumber.startsWith("+")) {
      addPlusNewMobile = "+" + mobileNumber;
    }

    console.info("mobile Number", mobileNumber);

    if (!(isValidNumber(addPlusNewMobile) || email)) {
      setErrorText("Please Enter Valid Email/Mobile Number");
      return;
    }

    try {
      const { data: userRespnnseData } = await (email
        ? UserAPI.checkEmail({ email })
        : UserAPI.checkMobile({ mobileNumber: addPlusNewMobile }));

      if (userRespnnseData.status === "SUCCESS") {
        throw "User doesn't exist";
      } else {
        setUserId(userRespnnseData.data.user.id);
      }

      await sendOtp();
      goToStep(+1);
    } catch (error) {
      console.error("otp sending failed", error);
      setErrorText(error);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="login-form">
      {/* <MobileInput
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        inputState={INPUT_VALIDATION_STATES.input}
      />

      <div className="or-block position-relative my-3">
        <span>OR</span>
      </div> */}

      <EmailInput
        className="mb-4"
        email={email}
        setEmail={setEmail}
        inputState={INPUT_VALIDATION_STATES.input}
        emailRequired={false}
      />

      <ResetPasswordFooter submitText={"Generate OTP"} />
    </Form>
  );
};

export default ResetPasswordStep1;
