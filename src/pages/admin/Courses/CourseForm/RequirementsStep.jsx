import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const RequirementsStep = ({ courseContext, formRef }) => {
  const { courseFormData, updateCourseFormData } = courseContext;
  const { requirements = [""] } = courseFormData;

  if (requirements.length === 0) {
    requirements.push("");
  }

  const updateRequirements = (requirementText, index) => {
    const newRequirements = [...requirements];
    newRequirements[index] = requirementText;
    updateCourseFormData({
      requirements: newRequirements,
    });
  };

  const removeRequirements = (index) => {
    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);
    updateCourseFormData({
      requirements: newRequirements,
    });
  };

  const addRequirements = () => {
    const newRequirements = [...requirements, ""];
    updateCourseFormData({
      requirements: newRequirements,
    });
  };

  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Row className="p-3">
          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formRequirements">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Requirements
              </Form.Label>
              <Col xs={12} md={10}>
                <Row>
                  {requirements.map((requirementText, index) => {
                    return (
                      <Col
                        xs={12}
                        className="d-flex flex-row mb-3"
                        key={`requirements-${index}`}
                      >
                        <Form.Control
                          className="me-3"
                          type="text"
                          value={requirementText}
                          onChange={(e) =>
                            updateRequirements(e.target.value, index)
                          }
                        />

                        {index === 0 ? (
                          <Button
                            variant="success"
                            onClick={() => addRequirements()}
                          >
                            +
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => removeRequirements(index)}
                          >
                            -
                          </Button>
                        )}
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RequirementsStep;
