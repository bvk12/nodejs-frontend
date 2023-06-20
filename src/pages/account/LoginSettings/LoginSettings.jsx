import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardContent,
  IonNote,
  IonIcon,
  IonList,
  IonRouterOutlet,
  IonCardTitle,
  IonTextarea,
  IonButton,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import { useContext, useRef, useState } from "react";
import {
  Card,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Accordion,
} from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContextProvider";
import EmailAccordion from "./EmailAccordion";

import "./LoginStyles.css";
import MobileAccordion from "./MobileAccordion";
import PasswordAccordion from "./PasswordAccordion";

const LoginSettings = () => {
  const { user, setUser } = useContext(AuthContext);

  console.log(user);

  const setEmail = (email) => {
    setUser({
      ...user,
      email,
    });
  };

  const setMobile = (mobileNo) => {
    setUser({
      ...user,
      mobile: mobileNo,
    });
  };

  return (
    <Card className="border-0 mb-4">
      <Card.Body className="login-settings">
        <Card.Title>Login Settings</Card.Title>
        <Card.Text>
          {/* <Form> */}
          <Accordion className="p-3 custom-accordian">
            <EmailAccordion
              email={user.email}
              setEmail={setEmail}
              userId={user.userId}
            />

            <MobileAccordion
              mobileNumber={user.mobile}
              setMobile={setMobile}
              userId={user.userId}
            />

            <PasswordAccordion mobile={user.mobile} email={user.email} userId={user.userId} />
          </Accordion>
          {/* </Form> */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default LoginSettings;
