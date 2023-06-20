import { useState } from "react";
import {
  Card,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Accordion,
  useAccordionButton,
  Stack,
} from "react-bootstrap";
import useToast from "../../../hooks/useToast";
import { AccountAPI } from "../../../services/apis/AccountAPI";
import { UserAPI } from "../../../services/apis/UserAPI";
import {
  INPUT_VALIDATION_STATES,
  ToastVariants,
} from "../../../utils/constants";
import EmailInput from "../../signup/EmailInput";
import OtpInput from "../../signup/OtpInput";


import "@fortawesome/fontawesome-free/css/all.min.css";

const EmailAccordion = ({ email, setEmail, userId }) => {
  const [showGenerateOtp, setShowGenerateOtp] = useState(true);

  const { showToast } = useToast();

  const [newEmail, setNewEmail] = useState(email);
  const [errorText, setErrorText] = useState();

  const [otpNumber, setOtpNumber] = useState("");

  const decoratedOnClick = useAccordionButton("email");

  const sendEmailOtp = async () => {
    try {
      if(email !== newEmail){
        console.log("email,newEmail",email,newEmail)
        const isEmailRegistered = await UserAPI.checkEmail({ email:newEmail });
        console.info("IS Email registered..", isEmailRegistered);
        if (isEmailRegistered?.data.status === "ERROR") {
          showToast(isEmailRegistered.data?.message, ToastVariants.error);
          //throw "isEmailRegistered.data?.message;"
          return false;
        }else{
          const response = await UserAPI.sendEmailOtp({ email: newEmail });
          showToast(
            "OTP Sent Successfully, Please Check your email ",
            ToastVariants.success
          );
          console.info("sent otp email..", response, email);
          return true;
        }
      }  
      else{
        showToast("You havent changed to new Email. Change it to genearate OTP", ToastVariants.error);
      }    
    } catch (error) {
      showToast("Sending OTP failed, Please try again ", ToastVariants.error);
      const { response } = error;
      throw response.data.message;
    }
  };

  const generateOtp = async () => {
    try {
      setErrorText();
      var result = await sendEmailOtp(email);
      if(result)
        setShowGenerateOtp(false);
    } catch (error) {
      console.error("otp sending failed", error);
      setErrorText(error);
    }
  };

  const verifyOtp = async () => {
    try {
      setErrorText();
      const response = await UserAPI.verifyOtpEmail({
        userOtp: otpNumber,
        email: newEmail,
      });
      const { data } = response;
      console.info("successfully otp email..", data);

      if (data.status !== "SUCCESS") {
        setErrorText(data.message);
        return;
      }

      const { data: emailResponseData } = await AccountAPI.updateUserAccount(
        userId,
        {
          email: newEmail,
        }
      );

      if (emailResponseData.status === "SUCCESS") {
        decoratedOnClick();
        setEmail(newEmail);

        setShowGenerateOtp(true);
        setOtpNumber("");
      } else {
        setErrorText(data.message);
      }
    } catch (error) {
      const { response } = error;
      setErrorText(response.data.message);
    }
  };

  const renderGenerateOtp = () => {
    return (
      <div className="p-3">
        <EmailInput
          className="mb-4"
          inputState={INPUT_VALIDATION_STATES.input}
          email={newEmail}
          setEmail={setNewEmail}
        />

        <Stack direction="horizontal" className="justify-content-between">
          <Button
            variant="primary"
            className="ms-3 btn border-radius"
            onClick={generateOtp}
          >
            Generate OTP
          </Button>
          <Button
            variant="outline-danger"
            className="ms-3 btn border-radius"
            onClick={decoratedOnClick}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    );
  };

  const renderVerifyOtp = () => {
    return (
      <>
        <div className="px-3 max-width-350">
          <EmailInput
            inputState={INPUT_VALIDATION_STATES.verification}
            email={newEmail}
            setEmail={setNewEmail}
            goToBackStep={() => {
              setShowGenerateOtp(true);
            }}
          />
        </div>

        <div className="p-3 ">
          <OtpInput
            setOtp={setOtpNumber}
            resendOtp={async () => {
              try {
                setErrorText("");
                await sendEmailOtp(email);
              } catch (error) {
                console.error("resending otp failed", error);
              }
            }}
          />
        </div>

        <Stack direction="horizontal" className="justify-content-between">
          <Button
            variant="primary"
            className="ms-3 btn border-radius"
            onClick={verifyOtp}
          >
            Verify OTP
          </Button>
          <Button
            variant="outline-danger"
            className="ms-3 btn border-radius"
            onClick={decoratedOnClick}
          >
            Cancel
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <Accordion.Item eventKey="email">
      <Accordion.Header>
        <div className="accordian-title">Update Email</div>
        <div className="accordian-title-form">
          <EmailInput
            className="disable"
            inputState={INPUT_VALIDATION_STATES.validated}
            email={email}
          />
          <Button variant="primary" className="ms-3 border-radius">
            <i className="fas fa-pencil-alt" aria-hidden="true"></i>
          </Button>
        </div>
      </Accordion.Header>

      <Accordion.Body>
        {showGenerateOtp ? renderGenerateOtp() : renderVerifyOtp()}
        <p className="text-danger mt-4">{errorText}</p>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default EmailAccordion;
