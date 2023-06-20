import { useState } from "react";
import { IonButton, IonIcon, IonInput, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import { checkmarkCircle } from "ionicons/icons";

import "./InputOtpField.css";

const InputOtpField = (props) => {
  const {
    name,
    control,
    label,
    error,
    rules,
    style,
    setInputValue,
    component,
    inputProps,
    setVerifyOtpStatus,
  } = props;

  const [inputState, setInputState] = useState({
    otpValue: "",
    showOtp: true,
    showOtpError: "",
  });

  // console.log(inputState)

  const verifyOtp = (event) => {
    console.log("updating otp");
    setVerifyOtpStatus();
    setInputState((previnfo) => ({
      ...previnfo,
      showOtp: false,
    }));
  };

  const sendOtp = (event) => {
    console.log("updating otp");
    // // // send otp to backend
    setInputState((previnfo) => ({
      ...previnfo,
      showOtp: false,
    }));
  };

  return (
    <div style={style}>
      <div style={{ display: "flex", flexGrow: "1" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
            fontSize: "12px",
            width: "100%",
          }}
        >
          {component ? (
            component
          ) : (
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <IonInput
                  className="custom-input"
                  type={inputProps.type}
                  placeholder={inputProps.placeholder}
                  {...field}
                  onIonChange={(event) => {
                    let inputValue = event.target.value;
                    setInputValue(inputValue);
                    field.onChange(inputValue);
                  }}
                />
              )}
              rules={{
                ...rules,
                validate: () => !inputState.showOtp,
              }}
            />
          )}
          {inputState.showOtp ? (
            <IonButton
              onClick={sendOtp}
              style={{ marginLeft: "14px" }}
              size="small"
            >
              {" "}
              Send Otp{" "}
            </IonButton>
          ) : (
            <IonIcon
              className="green-icon"
              size="large"
              icon={checkmarkCircle}
            />
          )}
        </div>

        {inputState.showOtp && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0px 8px 8px",
              fontSize: "12px",
              width: "70%",
            }}
          >
            <IonInput
              className="custom-input"
              fontSize="10px"
              type="number"
              style={{ marginRight: "10px" }}
              placeholder="Enter Otp"
              onIonChange={(event) =>
                setInputState((prevInfo) => ({
                  ...prevInfo,
                  otpValue: event.target.value,
                }))
              }
            />
            <IonButton
              type="button"
              size="small"
              onClick={verifyOtp}
              color="light"
            >
              {" "}
              Verify Otp{" "}
            </IonButton>
          </div>
        )}
      </div>

      {error && (
        <IonText color="danger" style={{ marginTop: "8px" }}>
          {error.message ||
            (error.type === "validate" && `Please Verify ${label}`)}
        </IonText>
      )}

      {inputState.showOtpError && (
        <IonText color="danger">{inputState.showOtpError}</IonText>
      )}
    </div>
  );
};

export default InputOtpField;
