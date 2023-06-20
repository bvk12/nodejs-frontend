import {
  IonButton,
  IonItem,
  IonList,
  IonInput,
  IonContent,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppleLoginForm } from "./AppleLoginForm";
import { GoogleLoginForm } from "./GoogleLoginForm";
import _ from "lodash";
import {
  Container,
  Row,
  Col,
  Stack,
  FormGroup,
  FormLabel,
  FormControl,
  Form,
  FormCheck,
  Button,
  Modal,
} from "react-bootstrap";

import UserIcon from "../../assets/user.svg";
import PasswordIcon from "../../assets/password.svg";
import { UserAPI } from "../../services/apis/UserAPI";
import { DialogTypes, routes } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContextProvider";

const LoginForm = ({ setShowLogin }) => {
  const router = useIonRouter();
  const {
    user,
    setUser,
    addTodo,
    todos,
    auth,
    setAuth,
    goToSignUp,
    closePopover,
  } = useContext(AuthContext);

  const [loginApiError, setLoginApiError] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    //first check if local user object exists
    if (user && !_.isEmpty(user)) {
      // alert("Seems you are already loogged in.. wanna go whre you left off.");
      // 1) Verify if accees token is valid -
      console.log(auth);

      //then push the user to landing page/ courses.
    }

    // 2) If access token is not valid then

    // 3) Send refresh token to get new access token.

    // 4) if we got new access token then - push to user landign page / courses.

    // 5) if we get refresh token is expired then redirect to login page...

    return () => {};
  }, []);

  const onSubmit = (data) => {
    // handle login
   // console.log("loginForm: onSubmit: ", data);

    UserAPI.login({
      email: data.email,
      password: data.password,
    })
      .then(async (res) => {
       // console.log(res);
        if (res?.data) {
         // console.info("Response after user execution:", res);
          await setUser(res.data.user);
          // console.warn("User ====>", user, res.data.user)
          await setAuth(res.data.auth);
          // console.log("=========================", auth, user)
        }

        router.push(routes.admin, "forward", "push");
      })
      .catch(({ response }) => {
        setLoginApiError(
          response?.data?.message || "Signing In Failed. Please retry"
        );
      });
  };

  function openGoogleLogin() {
   // console.log("clcking google login....");
  //  console.log(window.google);
    /* global google */
    google.accounts.id.prompt();
  }

  return (
    <Modal show={true} onHide={closePopover}>
      <Modal.Header className="p-4" closeButton>
        <h3 className="sub-title m-auto">Sign in to your account.</h3>
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
              <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
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

                <FormGroup className="mb-3 form-group-box" controlId="email">
                  <FormLabel>Email / Username *</FormLabel>

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        type="email"
                        placeholder="Email address"
                        required
                        autofocus
                        {...field}
                        isInvalid={errors && errors["email"]}
                      />
                    )}
                    rules={{
                      required: "Email address should not be empty",
                    }}
                  />

                  <FormControl.Feedback type="invalid">
                    {errors && errors["email"] && errors["email"].message}
                  </FormControl.Feedback>
                </FormGroup>

                <FormGroup className="form-group-box mb-3" controlId="password">
                  <FormLabel>Password *</FormLabel>

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        type="password"
                        placeholder="Password"
                        required
                        {...field}
                        isInvalid={errors && errors["password"]}
                      />
                    )}
                    className="form-icon"
                    rules={{
                      required: "Password field should not be empty",
                      minLength: {
                        value: 8,
                        message: "Min length of password should be 8",
                      },
                    }}
                  />

                  <FormControl.Feedback type="invalid">
                    {errors && errors["password"] && errors["password"].message}
                  </FormControl.Feedback>
                </FormGroup>

                <Stack
                  direction="horizontal"
                  className="justify-content-between py-3 mb-3"
                >
                  <a href={`${routes.home}#${DialogTypes.resetPassword}`}>
                    Forgot Password
                  </a>

                  <Button type="submit" variant="primary">
                    Sign In
                  </Button>
                </Stack>

                <Stack
                  direction="horizontal"
                  className="justify-content-center xs-center mt-2"
                >
                  <div className="f-14" style={{ textAlign: "center" }}>
                    Not a member yet ?{" "}
                    <a
                      href={"javascript:void(0);"}
                      onClick={() => {
                        goToSignUp();
                      }}
                    >
                      <strong>Create Account</strong>
                    </a>
                  </div>
                </Stack>

                <p className="text-danger">{loginApiError}</p>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
