import { Row, Col, Card } from "react-bootstrap";
import { IonContent, IonPage } from "@ionic/react";

import program1 from "../../assets/images/card-img.png";
import "./payment.css";

const PaymentSuccess = () => {
  return (
    <IonPage>
      <IonContent>
        <Row className="h-100 align-items-center">
          <Col md={4}></Col>
          <Col md={4}>
            <Card className="course-card">
              <Card.Body>
                <Card.Img className="card-image" variant="top" src={program1} />
                <Card.Title>Your Payment is Sucessfully completed.</Card.Title>
                <Card.Text>
                  You have sucessfully subscribed to course(s), Please check
                  your email for further details.
                </Card.Text>
                <Row className="text-center">
                  {" "}
                  <Col md={12}>
                    <button md={12} class="homebtn">
                      <a md={12} href="/home">
                        Go to Home
                      </a>
                    </button>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="bg-transparent d-flex justify-content-between">
                <Card.Text>
                  We appreciate your business! If you have any questions, please
                  email
                  <a href="mailto:orders@vptech.com">
                    {" "}
                    &nbsp; orders@vptech.com
                  </a>
                  .
                </Card.Text>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </IonContent>
    </IonPage>
  );
};

export default PaymentSuccess;
