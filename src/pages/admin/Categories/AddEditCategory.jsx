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
import $ from "jquery";
import "fontawesome-iconpicker/dist/css/fontawesome-iconpicker.min.css";
import "fontawesome-iconpicker/dist/js/fontawesome-iconpicker.min.js";
import ImageInput from "../../../components/ImageInput";

const AddEditCategory = (props) => {
  const {
    setCategory,
    setShowAddModal,
    setShowEditModal,
    category,
    createCategory,
    editCategory,
    showAddModal,
    showEditModal,
    categories,
    maxOrderSubCategories,
    maxOrderCategories,
  } = props;

  const hideModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const getModalTitle = () => {
    if (showAddModal) {
      return "Add Category";
    } else if (showEditModal) {
      return "Edit Category";
    }
  };

  const handleSave = () => {
    hideModal();

    if (showAddModal) {
      createCategory();
    } else if (showEditModal) {
      editCategory();
    }
  };

  useEffect(() => {
    // Initialize the iconpicker on the div element
    $(".icon-picker").iconpicker({
      selected: category.icon,
      hideOnSelect: true,
    });

    $(".icon-picker").on("iconpickerSelected", function (event) {
      setCategory((category) => ({
        ...category,
        icon: event.iconpickerValue,
      }));
    });
  }, []);

  return (
    <Modal show={showAddModal || showEditModal} onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{getModalTitle()} </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={category.title}
                onChange={(e) =>
                  setCategory({ ...category, title: e.target.value })
                }
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={category.type}
                onChange={(e) =>
                  setCategory({ ...category, type: e.target.value })
                }
              >
                <option value="category">Category</option>
                <option value="subCategory">SubCategory</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group
              as={Col}
              className="mt-1"
              controlId="formProgramCategory"
            >
              {category.type === "category" && (
                <Form.Check
                  onChange={(e) =>
                    setCategory({
                      ...category,
                      isProgramCategory: e.target.checked,
                    })
                  }
                  checked={category.isProgramCategory}
                  type="checkbox"
                  label="Is it a Program Category"
                />
              )}
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridParent">
              {category.type === "subCategory" && (
                <>
                  <Form.Label>Parent</Form.Label>
                  <Form.Select
                    value={category.parent}
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        parent: Number(e.target.value),
                      })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </Form.Select>
                </>
              )}
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridIcon">
              <Form.Label>Icon</Form.Label>
              <Form.Control
                type="text"
                className="icon-picker"
                placeholder="Pick an icon"
                readOnly={true}
                value={category.icon}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridThumbnailUrl">
              <Form.Label>Thumbnail</Form.Label>

              <ImageInput
                imgSrc={category.thumbnailUrl}
                label={"Category Thumbnail"}
                onChange={(imgSrc) =>
                  setCategory({ ...category, thumbnailUrl: imgSrc })
                }
                placeholder="https://www.techbricksedu.com/assets/frontend/default/img/course_thumbnail_placeholder.jpg"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridOrdering">
              <Form.Label>Ordering</Form.Label>
              <Form.Select
                value={category.ordering}
                onChange={(e) =>
                  setCategory({ ...category, ordering: Number(e.target.value) })
                }
              >
                {category.type !== "subCategory"
                  ? [...Array(maxOrderCategories() + 2).keys()]
                      .slice(1)
                      .map((order) => (
                        <option key={order} value={order}>
                          {order}
                        </option>
                      ))
                  : [
                      ...Array(
                        maxOrderSubCategories(category.parent) + 2
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

          {showEditModal && (
            <Row>
              <Form.Group as={Col} controlId="formGridIsActive">
                <Form.Label>Active</Form.Label>
                <Form.Select
                  value={category.isActive}
                  onChange={(e) =>
                    setCategory({
                      ...category,
                      isActive: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </Form.Select>
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

export default AddEditCategory;
