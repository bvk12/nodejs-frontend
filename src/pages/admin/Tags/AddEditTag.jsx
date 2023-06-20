import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Col,
  Row,
  InputGroup,
  Stack,
} from "react-bootstrap";
import Select from "react-select";

const AddEditTag = (props) => {
  const {
    setTag,
    setShowAddModal,
    setShowEditModal,
    tag,
    showAddModal,
    showEditModal,
    createTag,
    updateTag,
    getTagTypeOptions,
  } = props;

  const hideModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const getModalTitle = () => {
    if (showAddModal) {
      return "Add Tag";
    } else if (showEditModal) {
      return "Edit Tag";
    }
  };

  const handleSave = () => {
    hideModal();

    if (showAddModal) {
      createTag();
    } else if (showEditModal) {
      updateTag();
    }
  };

  return (
    <Modal show={showAddModal || showEditModal} onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{getModalTitle()} </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={tag.name}
                onChange={(e) => setTag({ ...tag, name: e.target.value })}
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridTypeSelect">
              <Form.Label className="text-md-end">Type</Form.Label>

              <Select
                options={getTagTypeOptions()}
                className="text-start"
                onChange={(newOption) =>
                  setTag({ ...tag, type: newOption.value })
                }
                value={
                  tag.type ? { value: tag.type, label: tag.type } : undefined
                }
                required
                name="TagTypeSelect"
              />
            </Form.Group>
          </Row>

          {showEditModal && (
            <Row>
              <Form.Group as={Col} controlId="formGridTypeSelect">
                <Form.Label className="text-md-end">Active</Form.Label>
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
                    setTag({ ...tag, isActive: newOption.value })
                  }
                  value={{
                    value: tag.isActive,
                    label: tag.isActive ? "True" : "False",
                  }}
                  required
                  name="formActive"
                />
              </Form.Group>
            </Row>
          )}
          <Stack direction="horizontal" className="justify-content-end mt-4">
            <Button variant="secondary" onClick={hideModal} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditTag;
