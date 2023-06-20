import { useRef, useState } from "react";
import {
  Accordion,
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  useAccordionButton,
} from "react-bootstrap";
import useToast from "../../../hooks/useToast";
import { AccountAPI } from "../../../services/apis/AccountAPI";
import { UserAPI } from "../../../services/apis/UserAPI";
import {
  INPUT_VALIDATION_STATES,
  ToastVariants,
} from "../../../utils/constants";
import EmailInput from "../../signup/EmailInput";
import MobileInput from "../../signup/MobileInput";
import OtpInput from "../../signup/OtpInput";
import { isValidNumber } from "libphonenumber-js";

import "@fortawesome/fontawesome-free/css/all.min.css";

const PasswordAccordion = ({ userId, ...props }) => {
  const passwordError =
    "Password Rules: Should be containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
  const { showToast } = useToast();

  const [stepNo, setStepNo] = useState(0);
  const [mobileNumber, setMobileNumber] = useState(props.mobile);
  const [email, setEmail] = useState(props.email);
  const [errorText, setErrorText] = useState("");
  const [otpNumber, setOtpNumber] = useState("");
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [sendOtpMode, setSendOtpMode] = useState("email");

  const decoratedOnClick = useAccordionButton("password");

  const goToStep = (stepCount) => {
    setErrorText("");
    setStepNo(stepNo + stepCount);
  };

  const sendOtp = async () => {
    try {
      const reponse =
        sendOtpMode === "email"
          ? await UserAPI.sendEmailOtp({ email })
          : await UserAPI.sendMobileOtp({
              mobile: mobileNumber,
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

  const handleOtpGeneration = async (event) => {
    event.preventDefault();
    console.info("mobile Number", mobileNumber);

    if (!(isValidNumber("+" + mobileNumber) || email)) {
      setErrorText("Please Enter Valid Email/Mobile Number");
      showToast(
        "Invalid Email/Mobile entered, Please try again ",
        ToastVariants.error
      );

      return;
    }

    try {
      await sendOtp();
      goToStep(+1);
    } catch (error) {
      console.error("otp sending failed", error);
      setErrorText(error);
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();

    try {
      const reponse =
        sendOtpMode === "email"
          ? await UserAPI.verifyOtpEmail({
              userOtp: otpNumber,
              email,
            })
          : await UserAPI.verifyOtpMobile({
              userOtp: otpNumber,
              mobile: mobileNumber,
            });

      const { data } = reponse;
      console.info("otp mobile..", data, mobileNumber);

      if (data.status === "SUCCESS") {
        showToast("OTP Verified Successfully ", ToastVariants.success);
        goToStep(+1);
      } else {
        setErrorText(data.message);
      }
    } catch (error) {
      const { response } = error;
      setErrorText(response.data.message);
    }
  };

  const CheckPassword = (pwd) => {
    //Input Password and Submit [8 to 12 characters which contain at least one lowercase letter,
    // one uppercase letter, one numeric digit, and one special character]
    var passw =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,12}$/;
    if (pwd.match(passw)) {
      //alert('Correct, try another...')
      return true;
    } else {
      // alert('Wrong...!')
      showToast(passwordError, ToastVariants.error);
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    // also show error if both pass and confirm are not same.
    let newPassword = newPasswordRef.current.value;
    let confirmPAssword = confirmPasswordRef.current.value;
    console.log("New password", newPassword, newPassword.length);
    let pwdValid = false;
    if (newPassword !== confirmPAssword) {
      setErrorText(
        "New password and confirm password didnt match, Please check again"
      );
      return;
    } else if (newPassword.length < 8 || newPassword.length > 12) {
      setErrorText(
        "New password length should be between 8 and 12, Please check again"
      );
      return;
    } else {
      let result = CheckPassword(newPassword);
      if (!result) {
        return;
      }
    }

    try {
      const { data: passwordResponseData } = await AccountAPI.updateUserAccount(
        userId,
        {
          password: newPassword,
        }
      );

      if (passwordResponseData.status === "SUCCESS") {
        showToast("Password Updated Successfully. ", ToastVariants.success);
        decoratedOnClick();
        setStepNo(0);
      } else {
        setErrorText(passwordResponseData.message);
      }
    } catch (error) {
      console.error("ResetPasswordStep3: onSubmit: error: ", error);
    }
  };

  return (
    <Accordion.Item eventKey="password">
      <Accordion.Header>
        <div className="accordian-title">Change Password</div>
        <div className="accordian-title-form">
          <Form.Group
            className="form-group-box disable"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="form-control"
              type="password"
              value="**********************"
              disabled={true}
            />
            <div className="form-icon">
              <i className="fa fa-lock"></i>
            </div>
          </Form.Group>

          <Button variant="primary" className="ms-3 border-radius">
            <i className="fas fa-pencil-alt" aria-hidden="true"></i>
          </Button>
        </div>
      </Accordion.Header>

      <Accordion.Body>
        {stepNo === 0 && (
          <div className="p-3 d-flex align-items-center">
            <Form onSubmit={handleOtpGeneration}>
              <div style={{ marginBottom: "4px" }}>
                <Form.Check
                  inline
                  label="Mobile"
                  name="group1"
                  type="radio"
                  checked={sendOtpMode == "mobile"}
                  onChange={() => setSendOtpMode("mobile")}
                />
                <Form.Check
                  inline
                  label="Email"
                  name="group1"
                  type="radio"
                  onChange={() => setSendOtpMode("email")}
                  checked={sendOtpMode == "email"}
                />
              </div>
              <div>
                <MobileInput
                  mobileNumber={mobileNumber}
                  setMobileNumber={setMobileNumber}
                  inputState={INPUT_VALIDATION_STATES.verification}
                />
              </div>
              {/* <div className="or-block position-relative my-3">
                <span>OR</span>
              </div> */}

              <EmailInput
                className="mb-4"
                email={email}
                setEmail={setEmail}
                inputState={INPUT_VALIDATION_STATES.verification}
                emailRequired={false}
              />

              <Button type="submit" variant="primary">
                Generate OTP
              </Button>
            </Form>
          </div>
        )}

        {stepNo === 1 && (
          <Form className="p-2" onSubmit={handleOtpVerification}>
            {sendOtpMode === "email" ? (
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

            <Button type="submit" variant="primary">
              Verify OTP
            </Button>
          </Form>
        )}

        {stepNo === 2 && (
          <Form className="p-3" onSubmit={onSubmit}>
            <FormGroup className="form-group mb-4" controlId="password">
              <FormLabel>New Password *</FormLabel>
              <FormControl
                ref={newPasswordRef}
                type="password"
                placeholder="Enter New Password"
                minLength="8"
                maxLength="12"
                required
              />
              <div className="icon">
                <i className="fa fa-lock"></i>
              </div>
            </FormGroup>
            <FormGroup className="form-group mb-4" controlId="confirm-password">
              <FormLabel>Confirm Password *</FormLabel>
              <FormControl
                ref={confirmPasswordRef}
                type="password"
                placeholder="Enter Confirm Password"
                minLength="8"
                maxLength="12"
                required
              />
              <div className="icon">
                <i className="fa fa-lock"></i>
              </div>
            </FormGroup>
            <Button type="submit" variant="primary">
              Save
            </Button>
            <p className="text-danger mt-4">{errorText}</p>
          </Form>
        )}

        <p className="text-danger mt-4">{errorText}</p>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PasswordAccordion;
