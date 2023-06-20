import { Form } from "react-bootstrap";
import MobileInput from "../signup/MobileInput";
import { INPUT_VALIDATION_STATES } from "../../utils/constants";
import ResetPasswordFooter from "./ResetPasswordFooter";
import EmailInput from "../signup/EmailInput";
import OtpInput from "../signup/OtpInput";
import { useState } from "react";
import { UserAPI } from "../../services/apis/UserAPI";

const ResetPasswordStep2 = ({ resetPasswordContext }) => {
  const { mobileNumber, sendOtp, goToStep, setErrorText, email } =
    resetPasswordContext;

  const [otpNumber, setOtpNumber] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const reponse = email
        ? await UserAPI.verifyOtpEmail({
            userOtp: otpNumber,
            email,
          })
        : await UserAPI.verifyOtpMobile({
            userOtp: otpNumber,
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
      {email ? (
        <EmailInput
          className="mb-4"
          email={email}
          inputState={INPUT_VALIDATION_STATES.verification}
          goToBackStep={() => goToStep(-1)}
        />
      ) : (
        <MobileInput
          className="mb-4"
          mobileNumber={mobileNumber}
          inputState={INPUT_VALIDATION_STATES.verification}
          goToBackStep={() => goToStep(-1)}
        />
      )}

      <OtpInput
        setOtp={setOtpNumber}
        resendOtp={async () => {
          try {
            await sendOtp();
          } catch (error) {
            console.error("resending otp failed", error);
          }
        }}
      />

      <ResetPasswordFooter submitText={"Verify OTP"} />
    </Form>
  );
};

export default ResetPasswordStep2;
