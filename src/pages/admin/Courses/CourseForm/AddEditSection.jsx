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

const AddEditSection = (props) => {
  const {
    showAddSectionModal,
    showEditSectionModal,
    addEditSectionData,
    setAddEditSectionData,
    setShowAddSectionModal,
    setShowEditSectionModal,
    createSection,
    updateSection,
    chapterData,
    getSectionCountOfChapter,
  } = props;

  const hideModal = () => {
    setShowAddSectionModal(false);
    setShowEditSectionModal(false);
  };

  const getModalTitle = () => {
    if (showAddSectionModal) {
      return "Add Section";
    } else if (showEditSectionModal) {
      return "Edit Section";
    }
  };

  const handleSave = () => {
    hideModal();

    if (showAddSectionModal) {
      createSection();
    } else if (showEditSectionModal) {
      updateSection();
    }
  };

  return (
    <Modal
      show={showAddSectionModal || showEditSectionModal}
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
                value={addEditSectionData.title}
                onChange={(e) =>
                  setAddEditSectionData({
                    ...addEditSectionData,
                    title: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridChapter">
              <Form.Label>Chapter</Form.Label>
              <Form.Select
                value={addEditSectionData.chapterId}
                onChange={(e) =>
                  setAddEditSectionData({
                    ...addEditSectionData,
                    chapterId: Number(e.target.value),
                  })
                }
              >
                {chapterData.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridOrdering">
              <Form.Label>Ordering</Form.Label>
              <Form.Select
                value={addEditSectionData.ordering}
                onChange={(e) =>
                  setAddEditSectionData({
                    ...addEditSectionData,
                    ordering: Number(e.target.value),
                  })
                }
              >
                {[
                  ...Array(
                    getSectionCountOfChapter(addEditSectionData.chapterId) + 2
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

          <Row>
            <Form.Group as={Col} controlId="formGridContentUrl">
              <Form.Label>Content Url</Form.Label>
              <Form.Control
                value={addEditSectionData.contentUrl}
                onChange={(e) =>
                  setAddEditSectionData({
                    ...addEditSectionData,
                    contentUrl: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Row>

          {/* Use time pciker component */}
          <Row>
            <Form.Group as={Col} controlId="formGridDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                value={addEditSectionData.duration}
                onChange={(e) =>
                  setAddEditSectionData({
                    ...addEditSectionData,
                    duration: e.target.value,
                  })
                }
                required
                type="number"
              />
            </Form.Group>
          </Row>

          {/* {showEditSectionModal && (
            <Row>
              <Form.Group as={Col} controlId="formGridIsActive">
                <Form.Label>Active</Form.Label>
                <Form.Select
                  value={addEditSectionData.isActive}
                  onChange={(e) =>
                    setAddEditSectionData({
                      ...addEditSectionData,
                      isActive: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </Form.Select>
              </Form.Group>
            </Row>
          )} */}

          <Row className="mt-3">
            <Form.Group as={Col} controlId="formGridFreeCheck">
              <Form.Check
                onChange={(e) =>
                  setAddEditSectionData({
                    ...addEditSectionData,
                    isFree: e.target.checked,
                  })
                }
                checked={addEditSectionData.isFree}
                type="checkbox"
                label="If you want to keep it free, check here"
              />
            </Form.Group>
          </Row>

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

export default AddEditSection;
