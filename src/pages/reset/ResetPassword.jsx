import { IonContent, IonPage } from "@ionic/react";
import { Container, Row, Col, Stack, Modal } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";

import LoginBackground from "../../assets/login-bg1.png";
import useResetPassword from "../../hooks/useResetPassword";
import ResetPasswordStep1 from "./ResetPasswordStep1";
import ResetPasswordStep2 from "./ResetPasswordStep2";
import ResetPasswordStep3 from "./ResetPasswordStep3";

const ResetPasswordForm = () => {
  const resetPasswordContext = useResetPassword();
  const history = useHistory();
  const { pathname, search } = useLocation();

  const { stepNo, errorText } = resetPasswordContext;

  const renderResetPasswordStep = () => {
    const screenStepMap = {
      1: ResetPasswordStep1,
      2: ResetPasswordStep2,
      3: ResetPasswordStep3,
    };

    const Component = screenStepMap[stepNo];

    return <Component resetPasswordContext={resetPasswordContext} />;
  };

  const closePopover = () => {
    history.replace({
      pathname,
      search,
    });
  };

  return (
    <Modal show={true} onHide={closePopover}>
      <Modal.Header className="p-4" closeButton>
        <h3 className="sub-title m-auto">Reset Your Password</h3>
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
                {/* <h3 className="main-title">Reset Your Password</h3> */}

                {renderResetPasswordStep()}
                <p className="text-danger mt-4">{errorText}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPasswordForm;
