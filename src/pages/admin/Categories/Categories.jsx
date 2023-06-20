import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Card, Stack, Row } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCategories from "../../../hooks/useCategory";
import AddEditCategory from "./AddEditCategory";
import DeletIcon from "mdi-react/DeleteIcon";
import PencilIcon from "mdi-react/PencilIcon";
import Select from "react-select";

import "./Categories.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DeleteIcon from "mdi-react/DeleteIcon";
import { ACTIVE_FILTER_STATES } from "../../../utils/constants";
import LoadingView from "../../../components/LoadingView";

const Categories = () => {
  const {
    loading,
    error,
    categories,
    filteredData,
    editCategory,
    createCategory,
    category,
    deleteCategory,
    maxOrderSubCategories,
    setCategory,
    setShowAddModal,
    setShowEditModal,
    showAddModal,
    showEditModal,
    maxOrderCategories,
    openAddModal,
    getNoOfSubCategories,
    activeFilter,
    setActiveFilter,
    getCourseCategories,
    getProgramCategories,
  } = useCategories();

  if (loading) {
    return <LoadingView />;
  }

  const renderCategories = (categories) => {
    return (
      <Row as={"ul"} className="categories-container">
        {categories
          .sort((a, b) => a.ordering - b.ordering)
          .map((category) => (
            <Col sm={6} md={4} lg={3} key={category.id}>
              <Card>
                {category.thumbnailUrl && (
                  <Card.Img
                    className="category-card-img"
                    variant="top"
                    src={category.thumbnailUrl}
                  />
                )}
                <Card.Body>
                  <Card.Title>
                    <i className={category.icon} /> {category.title}
                  </Card.Title>

                  <Card.Text>
                    <small style={{ fontSize: "0.75rem" }}>
                      <span style={{ float: "left" }}>{`${getNoOfSubCategories(
                        category
                      )} Sub categories`}</span>
                      <span
                        style={{ float: "right" }}
                      >{`Category Order : ${category.ordering}`}</span>
                    </small>
                  </Card.Text>
                </Card.Body>
                <ul className="list-group list-group-flush">
                  {category.subCategories &&
                    category.subCategories
                      .filter((subCategory) => subCategory.isActive)
                      .sort((a, b) => a.ordering - b.ordering)
                      .map((subCategory) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={subCategory.id}
                        >
                          <span>{subCategory.title}</span>

                          <div>
                            <Button
                              variant="outline"
                              className="p-0 me-1 subcategory-actions"
                              onClick={() => {
                                setShowEditModal(true);
                                setCategory(subCategory);
                              }}
                            >
                              <PencilIcon size={16} />
                            </Button>

                            <Button
                              className="p-0 me-2 subcategory-actions"
                              variant="outline"
                              onClick={() => deleteCategory(subCategory)}
                            >
                              <DeleteIcon size={16} />
                            </Button>

                            <span>Order : {subCategory.ordering}</span>
                          </div>
                        </li>
                      ))}
                </ul>

                <Card.Body className="d-flex flex-row align-items-center justify-content-between">
                  <Button
                    onClick={() => {
                      setShowEditModal(true);
                      setCategory(category);
                    }}
                  >
                    Edit
                  </Button>

                  {category.isActive ? (
                    <Button onClick={() => deleteCategory(category)}>
                      Delete
                    </Button>
                  ) : (
                    <></>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    );
  };

  const renderCourseCategories = () => {
    const courseCategories = getCourseCategories();

    return (
      <>
        <Row>
          <Col>
            <h3 className="category-type-heading mt-3"> Course Categories </h3>
          </Col>
        </Row>

        {renderCategories(courseCategories)}
      </>
    );
  };

  const renderProgramCategories = () => {
    const progarmCategories = getProgramCategories();

    return (
      <>
        <Row>
          <Col>
            <h3 className="category-type-heading"> Program Categories </h3>
          </Col>
        </Row>

        {renderCategories(progarmCategories)}
      </>
    );
  };

  return (
    <div>
      {(showAddModal || showEditModal) && (
        <AddEditCategory
          showAddModal={showAddModal}
          showEditModal={showEditModal}
          category={category}
          setCategory={setCategory}
          setShowAddModal={setShowAddModal}
          categories={filteredData}
          setShowEditModal={setShowEditModal}
          createCategory={createCategory}
          editCategory={editCategory}
          maxOrderSubCategories={maxOrderSubCategories}
          maxOrderCategories={maxOrderCategories}
          getNoOfSubCategories={getNoOfSubCategories}
        />
      )}

      <Row>
        <Col xl={12}>
          <Card style={{ marginBottom: "30px" }}>
            <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
              <h2>Categories</h2>

              <ul className="admin-table-header">
                <li>
                  <Select
                    options={Object.values(ACTIVE_FILTER_STATES).map(
                      (filterState) => ({
                        label: filterState,
                        value: filterState,
                      })
                    )}
                    className="text-start me-4"
                    value={{ label: activeFilter, value: activeFilter }}
                    onChange={(newOption) => setActiveFilter(newOption.value)}
                  />
                </li>

                <li>
                  <Button onClick={openAddModal} style={{ float: "right" }}>
                    <i className="mdi mdi-plus"></i>Add new category
                  </Button>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {renderProgramCategories()}
      {renderCourseCategories()}
    </div>
  );
};

export default Categories;
