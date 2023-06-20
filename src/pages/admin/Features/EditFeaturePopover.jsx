import { useRef } from "react";
import { Button, Form, FormGroup, Modal, Stack } from "react-bootstrap";

const EditFeaturePopover = ({
  show,
  closePopover,
  updateFeature,
  editFeatureData,
}) => {
  const { featureCode, featureName, displayName, description, isActive } =
    editFeatureData;

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();

    const featureData = {
      featureName: featureNameRef.current.value,
      displayName: displayNameRef.current.value,
      // description: descriptionRef.current.value,
      isActive: isActiveRef.current.value,
    };

    updateFeature(featureCode, featureData);
    closePopover();
  };

  let featureNameRef = useRef();
  let displayNameRef = useRef();
  let descriptionRef = useRef();
  let isActiveRef = useRef();

  return (
    <Modal show={show} onHide={closePopover} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Feature</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3" controlId="featureName">
            <Form.Label>Feature Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={featureName}
              required
              autoFocus
              ref={featureNameRef}
            />
          </FormGroup>

          <Form.Group className="mb-3" controlId="displayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={displayName}
              placeholder="Enter Display Name"
              required
              ref={displayNameRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="isActive">
            <Form.Label>Active</Form.Label>
            <Form.Select defaultValue={isActive} ref={isActiveRef}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={description}
              rows={3}
              placeholder="Enter Feature Description"
              ref={descriptionRef}
            />
          </Form.Group>

          <Stack direction="horizontal" className="justify-content-end">
            <Button variant="secondary" onClick={closePopover} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update Feature
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditFeaturePopover;
