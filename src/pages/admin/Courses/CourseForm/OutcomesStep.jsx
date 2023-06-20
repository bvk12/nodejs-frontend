import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const OutcomesStep = ({ courseContext, formRef }) => {
  const { courseFormData, updateCourseFormData } = courseContext;
  const { outcomes = [""] } = courseFormData;

  if (outcomes.length === 0) {
    outcomes.push("");
  }

  const updateOutcomes = (outcomeText, index) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = outcomeText;
    updateCourseFormData({
      outcomes: newOutcomes,
    });
  };

  const removeOutcomes = (index) => {
    const newOutcomes = [...outcomes];
    newOutcomes.splice(index, 1);
    updateCourseFormData({
      outcomes: newOutcomes,
    });
  };

  const addOutcomes = () => {
    const newOutcomes = [...outcomes, ""];
    updateCourseFormData({
      outcomes: newOutcomes,
    });
  };

  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Row className="p-3">
          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formOutcomes">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Outcomes
              </Form.Label>
              <Col xs={12} md={10}>
                <Row>
                  {outcomes.map((outcomesText, index) => {
                    return (
                      <Col
                        xs={12}
                        className="d-flex flex-row mb-3"
                        key={`outcomes-${index}`}
                      >
                        <Form.Control
                          type="text"
                          className="me-3"
                          value={outcomesText}
                          onChange={(e) =>
                            updateOutcomes(e.target.value, index)
                          }
                        />

                        {index === 0 ? (
                          <Button
                            variant="success"
                            onClick={() => addOutcomes()}
                          >
                            +
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => removeOutcomes(index)}
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

export default OutcomesStep;
