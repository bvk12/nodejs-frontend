import { FormGroup } from "react-bootstrap";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { INPUT_VALIDATION_STATES } from "../../utils/constants";

const MobileInput = ({
  mobileNumber,
  setMobileNumber,
  inputState,
  goToBackStep,
  className,
}) => {
  const renderRightIcon = () => {
    switch (inputState) {
      case INPUT_VALIDATION_STATES.input:
        return (
          <div className="form-icon">
            <i className="fa fa-mobile"></i>
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
      className={`form-group-box d-flex ${className} ${
        inputState !== INPUT_VALIDATION_STATES.input ? "disabled" : ""
      }`}
    >
      <div className="pe-3">
        <PhoneInput2
          placeholder="Mobile No"
          country="in"
          enableSearch
          countryCodeEditable={false}
          value={mobileNumber}
          onChange={(mobileNumber) => {
            setMobileNumber(mobileNumber);
          }}
          disabled={inputState !== INPUT_VALIDATION_STATES.input}
        />
      </div>

      {renderRightIcon()}
    </FormGroup>
  );
};

export default MobileInput;
