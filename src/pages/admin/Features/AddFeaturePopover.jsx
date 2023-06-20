import { useRef } from "react";
import { Button, Form, FormGroup, Modal, Stack } from "react-bootstrap";

const AddFeaturePopover = ({ show, closePopover, createFeature }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const featureData = {
      featureName: featureNameRef.current.value,
      displayName: displayNameRef.current.value,
      // description: descriptionRef.current.value,
    };

    createFeature(featureData);
    closePopover();
  };

  let featureNameRef = useRef();
  let displayNameRef = useRef();
  let descriptionRef = useRef();

  return (
    <Modal show={show} onHide={closePopover} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Feature</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3" controlId="featureName">
            <Form.Label>Feature Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Feature Name"
              required
              autoFocus
              ref={featureNameRef}
            />
          </FormGroup>

          <Form.Group className="mb-3" controlId="displayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Display Name"
              required
              ref={displayNameRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
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
              Create Feature
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddFeaturePopover;
