import { Form, Row, Col, Container, Card } from "react-bootstrap";
import WYSIWYGEditor from "../../../../components/WYSIWYGEditor";
import Select from "react-select";

const BasicDetailsStep = ({ courseContext }) => {
  const {
    courseFormData,
    updateCourseFormData,
    getCategoryOptions,
    getDifficultyLevelOptions,
    getSkillOptions,
    getContentSpecialityOptions,
    getReviewStatusOptions,
    isCourseCreated,
    getCategoryTitle,
    getDifficultyLevelTitle,
    getSkillLevelTitle,
    getContentSpecialityTitle,
    getReviewStatusLabel,
  } = courseContext;

  const {
    title,
    shortDescription,
    description,
    category,
    levelTag,
    language,
    skillTags = [],
    contentSpecialityTags = [],
    reviewStatus,
    isActive = true,
    isProgram = false,
  } = courseFormData;

  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Row className="p-3">
          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formTitle">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Course title
              </Form.Label>
              <Col xs={12} md={10}>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) =>
                    updateCourseFormData({
                      title: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formShortDescription"
            >
              <Form.Label column xs={12} md={2} className="text-md-end">
                Short description
              </Form.Label>
              <Col xs={12} md={10}>
                <Form.Control
                  type="textarea"
                  name="short-description"
                  value={shortDescription}
                  onChange={(e) =>
                    updateCourseFormData({
                      shortDescription: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formDescription">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Description
              </Form.Label>
              <Col xs={12} md={10}>
                <WYSIWYGEditor
                  autoGrow="true"
                  setValue={(_, description) =>
                    updateCourseFormData({ description })
                  }
                  contentState={description}
                  required
                />
              </Col>
            </Form.Group>
          </Col>

          {isCourseCreated() && (
            <Col xs={12} md={12} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="formActive">
                <Form.Label column xs={12} md={2} className="text-md-end">
                  Active
                </Form.Label>
                <Col xs={12} md={10}>
                  <Select
                    options={[
                      {
                        value: true,
                        label: "True",
                      },
                      {
                        value: false,
                        label: "False",
                      },
                    ]}
                    className="text-start"
                    onChange={(newOption) =>
                      updateCourseFormData({ isActive: newOption.value })
                    }
                    value={{
                      value: isActive,
                      label: isActive ? "True" : "False",
                    }}
                    required
                    name="formActive"
                  />
                </Col>
              </Form.Group>
            </Col>
          )}

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formCategorySelect"
            >
              <Form.Label column xs={12} md={2} className="text-md-end">
                Sub category
              </Form.Label>
              <Col xs={12} md={10}>
                <Select
                  options={getCategoryOptions()}
                  className="text-start"
                  onChange={(newOption) =>
                    updateCourseFormData({ category: newOption.value })
                  }
                  value={
                    category
                      ? { label: getCategoryTitle(category), value: category }
                      : undefined
                  }
                  required
                  name="CategorySelect"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formLevelSelect">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Level
              </Form.Label>
              <Col xs={12} md={10}>
                <Select
                  className="text-start"
                  options={getDifficultyLevelOptions()}
                  value={
                    levelTag
                      ? {
                          value: levelTag,
                          label: getDifficultyLevelTitle(levelTag),
                        }
                      : undefined
                  }
                  onChange={(newOption) =>
                    updateCourseFormData({ levelTag: newOption.value })
                  }
                  required
                  name="LevelSelect"
                />
              </Col>
            </Form.Group>
          </Col>

          {/* <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formSkillSelect">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Skills
              </Form.Label>
              <Col xs={12} md={10}>
                <Select
                  className="text-start"
                  options={getSkillOptions()}
                  value={skillTags.map((option) => ({
                    value: option,
                    label: getSkillLevelTitle(option),
                  }))}
                  onChange={(newOptions) => {
                    updateCourseFormData({
                      skillTags: newOptions.map((option) => option.value),
                    });
                  }}
                  name="formSkillSelect"
                  isMulti
                />
              </Col>
            </Form.Group>
          </Col> */}

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formContentStatusSelect"
            >
              <Form.Label column xs={12} md={2} className="text-md-end">
                Course Speciality
              </Form.Label>
              <Col xs={12} md={10}>
                <Select
                  className="text-start"
                  options={getContentSpecialityOptions()}
                  value={contentSpecialityTags.map((option) => ({
                    value: option,
                    label: getContentSpecialityTitle(option),
                  }))}
                  onChange={(newOptions) => {
                    updateCourseFormData({
                      contentSpecialityTags: newOptions.map(
                        (option) => option.value
                      ),
                    });
                  }}
                  isMulti
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formCourseStatus">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Course Status
              </Form.Label>
              <Col xs={12} md={10}>
                <Select
                  className="text-start"
                  options={getReviewStatusOptions()}
                  value={
                    reviewStatus
                      ? {
                          label: getReviewStatusLabel(reviewStatus),
                          value: reviewStatus,
                        }
                      : undefined
                  }
                  onChange={(newOption) => {
                    updateCourseFormData({
                      reviewStatus: newOption.value,
                    });
                  }}
                  required
                  name="courseStatus"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group
              as={Row}
              className="mb-3 mx-4"
              controlId="formCourseProgram"
            >
              <Form.Check
                onChange={(e) =>
                  updateCourseFormData({
                    isProgram: e.target.checked,
                  })
                }
                checked={isProgram}
                type="checkbox"
                label="Check if this is a Program"
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BasicDetailsStep;
