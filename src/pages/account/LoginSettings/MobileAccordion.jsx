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
import MobileInput from "../../signup/MobileInput";
import OtpInput from "../../signup/OtpInput";
import { isValidNumber } from "libphonenumber-js";

import "@fortawesome/fontawesome-free/css/all.min.css";

const MobileAccordion = ({ mobileNumber, setMobile, userId }) => {
  const [showGenerateOtp, setShowGenerateOtp] = useState(true);

  const { showToast } = useToast();

  const [newMobile, setNewMobile] = useState(mobileNumber);
  const [errorText, setErrorText] = useState();

  const [otpNumber, setOtpNumber] = useState("");

  const decoratedOnClick = useAccordionButton("mobile");

  const sendMobileOtp = async () => {
    try {
      console.log("MobileOld, New Mobilenumber",newMobile,mobileNumber);
      let addPlusNewMobile = newMobile
      
       if(!newMobile.startsWith("+")){
        addPlusNewMobile = "+"+ newMobile;
       }
       
      if(mobileNumber === addPlusNewMobile){
        showToast("You havent changed the Mobile Number. Change it to generate OTP", ToastVariants.error);
        return false;
      }
      console.log("new mobilenumber starts",addPlusNewMobile.startsWith("+"));

      if (!isValidNumber(addPlusNewMobile)) {
        //console.log("mobilenumber",newMobile);
        setErrorText("Please Enter Valid Mobile Number");
        showToast(
          "Invalid Mobile Number entered, Please check your input ",
          ToastVariants.error
        );
        return false;
      } else {

        const reponse = await UserAPI.sendMobileOtp({
          mobile:  addPlusNewMobile,
        });
        showToast(
          "OTP Sent Successfully, Please check your mobile ",
          ToastVariants.success
        );
        console.info("sent otp mobile..", reponse, addPlusNewMobile);
        return true;
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
      let success = await sendMobileOtp();
      if (success) setShowGenerateOtp(false);
    } catch (error) {
      console.error("otp sending failed", error);

      setErrorText(error);
    }
  };

  const verifyOtp = async () => {
    try {
      setErrorText();
    //  console.log("MobileOld, New Mobilenumber",newMobile);
      let addPlusNewMobile = newMobile
      
       if(!newMobile.startsWith("+")){
        addPlusNewMobile = "+"+ newMobile;
       }
      const response = await UserAPI.verifyOtpMobile({
        userOtp: otpNumber,
        mobile:  addPlusNewMobile,
      });
      const { data } = response;
      console.info("successfully otp mobile..", data);

      if (data.status !== "SUCCESS") {
        setErrorText(data.message);
        return;
      }

      const { data: mobileResponseData } = await AccountAPI.updateUserAccount(
        userId,
        {
          mobile: addPlusNewMobile,
        }
      );

      if (mobileResponseData.status === "SUCCESS") {
        setShowGenerateOtp(true);
        setOtpNumber("");

        decoratedOnClick();
        setMobile(addPlusNewMobile);
      } else {
        setErrorText(data.message);
      }
    } catch (error) {
      const { response } = error;
      setErrorText(response.data.message);
    }finally{
      window.location.reload(false);
    }
  };

  const renderGenerateOtp = () => {
    return (
      <div className="p-3 ">
        <MobileInput
          className="mb-4"
          mobileNumber={newMobile}
          setMobileNumber={setNewMobile}
          inputState={INPUT_VALIDATION_STATES.input}
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
          <MobileInput
            mobileNumber={newMobile}
            setMobileNumber={setNewMobile}
            inputState={INPUT_VALIDATION_STATES.verification}
            goToBackStep={() => {
              setShowGenerateOtp(true);
            }}
          />
        </div>

        <div className="p-3">
          <OtpInput
            setOtp={setOtpNumber}
            resendOtp={async () => {
              try {
                setErrorText("");
                await sendMobileOtp();
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
    <Accordion.Item eventKey="mobile">
      <Accordion.Header>
        <div className="accordian-title">Update Mobile</div>
        <div className="accordian-title-form">
          <MobileInput
            className="disable"
            mobileNumber={mobileNumber}
            inputState={INPUT_VALIDATION_STATES.validated}
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

export default MobileAccordion;
