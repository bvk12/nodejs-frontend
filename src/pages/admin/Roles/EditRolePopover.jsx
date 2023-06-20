import { useRef } from "react";
import { Button, Form, FormGroup, Modal, Stack } from "react-bootstrap";

const EditRolePopover = ({ show, closePopover, editRole, editRoleData }) => {
  const {
    roleCode,
    roleName,
    displayName,
    description,
    isActive,
    featurePermissions,
  } = editRoleData;

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();

    const roleData = {
      featurePermissions,
      roleName: roleNameRef.current.value,
      displayName: displayNameRef.current.value,
      description: descriptionRef.current.value,
      isActive: isActiveRef.current.value,
    };

    editRole(roleCode, roleData);
    closePopover();
  };

  let roleNameRef = useRef();
  let displayNameRef = useRef();
  let descriptionRef = useRef();
  let isActiveRef = useRef();

  return (
    <Modal show={show} onHide={closePopover} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Role</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3" controlId="roleName">
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={roleName}
              required
              autoFocus
              ref={roleNameRef}
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
              placeholder="Enter Role Description"
              ref={descriptionRef}
              required
            />
          </Form.Group>

          <Stack direction="horizontal" className="justify-content-end">
            <Button variant="secondary" onClick={closePopover} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update Role
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditRolePopover;
