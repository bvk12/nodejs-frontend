import { useContext, useRef } from "react";
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useIonRouter } from "@ionic/react";

import PasswordIcon from "../../assets/password.svg";
import useToast from "../../hooks/useToast";
import { UserAPI } from "../../services/apis/UserAPI";

import EmailInput from "./EmailInput";
import MobileInput from "./MobileInput";
import SignupStepFooter from "./SignupStepFooter";
import { AuthContext } from "../../context/AuthContextProvider";
import { INPUT_VALIDATION_STATES, ToastVariants } from "../../utils/constants";

const SignupStep5 = ({ signupContext }) => {
  const { mobileNumber, email, setErrorText, hanldeSignup } = signupContext;
  const { goToSignIn } = useContext(AuthContext);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const { showToast } = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await UserAPI.registerUser({
        mobile: "+" + mobileNumber,
        email: email,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        password: passwordRef.current.value,
        userName: email,
      });
      const { data } = response;
      console.info("Registerd user...", data);

      if (data.status === "SUCCESS") {
        showToast("Registered user. ", ToastVariants.success);
        //hanldeSignup();

        goToSignIn();
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
      <MobileInput
        className="mb-4"
        mobileNumber={mobileNumber}
        state={INPUT_VALIDATION_STATES.validated}
      />

      <EmailInput
        className="mb-4"
        email={email}
        inputState={INPUT_VALIDATION_STATES.validated}
      />

      <Row>
        <Col md={6}>
          <FormGroup className="form-group-box mb-4" controlId="firstName">
            <FormLabel>First Name*</FormLabel>
            <FormControl
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              required
              minLength="3"
              ref={firstNameRef}
            />
            <div className="form-icon">
              <i className="fa fa-user-o" aria-hidden="true"></i>
            </div>
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup className="form-group-box mb-4" controlId="lastName">
            <FormLabel>Last Name*</FormLabel>
            <FormControl
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              required
              ref={lastNameRef}
            />
            <div className="form-icon">
              <i className="fa fa-user-o" aria-hidden="true"></i>
            </div>
          </FormGroup>
        </Col>
      </Row>

      <FormGroup className="form-group-box mb-4" controlId="password">
        <FormLabel>Password *</FormLabel>
        <FormControl
          ref={passwordRef}
          type="password"
          className="form-control"
          placeholder="Password"
          minLength="8"
          required
        />
        <div className="form-icon">
          <img src={PasswordIcon} className="img-fluid" alt="password-icon" />
        </div>
      </FormGroup>

      <SignupStepFooter submitText={"Sign Up"} />
    </Form>
  );
};

export default SignupStep5;
