import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import { routes } from "../../../utils/constants";
import ProgramDetails from "./ProgramForm/ProgramDetails";
import { useLocation } from "react-router-dom";

import "./AddEditProgram.css";

const AddEditProgram = ({}) => {
  const [currStep, setCurrStep] = useState(0);
  const router = useIonRouter();
  const location = useLocation();

  const program = location.state?.editedProgram;
  const [programData, setProgramData] = useState(program);

  //console.log("EDIT DDDDDDDDDDDDDDDDDDDDD Program",program)

  const renderStep = () => {
    const screenStepMap = {
      0: ProgramDetails,
    };
    const Component = screenStepMap[currStep];
    return <Component program={programData} handleNextStep={handleNextStep} />;
  };

  const handleNextStep = () => {
    router.push(routes.managePrograms);
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xl={8}>
          <Card style={{ marginBottom: "30px" }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h4>
                {program ? "Program Editing Form" : "Program Adding Form"}
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>{renderStep()}</Col>
      </Row>
    </>
  );
};

export default AddEditProgram;
