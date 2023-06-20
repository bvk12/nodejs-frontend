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

const AddEditChapter = (props) => {
  const {
    showAddChapterModal,
    showEditChapterModal,
    addEditChapterData,
    setaddEditChapterData,
    setShowAddChapterModal,
    setShowEditChapterModal,
    createChapter,
    updateChapter,
  } = props;

  const hideModal = () => {
    setShowAddChapterModal(false);
    setShowEditChapterModal(false);
  };

  const getModalTitle = () => {
    if (showAddChapterModal) {
      return "Add Chapter";
    } else if (showEditChapterModal) {
      return "Edit Chapter";
    }
  };

  const handleSave = () => {
    hideModal();

    if (showAddChapterModal) {
      createChapter();
    } else if (showEditChapterModal) {
      updateChapter();
    }
  };

  return (
    <Modal
      show={showAddChapterModal || showEditChapterModal}
      onHide={hideModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{getModalTitle()} </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={addEditChapterData.title}
                onChange={(e) =>
                  setaddEditChapterData({
                    ...addEditChapterData,
                    title: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridOrdering">
              <Form.Label>Ordering</Form.Label>
              <Form.Select
                value={addEditChapterData.ordering}
                onChange={(e) =>
                  setaddEditChapterData({
                    ...addEditChapterData,
                    ordering: Number(e.target.value),
                  })
                }
              >
                {[
                  ...Array(
                    addEditChapterData.noOfChapters +
                      (showAddChapterModal ? 2 : 1)
                  ).keys(),
                ]
                  .slice(1)
                  .map((order) => (
                    <option key={order} value={order}>
                      {order}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* {showEditChapterModal && (
            <Row>
              <Form.Group as={Col} controlId="formGridIsActive">
                <Form.Label>Active</Form.Label>
                <Form.Select
                  value={addEditChapterData.isActive}
                  onChange={(e) =>
                    setaddEditChapterData({
                      ...addEditChapterData,
                      isActive: e.target.value,
                    })
                  }
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </Form.Select>
              </Form.Group>
            </Row>
          )} */}

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

export default AddEditChapter;
