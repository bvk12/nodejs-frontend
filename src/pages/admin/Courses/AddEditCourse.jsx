import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { Button, Card, Col, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { courseFormTypes, routes } from "../../../utils/constants";
import CourseDetails from "./CourseForm/CourseDetails";
import CurriculumStep from "./CourseForm/CurriculumStep";

import "./AddEditCourse.css";

const AddEditCourse = ({}) => {
  const [currStep, setCurrStep] = useState(0);
  const router = useIonRouter();
  const location = useLocation();

  const course = location.state?.editedCourse;
  const [courseData, setCoursesData] = useState(course);

  const renderStep = () => {
    const screenStepMap = {
      0: CourseDetails,
      1: CurriculumStep,
    };

    const Component = screenStepMap[currStep];

    return <Component course={courseData} handleNextStep={handleNextStep} />;
  };

  const handleNextStep = (course) => {
    if (currStep === 0) {
      setCurrStep(1);
      // courseId comes after creating the course
      setCoursesData({
        ...courseData,
        ...course,
      });
    } else {
      router.push(routes.manageCourses);
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xl={8}>
          <Card style={{ marginBottom: "30px" }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h4>{course ? "Course Editing Form" : "Course Adding Form"}</h4>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={8}>{renderStep()}</Col>
      </Row>
    </>
  );
};

export default AddEditCourse;
