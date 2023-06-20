import { useEffect, useState } from "react";
import { AdminAPI } from "../../services/apis/AdminAPI";
import { GenericDynamicForm } from "./GenericDynamicForm";
import { IonAlert } from "@ionic/react";
import { WebsiteSettings } from "../admin/WebsiteSettings";
import { PaymentSettings } from "../admin/PaymentSettings";
import { SmtpSettings } from "../admin/SmtpSettings";
import { SubscriptionSettings } from "../admin/SubscriptionSettings";
import { IonLoading } from '@ionic/react';
export const DynamicInputForm = ({ formName }) => {
  const [defaultValues, setDefaultValues] = useState(null);
  const [title, setTitle] = useState(null);
  const [dynamicForm, setDynamicForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);



  useEffect(() => {
    if (formName !== 'website_settings' && formName !== 'payment_settings' && formName !== 'smtp_email_settings'
      && formName !== 'subscription_settings') {
      setDynamicForm(null);
      setDefaultValues(null);
      setIsLoading(true);
      setIsError(null);
      try {
        AdminAPI.getConfigSettings({ name: formName })
          .then((response) => {
            setDynamicForm(response.data.metaData);
            setDefaultValues(response.data.data);
            setTitle(response.data.title);
            setIsLoading(false);
            console.log("Reacieved data from AdminApi...");
            setIsError(null);
          })
          .catch((e) => {
            console.log("Error occured while getting data...");
            setIsLoading(false);
            setIsError(e);
          });
      } catch (e) {
        console.log("Error occured while getting data...");
        setIsLoading(false);
        setIsError(e);
      }
    }
  }, [formName]);

  const getForm = () => {
    if (formName) {
      console.log("FORM NAME is:", formName);
      switch (formName) {
        case "website_settings": {
          return <WebsiteSettings />;
        }
        case "payment_settings":
          return <PaymentSettings />;

        case "smtp_email_settings":
          return <SmtpSettings />;

        case "subscription_settings":
          return <SubscriptionSettings />;

        default:
          return (
            <GenericDynamicForm
              defaultValues={defaultValues}
              dynamicForm={dynamicForm}
              sectionName={formName}
              sectionTitle={title}
            ></GenericDynamicForm>
          );
      }
    }
  };

  return (
    <>
      <IonAlert
        isOpen={isError !== null}
        onDidDismiss={() => setIsError(null)}
        header="Alert"
        subHeader={`Error while retrieving data : ${formName}`}
        message={isError?.response?.data?.message}
        buttons={["OK"]}
      />
      {isLoading ? <IonLoading
        cssClass='my-custom-class'
        isOpen={isLoading}
        onDidDismiss={() => setIsLoading(false)}
        message={'Please wait...'}
        duration={5000}
      /> : getForm()}
    </>
  );
};
