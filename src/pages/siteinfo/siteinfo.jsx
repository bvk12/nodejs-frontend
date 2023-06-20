import React from "react";
import { useEffect, useState } from "react";
import { AdminAPI } from "../../services/apis/AdminAPI";
import { IonLoading } from "@ionic/react";
import { Block } from "../../components";
import { Link } from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { IonPage, IonContent } from "@ionic/react";

const SiteInfo = (props) => {
  const { match } = props;
  console.log("Match:", match);
  const pageName = match.params.pageName;
  console.log("PageNAme", pageName);
  const [isLoading, setIsLoading] = useState(true);
  const [formName, setFormName] = useState();
  const [formData, setFormData] = useState();

  useEffect(() => {
    if (!formName) return;
    setIsLoading(true);

    try {
      AdminAPI.getPublicConfigSettings({ name: formName })
        .then((response) => {
          // setDynamicForm(response.data.metaData);
          // setDefaultValues(response.data.data);
          //  setTitle(response.data.title);
          setIsLoading(false);
          console.log("Reacieved data for PublicSettings...", response);
          setFormData(response);
          // setIsError(null);
        })
        .catch((e) => {
          console.log("Error occured while getting public config data...", e);
          setIsLoading(false);
          // setIsError(e);
        });
    } catch (e) {
      console.log("Error occured while getting data...");
      setIsLoading(false);
      //setIsError(e);
    }
  }, [formName]);

  useEffect(() => {
    setFormName(getForm(pageName));
    console.log("got the form", pageName);
  }, []);

  const displayForm = () => {
    var displayData = "";
    switch (pageName) {
      case "aboutUs":
        displayData = formData ? formData.data.data.aboutUs : "aboutUs";
        break;
      case "faq":
        displayData = formData ? formData.data.data.faq : "";
        break;
      case "privacyPolicy":
        displayData = formData ? formData.data.data.privacyPolicy : "";
        break;
      case "termsAndConditions":
        displayData = formData ? formData.data.data.termsAndConditions : "";
        break;
      case "refundPolicy":
        displayData = formData ? formData.data.data.refundPolicy : "";
        break;
      default:
        displayData = formData ? formData.data.data.aboutUs : "";
    }

    if (!displayData) {
      displayData = pageName;
    } else {
      displayData = JSON.parse(displayData).html;
    }

    return (
      <>
        <IonPage>
          <IonContent>
            <Block>
              <Card>
                <Card.Body>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: displayData,
                    }}
                  ></div>
                </Card.Body>
              </Card>
            </Block>
          </IonContent>
        </IonPage>
      </>
    );
  };

  const getForm = (pageNm) => {
    switch (pageNm) {
      case "aboutUs" |
        "faq" |
        "privacyPolicy" |
        "refundPolicy" |
        "termsAndConditions":
        return "basic_settings";
      default:
        return "basic_settings";
    }
  };

  return (
    <>
      {isLoading ? (
        <IonLoading
          cssClass="my-custom-class"
          isOpen={isLoading}
          onDidDismiss={() => setIsLoading(false)}
          message={"Please wait..."}
          duration={5000}
        />
      ) : (
        displayForm()
      )}
    </>
  );
};

export default SiteInfo;
