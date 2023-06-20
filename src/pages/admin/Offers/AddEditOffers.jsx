import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Col,
  Row,
  InputGroup,
  Stack,
  FormControl,
} from "react-bootstrap";
import Select from "react-select";

const AddEditOffer = (props) => {
  const {
    setOffer,
    setShowAddModal,
    setShowEditModal,
    offer,
    showAddModal,
    showEditModal,
    createOffer,
    updateOffer,
    getOfferTypeOptions,
  } = props;

  const hideModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const getDateFormat = (date) => {
    if (!date) {
      return;
    } else return new Date(date).toISOString().slice(0, 10);
  };

  const getModalTitle = () => {
    if (showAddModal) {
      return "Add Offer";
    } else if (showEditModal) {
      return "Edit Offer";
    }
  };

  const handleSave = () => {
    hideModal();

    if (showAddModal) {
      createOffer();
    } else if (showEditModal) {
      updateOffer();
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
            <Form.Group className="mb-3" as={Col} controlId="formGridTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={offer.offerName}
                onChange={(e) =>
                  setOffer({ ...offer, offerName: e.target.value })
                }
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3" as={Col} controlId="formGridCode">
              <Form.Label>Code</Form.Label>
              <Form.Control
                value={offer.offerCode}
                onChange={(e) =>
                  setOffer({ ...offer, offerCode: e.target.value })
                }
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3" as={Col} controlId="formGridDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={offer.offerDesc}
                onChange={(e) =>
                  setOffer({ ...offer, offerDesc: e.target.value })
                }
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group
              className="mb-3"
              as={Col}
              controlId="formGridTypeSelect"
            >
              <Form.Label className="text-md-end">Type</Form.Label>

              <Select
                options={getOfferTypeOptions()}
                className="text-start"
                onChange={(newOption) =>
                  setOffer({ ...offer, offerType: newOption.value })
                }
                value={
                  offer.offerType
                    ? { value: offer.offerType, label: offer.offerType }
                    : { value: "discount", label: "discount" }
                }
                required
                name="TagTypeSelect"
              />
            </Form.Group>
          </Row>

          {!offer.offerType || offer.offerType === "discount" ? (
            <Row>
              <Form.Label>Discount</Form.Label>

              <InputGroup className="mb-3" as={Col} ontrolId="formGridDiscount">
                <FormControl
                  type="number"
                  min={0}
                  max={100}
                  value={offer.offerPercent}
                  onChange={(e) =>
                    setOffer({
                      ...offer,
                      offerPercent: Number(e.target.value),
                      offerAmount: undefined,
                    })
                  }
                  required
                />

                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </Row>
          ) : (
            <Row>
              <Form.Group className="mb-3" as={Col} controlId="formGridAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={offer.offerAmount}
                  onChange={(e) =>
                    setOffer({
                      ...offer,
                      offerAmount: Number(e.target.value),
                      offerPercent: undefined,
                    })
                  }
                  required
                />
              </Form.Group>
            </Row>
          )}

          <Row>
            <Form.Group className="mb-3" as={Col} controlId="formGridStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={getDateFormat(offer.startDate)}
                onChange={(e) =>
                  setOffer({ ...offer, startDate: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3" as={Col} controlId="formGridEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={getDateFormat(offer.endDate)}
                onChange={(e) =>
                  setOffer({ ...offer, endDate: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          {showEditModal && (
            <Row>
              <Form.Group
                className="mb-3"
                as={Col}
                controlId="formGridTypeSelect"
              >
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
                    setOffer({ ...offer, isActive: newOption.value })
                  }
                  value={{
                    value: offer.isActive,
                    label: offer.isActive ? "True" : "False",
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

export default AddEditOffer;
