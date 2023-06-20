import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

import { INPUT_VALIDATION_STATES } from "../../utils/constants";

const EmailInput = ({
  email,
  setEmail,
  inputState,
  goToBackStep,
  emailRequired = true,
  className,
}) => {
  const renderRightIcon = () => {
    switch (inputState) {
      case INPUT_VALIDATION_STATES.input:
        return (
          <div className="form-icon">
            <i className="fas fa-envelope"></i>
          </div>
        );
      case INPUT_VALIDATION_STATES.verification:
        return (
          <div className="form-icon" onClick={goToBackStep}>
            <i className="fas fa-pencil-alt"></i>
          </div>
        );
      case INPUT_VALIDATION_STATES.validated:
        return (
          <div className="form-icon success">
            <i className="fa fa-check"></i>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <FormGroup
      className={`form-group-box  ${className} ${
        inputState !== INPUT_VALIDATION_STATES.input ? "disabled" : ""
      }`}
      controlId="email"
    >
      <FormLabel>Email *</FormLabel>
      <FormControl
        type="email"
        className="form-control"
        placeholder="Enter Email Here"
        required={emailRequired}
        autofocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={inputState !== INPUT_VALIDATION_STATES.input}
      />

      {renderRightIcon()}
    </FormGroup>
  );
};

export default EmailInput;
