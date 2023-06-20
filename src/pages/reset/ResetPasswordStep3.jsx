import { useIonRouter } from "@ionic/react";
import { useContext, useRef } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContextProvider";

import useToast from "../../hooks/useToast";
import { UserAPI } from "../../services/apis/UserAPI";
import { ToastVariants } from "../../utils/constants";
import ResetPasswordFooter from "./ResetPasswordFooter";

const ResetPasswordStep3 = ({ resetPasswordContext }) => {
  const { setErrorText, userId } = resetPasswordContext;
  const { showToast } = useToast();

  const { goToSignIn } = useContext(AuthContext);

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    // also show error if both pass and confirm are not same.
    let newPassword = newPasswordRef.current.value;
    let confirmPAssword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPAssword) {
      setErrorText(
        "new password and confirm password didnt match, please check again"
      );
      return;
    }

    try {
      const { data: resetPaswordResponse } = await UserAPI.resetPassword({
        password: newPassword,
        userId,
      });

      if (resetPaswordResponse.status !== "SUCCESS") {
        throw resetPaswordResponse.message;
      }

      showToast(
        "Successfully Updated Password, Please login",
        ToastVariants.success
      );

      goToSignIn();
    } catch (error) {
      console.error("ResetPasswordStep3: onSubmit: error: ", error);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="login-form">
      <FormGroup className="form-group mb-4" controlId="password">
        <FormLabel>New Password *</FormLabel>
        <FormControl
          ref={newPasswordRef}
          type="password"
          placeholder="Enter New Password"
          minLength="8"
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
          required
        />
        <div className="icon">
          <i className="fa fa-lock"></i>
        </div>
      </FormGroup>

      <ResetPasswordFooter submitText={"Save"} />
    </Form>
  );
};

export default ResetPasswordStep3;
