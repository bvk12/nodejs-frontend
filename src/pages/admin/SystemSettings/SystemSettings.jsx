import DynamicInput from "../../DynamicForms/DynamicInput";
import { Controller, useForm } from "react-hook-form";
import { AdminAPI } from "../../../services/apis/AdminAPI";
import { ThemeSwitcher } from "../../../components/ThemeSwitcher";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonLabel,
  IonToolbar,
  IonItemGroup,
  IonItemDivider,
  IonNote,
} from "@ionic/react";
export const SystemSettings = ({ defaultValues, dynamicForm }) => {
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

  console.log("Default Values:===>", getValues(), dynamicForm);

  const onSubmit = (data) => {
    //alert("Data is getting submitted," + JSON.stringify(data));
    //console.log("Submitting data", data);

    console.log(getValues());
    var requestBody = {
      name: "System Settings",
      title: "System Settings",
      values: data,
      data: dynamicForm,
    };
    AdminAPI.saveConfigSettings(requestBody).then((response) => {
      console.log("SAVED DATA SUCCESFULLY");
    });
  };

  function getFormData() {
    if (dynamicForm != null) {
      console.log(dynamicForm);
      // console.log(Object.keys(dynamicForm?.data).map((fieldName) => {
      // console.log("fieldname",fieldName);
      // return fieldName;
      //// }));

      return Object.keys(dynamicForm).map((fieldName) => {
        const { rules, label } = dynamicForm[fieldName];
        return (
          <section key={fieldName}>
            <Controller
              name={fieldName}
              control={control}
              rules={rules}
              value={defaultValues ? defaultValues[fieldName] : null}
              render={({ field }) => {
                // console.log("Field rendering:", {...dynamicForm.data[fieldName]},defaultValues[fieldName]);
                return (
                  <DynamicInput
                    onChange={field.onChange}
                    label={label}
                    getValues={getValues}
                    name={fieldName}
                    setValue={setValue}
                    error={errors}
                    register={register}
                    contentState={
                      defaultValues ? defaultValues[fieldName] : null
                    }
                    {...dynamicForm[fieldName]}
                  />
                );
              }}
            />
            <IonNote slot="error">
              <div style={{ paddingLeft: "20px" }}>
                {errors[fieldName] && (
                  <div className="error"> * This field is required</div>
                )}
              </div>
            </IonNote>
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonButtons slot="end">
            <ThemeSwitcher></ThemeSwitcher>
          </IonButtons>
          <IonTitle>System Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
        <div className="wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* render the form inputs */}
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Section A</IonLabel>
              </IonItemDivider>
              {dynamicForm != null ? getFormData() : <></>}
            </IonItemGroup>

            <div style={{ textAlign: "center" }}>
              <IonButton
                shape="round"
                typeof="sumbit"
                type="submit"
                cssClass="e-success"
              >
                Submit
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};
