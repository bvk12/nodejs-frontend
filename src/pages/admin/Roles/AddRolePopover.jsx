import { useRef } from "react";
import { Button, Form, FormGroup, Modal, Stack } from "react-bootstrap";

const AddRolePopover = ({ show, closePopover, createRole }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const roleData = {
      roleName: roleNameRef.current.value,
      displayName: displayNameRef.current.value,
      description: descriptionRef.current.value,
    };

    createRole(roleData);
    closePopover();
  };

  let roleNameRef = useRef();
  let displayNameRef = useRef();
  let descriptionRef = useRef();

  return (
    <Modal show={show} onHide={closePopover} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Role</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3" controlId="roleName">
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role Name"
              required
              autoFocus
              ref={roleNameRef}
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
              required
              placeholder="Enter Role Description"
              ref={descriptionRef}
            />
          </Form.Group>

          <Stack direction="horizontal" className="justify-content-end">
            <Button variant="secondary" onClick={closePopover} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create Role
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRolePopover;
