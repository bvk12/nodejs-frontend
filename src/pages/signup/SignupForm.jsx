import { IonContent, IonPage } from "@ionic/react";
import { Container, Row, Col, Stack, Modal } from "react-bootstrap";
import { AppleLoginForm } from "../login/AppleLoginForm";
import { GoogleLoginForm } from "../login/GoogleLoginForm";
import LoginBackground from "../../assets/login-bg1.png";
import useSignup from "../../hooks/useSignup";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import SignupStep4 from "./SignupStep4";
import SignupStep5 from "./SignupStep5";

import "./SignupForm.css";
import { useHistory, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

const SignupForm = () => {
  const signupContext = useSignup();
  const { stepNo, errorText } = signupContext;

  const { closePopover } = useContext(AuthContext);

  const renderSignupStep = () => {
    const screenStepMap = {
      1: SignupStep1,
      2: SignupStep2,
      3: SignupStep3,
      4: SignupStep4,
      5: SignupStep5,
    };

    const Component = screenStepMap[stepNo];

    return <Component signupContext={signupContext} />;
  };

  function openGoogleLogin() {
    console.log("clcking google login....");
    console.log(window.google);
    /* global google */
    google.accounts.id.prompt();
  }

  return (
    <Modal show={true} onHide={closePopover}>
      <Modal.Header className="p-4" closeButton>
        <h3 className="sub-title m-auto">Register With Us</h3>
      </Modal.Header>
      <Modal.Body className="py-40">
        <Container fluid>
          <Row className="main-sigin-block">
            {/* <Col md={6} className="border-right-1 d-flex align-items-center">
              <img
                src={LoginBackground}
                className="img-fluid"
                alt="Login Background"
              />
            </Col> */}

            <Col md={12} className="px-md-5 d-flex align-items-center">
              <div className="login-form">
                <Stack direction="horizontal" className="social-icons">
                  <a href="#" target="_self" onclick={openGoogleLogin}>
                    <div id="signInDiv">G</div>
                  </a>
                  <GoogleLoginForm></GoogleLoginForm>
                  <AppleLoginForm></AppleLoginForm>
                </Stack>

                <div className="or-block position-relative mb-3">
                  <span>OR</span>
                </div>

                {renderSignupStep()}
                <p className="text-danger mt-4">{errorText}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default SignupForm;
