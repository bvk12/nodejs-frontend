import { Form, Row, Col, Container, Card } from "react-bootstrap";
import Select from "react-select";
import ImageInput from "../../../../components/ImageInput";

const MediaStep = ({ courseContext, formRef }) => {
  const { courseFormData, updateCourseFormData } = courseContext;
  const { overviewProvider, overviewUrl, thumbnailUrl } = courseFormData;

  const courseProviders = ["Youtube", "Vimeo", "Html5"];

  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Row className="p-3">
          <Col xs={12} md={12} className="text-md-end">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formoverviewProvider"
            >
              <Form.Label column xs={12} md={2} className="text-md-end">
                Course overview provider
              </Form.Label>
              <Col xs={12} md={10}>
                <Select
                  className="text-start"
                  options={courseProviders.map((provider) => ({
                    value: provider,
                    label: provider,
                  }))}
                  value={
                    overviewProvider
                      ? {
                          value: overviewProvider,
                          label: overviewProvider,
                        }
                      : undefined
                  }
                  onChange={(provider) => {
                    updateCourseFormData({
                      overviewProvider: provider.value,
                    });
                  }}
                  required
                  name="formoverviewProvider"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formoverviewUrl">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Course overview url
              </Form.Label>
              <Col xs={12} md={10}>
                <Form.Control
                  type="text"
                  value={overviewUrl}
                  onChange={(e) =>
                    updateCourseFormData({
                      overviewUrl: e.target.value,
                    })
                  }
                  required
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formoverviewUrl">
              <Form.Label column xs={12} md={2} className="text-md-end">
                Course thumbnail
              </Form.Label>
              <Col xs={12} md={10}>
                <ImageInput
                  imgSrc={thumbnailUrl}
                  label={"Course Thumbnail"}
                  onChange={(imgSrc) =>
                    updateCourseFormData({
                      thumbnailUrl: imgSrc,
                    })
                  }
                  placeholder="https://www.techbricksedu.com/assets/frontend/default/img/course_thumbnail_placeholder.jpg"
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MediaStep;
