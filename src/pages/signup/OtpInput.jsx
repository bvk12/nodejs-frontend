import { useEffect, useState } from "react";
import { Button, FormControl, FormGroup, Stack } from "react-bootstrap";

const OtpInput = (props) => {
  const { resendOtp, setOtp } = props;

  // otp state
  const [otpFields, setOtpFields] = useState(new Array(6).fill(""));
  const [otpTimer, setOtpTimer] = useState(60);

  const getOtpTimer = () => {
    let secs = String(otpTimer % 60);
    let mins = String(Math.floor(otpTimer / 60));

    return `${mins.padStart(2, 0)}: ${secs.padStart(2, 0)}`;
  };

  const updateOtpFields = (value, index) => {
    let newOtpFields = [...otpFields];
    newOtpFields[index] = value;
    setOtpFields(newOtpFields);

    setOtp(newOtpFields.join(""));

    // focus on next otp field if user enters input
    if (value) {
      const otpFormFields = document.querySelectorAll(".otp-input-field");
      if (otpFormFields && index + 1 < otpFormFields.length) {
        otpFormFields[index + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    if (otpTimer === 0) return;

    setTimeout(() => {
      setOtpTimer(otpTimer - 1);
    }, 1000);
  }, [otpTimer]);

  return (
    <>
      <Stack
        direction="horizontal"
        className="otp-blocks justify-content-between mb-4 max-width-350 min-width-350"
      >
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <FormGroup className="form-group-box mx-1" key={`otp-field-${index}`}>
            <FormControl
              type="text"
              className="form-control otp-input-field"
              placeholder="-"
              required
              autofocus
              pattern="\d{1}"
              inputMode="numeric"
              maxLength="1"
              onChange={(e) => updateOtpFields(e.target.value, index)}
            />
          </FormGroup>
        ))}
      </Stack>

      <Stack
        direction="horizontal"
        className="justify-content-between xs-center mb-4"
      >
        <span>Dont receive the OTP?</span>
        <div>
          <Button
            variant="link"
            disabled={otpTimer > 0 ? true : false}
            onClick={() => {
              resendOtp();
              setOtpTimer(60);
            }}
          >
            Resend OTP
          </Button>

          <span> {getOtpTimer()}</span>
        </div>
      </Stack>
    </>
  );
};

export default OtpInput;
