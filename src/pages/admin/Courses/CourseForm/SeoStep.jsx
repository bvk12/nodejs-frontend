import { useState } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

const SeoStep = ({ courseContext, formRef }) => {
  const { courseFormData, updateCourseFormData } = courseContext;
  const {
    metaKeywords = [],
    metaDescription,
    dummyEnrolCount,
  } = courseFormData;

  const components = {
    DropdownIndicator: null,
  };

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        updateCourseFormData({
          metaKeywords: [...metaKeywords, inputValue],
        });
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Row className="p-3">
          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formMetaKeywords">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Meta keywords
              </Form.Label>
              <Col xs={12} md={10}>
                <CreatableSelect
                  className="text-start"
                  components={components}
                  value={metaKeywords.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  inputValue={inputValue}
                  isClearable
                  isMulti
                  menuIsOpen={false}
                  onChange={(newValue) => {
                    updateCourseFormData({
                      metaKeywords: newValue.map((option) => option.value),
                    });
                  }}
                  onInputChange={(newValue) => setInputValue(newValue)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a keyword and then press enter button"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formMetaDescription"
            >
              <Form.Label column xs={12} md={2} className="text-md-end">
                Meta description
              </Form.Label>
              <Col xs={12} md={10}>
                <Form.Control
                  type="textarea"
                  name="metaDescription"
                  value={metaDescription}
                  onChange={(e) =>
                    updateCourseFormData({
                      metaDescription: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formDummyEnrolCount"
            >
              <Form.Label column xs={12} md={2} className="text-md-end">
                Dummy Enrol Count
              </Form.Label>
              <Col xs={12} md={10}>
                <Form.Control
                  type="number"
                  value={dummyEnrolCount}
                  onChange={(e) =>
                    updateCourseFormData({
                      dummyEnrolCount: Number(e.target.value),
                    })
                  }
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SeoStep;
