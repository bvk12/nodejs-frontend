import DynamicInput from "../DynamicForms/DynamicInput";
import { useForm } from "react-hook-form";
import { AdminAPI } from "../../services/apis/AdminAPI";
import { DynamicInputForm } from "../DynamicForms/DynamicInputForm";

import {
  IonButton,
  IonContent,
  IonCard,
  IonPage,
  IonCardContent,
  IonItemGroup,
  IonCardTitle,
  IonAlert,
} from "@ionic/react";
import { useState } from "react";
export const SystemSettings2 = ({ defaultValues, dynamicForm }) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange", // I want to change it to onBlur
    defaultValues: defaultValues,
  });
  const [showAlert, setShowAlert] = useState(null);
  //console.log("Default Values:===>", getValues(), dynamicForm);

  const onSubmit = (data) => {
    //console.log(getValues());
    var requestBody = {
      name: "system_settings",
      title: "System Settings",
      data: getValues(),
      metaData: dynamicForm,
    };
    AdminAPI.saveConfigSettings(requestBody).then((response) => {
      setShowAlert("Saved Data Successfully");
      console.log("SAVED DATA SUCCESFULLY", response);
    });
  };

  function getFormData() {
    if (dynamicForm != null) {
      // console.log(
      //   "=============Default Values=================",
      //   defaultValues,
      //   dynamicForm
      // );
      // console.log(Object.keys(dynamicForm?.data).map((fieldName) => {
      // console.log("fieldname",fieldName);
      // return fieldName;
      //// }));

      return Object.keys(dynamicForm).map((fieldName, index) => {
        const { rules, label } = dynamicForm[fieldName];
        // console.log("##########Rules:", rules);
        return (
          <section key={fieldName}>
            <DynamicInput
              control={control}
              index={index}
              label={label}
              rules={rules}
              getValues={getValues}
              name={fieldName}
              setValue={setValue}
              errors={errors}
              register={register}
              contentState={defaultValues ? defaultValues[fieldName] : null}
              {...dynamicForm[fieldName]}
            />
            {/* <span style={{ paddingLeft: "20px" }}>
                {errors[fieldName] && (
                  <span className="error"> * This field is required</span>
                )}
              </span>          */}
          </section>
        );
      });
    } else {
      return <br />;
    }
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <IonPage>
      <IonContent>
        <IonCard ion-margin>
          <IonCardTitle
            style={{
              margin: "1rem 1rem 0rem",
              color: "white",
              padding: "6px",
              backgroundColor: "#282a3c",
            }}
          >
            System Settings
          </IonCardTitle>
          <IonCardContent>
            <IonAlert
              isOpen={showAlert != null}
              onDidDismiss={() => setShowAlert(null)}
              header="Alert"
              subHeader="Success"
              message={showAlert}
              buttons={["OK"]}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
              {/* render the form inputs */}

              <IonItemGroup>
                {dynamicForm != null ? getFormData() : <></>}
              </IonItemGroup>
              <div style={{ textAlign: "center" }}>
                <IonButton shape="round" typeof="sumbit" type="submit">
                  Submit
                </IonButton>
              </div>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export const SystemSettings = () => {
  return (
    <>
      <div>
        <DynamicInputForm formName="system_settings" />
      </div>
    </>
  );
};
