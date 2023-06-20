//import loading view
import { IonContent, IonPage } from "@ionic/react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CourseCard from "../../components/CourseCard";
import useProgramInfo from "./useProgramInfo";
import useToast from "../../hooks/useToast";
import Icon from "../../components/Icon/Icon";

// Declare the function name and property
import "./Program.css";
import { SubscriptionContext } from "../../context/SubscriptionContextProvider";
import { useContext } from "react";
import { SubscriptionTypes } from "../../utils/constants";
const Program = ({ id, embed }) => {
  // Business logic Hook
  const {
    loading,
    program,
    courses,
    checkoutProgram,
    programBasicPrice,
    programPostOfferPrice,
  } = useProgramInfo(id);

  const { showCourseProgramPricing, hideCourseProgramCart } =
    useContext(SubscriptionContext);

  const renderLoading = () => {
    return new Array(8).fill(0).map((_, index) => (
      <Col md={3} sm={6}>
        <CourseCard key={`loading-${index}`} loading={true} />
      </Col>
    ));
  };

  const renderCourseCards = () => {
    return courses.map((courseInfo) => (
      <Col key={courseInfo.id} md={3} sm={6}>
        <CourseCard {...courseInfo} />
      </Col>
    ));
  };

  const renderProgramPage = () => {
    return (
      <Container className="mt-4">
        <Row>
          <Card className=" mb-3 p-4 program-header-area ">
            <Row className="d-flex justify-content-between align-items-center  bg-primary ">
              <Col md={2}></Col>
              <Col md={6}>
                <div className=" course-bundle-details-header">
                  <p className="title">{program?.title}</p>
                  <p class="w-100 ">
                    Total <b>{courses.length}</b> Courses included
                  </p>
                </div>
              </Col>

              {showCourseProgramPricing(SubscriptionTypes.program, id) && (
                <Col md={4}>
                  <div className="bundle-buy-button">
                    {hideCourseProgramCart(SubscriptionTypes.program, id) ? (
                      <div className="buybtn d-inline">
                        <Icon name="sign-inr"></Icon>
                        {programPostOfferPrice}
                      </div>
                    ) : (
                      <>
                        <a className="buybtn" onClick={checkoutProgram}>
                          <Icon name="sign-inr"></Icon>
                          {programPostOfferPrice} | Buy |{" "}
                          <i className="fa fa-cart-plus" aria-hidden="true"></i>
                        </a>
                        <p className="text-15">Get Life time access </p>
                      </>
                    )}
                  </div>
                </Col>
              )}
            </Row>
          </Card>
        </Row>

        <Row lg={9} className="card-listing-container">
          {loading ? renderLoading() : renderCourseCards()}
        </Row>
      </Container>
    );
  };

  return (
    <>
      {embed ? (
        renderProgramPage()
      ) : (
        <IonPage>
          <IonContent>{renderProgramPage()}</IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Program;
