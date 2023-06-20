import { Form, Row, Col, Card } from "react-bootstrap";
import ImageInput from "../../../../components/ImageInput";

import Select from "react-select";
import { useEffect, useState } from "react";

const BasicDetailsStep = ({ programContext }) => {
  const {
    programFormData,
    updateProgramFormData,
    getCategoryOptions,
    getCourses,
    isProgramCreated,
    getReviewStatusOptions,
    getSkillOptions,
    getSkillLevelTitle,
    getContentSpecialityOptions,
    getContentSpecialityTitle,
  } = programContext;
  const {
    title,
    description,
    orderBy,
    category,
    isActive = true,
    courseIds = [],
    skillTags = [],
    contentSpecialityTags = [],
    bannerUrl,
  } = programFormData;

  const [allCatagories, setAllCatagories] = useState(getCategoryOptions());
  const [allCourses, setAllCourses] = useState(getCourses());
  const [selectedCourses, setSelectedCourses] = useState();
  const [reviewStatus, setReviewStatus] = useState(
    programFormData.reviewStatus
      ? programFormData.reviewStatus.toLowerCase()
      : "Pending"
  );
  //console.log("Program form data Courses:->", allCourses,getCourses())
  //console.log("Category,courses:->", category, courseIds)

  useEffect(() => {
    //setAllCourses(getCourses());
    // console.log("Review Status",reviewStatus,programFormData)
    if (reviewStatus) {
      updateProgramFormData({
        reviewStatus: reviewStatus.toLowerCase(),
      });
    }
    setSelectedCourses(getSelectedCourses(courseIds));
  }, []);

  function getCategoryOption(categoryVal) {
    var resultCat = {};
    allCatagories.forEach((category) => {
      if (category.value === categoryVal) {
        resultCat = category;
      }
    });
    // console.log("Result cat is",categoryVal, resultCat,allCatagories)
    return resultCat;
  }

  function getSelectedCourses(selectedCourses) {
    // console.log("Getting selected  Courses", selectedCourses, allCourses)
    var resultCourses = [];
    selectedCourses.forEach((selectedCourse) => {
      allCourses.forEach((course) => {
        //  console.log(course.value, selectedCourse)
        if (course.value === selectedCourse) {
          resultCourses.push(course);
        }
      });
    });
    //   console.log("Result courses is", resultCourses, allCourses)
    return resultCourses;
  }
  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Row className="p-3">
          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formTitle">
              <Form.Label column xs={12} md={3} className="text-md-end">
                Program title
              </Form.Label>
              <Col xs={12} md={9}>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) =>
                    updateProgramFormData({
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
              <Form.Label column xs={12} md={3} className="text-md-end">
                Short description
              </Form.Label>
              <Col xs={12} md={9}>
                <Form.Control
                  type="textarea"
                  name="short-description"
                  value={description}
                  onChange={(e) =>
                    updateProgramFormData({
                      description: e.target.value,
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
              controlId="orderBy"
            >
              <Form.Label column xs={12} md={3} className="text-md-end">
                Display Order 
              </Form.Label>
              <Col xs={12} md={9}>
                <Form.Control
                  type="number"
                  name="displayOrder"
                  value={orderBy}
                  onChange={(e) =>
                    updateProgramFormData({
                      orderBy: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Form.Group>
          </Col>
          {isProgramCreated() && (
            <Col xs={12} md={12} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="formActive">
                <Form.Label column xs={12} md={3} className="text-md-end">
                  Active
                </Form.Label>
                <Col xs={12} md={9}>
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
                      updateProgramFormData({ isActive: newOption.value })
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
              <Form.Label column xs={12} md={3} className="text-md-end">
                Category
              </Form.Label>
              <Col xs={12} md={9}>
                <Select
                  className="text-start"
                  options={getCategoryOptions()}
                  onChange={(newOption) => {
                    //console.log(newOption)
                    updateProgramFormData({ category: newOption.value });
                  }}
                  value={getCategoryOption(category)}
                  // value={
                  //  category ? { value: category, label: category } : undefined
                  // }
                  required
                  name="CategorySelect"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formSkillSelect">
              <Form.Label column xs={12} md={3} className="text-md-end">
                Courses
              </Form.Label>
              <Col xs={12} md={9}>
                <Select
                  className="text-start"
                  options={getCourses()}
                  onChange={(newOptions) => {
                    updateProgramFormData({
                      courses: newOptions.map((option) => option.value),
                    });
                    // console.log(courses);
                    setSelectedCourses(newOptions);
                    // console.log("Selected Courss:", newOptions);
                  }}
                  value={selectedCourses}
                  required
                  name="formSkillSelect"
                  isMulti
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formoverviewUrl">
              <Form.Label column xs={12} md={3} className="text-md-end">
                Program thumbnail
              </Form.Label>
              <Col xs={12} md={9}>
                <ImageInput
                  imgSrc={bannerUrl}
                  label={"Click to Upload"}
                  onChange={(imgSrc) =>
                    updateProgramFormData({
                      bannerUrl: imgSrc,
                    })
                  }
                  placeholder="https://www.techbricksedu.com/assets/frontend/default/img/course_thumbnail_placeholder.jpg"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formCourseStatus">
              <Form.Label column xs={12} md={3} className="text-md-end">
                Program Status
              </Form.Label>
              <Col xs={12} md={9}>
                <Select
                  className="text-start "
                  style={{ textTransform: "capitalize" }}
                  options={getReviewStatusOptions()}
                  value={
                    reviewStatus
                      ? {
                          label: reviewStatus,
                          value: reviewStatus.toLowerCase(),
                        }
                      : undefined
                  }
                  onChange={(newOption) => {
                    setReviewStatus(newOption.value);
                    updateProgramFormData({
                      reviewStatus: newOption.value.toLowerCase(),
                    });
                  }}
                  required
                  name="courseStatus"
                />
              </Col>
            </Form.Group>
          </Col>

          {/* <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formSkillSelect">
              <Form.Label column xs={12} md={3} className="text-md-end">
                Skills
              </Form.Label>
              <Col xs={12} md={9}>
                <Select
                  className="text-start"
                  options={getSkillOptions()}
                  value={skillTags.map((option) => ({
                    value: option,
                    label: getSkillLevelTitle(option),
                  }))}
                  onChange={(newOptions) => {
                    updateProgramFormData({
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
              <Form.Label column xs={12} md={3} className="text-md-end">
                Program Speciality
              </Form.Label>
              <Col xs={12} md={9}>
                <Select
                  className="text-start"
                  options={getContentSpecialityOptions()}
                  value={contentSpecialityTags.map((option) => ({
                    value: option,
                    label: getContentSpecialityTitle(option),
                  }))}
                  onChange={(newOptions) => {
                    updateProgramFormData({
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
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BasicDetailsStep;
