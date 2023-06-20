import { useRef, useState } from "react";
import PhoneInput2 from "react-phone-input-2";

import {
  Button,
  Col,
  Form,
  FormGroup,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { Select } from "../../../components";
import { UserAPI } from "../../../services/apis/UserAPI";
import { RoleCodesMap } from "../../../utils/constants";


const AddUserPopover = ({
  show,
  closePopover,
  createUser,
  roleData,
  isUserEmailPresent,
  errorText,
  getLowerRoleData,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      mobile: "+"+mobileNumber,
      password: passwordRef.current.value,
      roleCode: roleCodeRef.current.value,
    };

    const email = emailRef.current.value;
    const isEmailPresent = await isUserEmailPresent(email);

    if (!isEmailPresent) {
      createUser(userData);
      closePopover();
    }
  };

  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let emailRef = useRef();
  let mobileRef = useRef();
  let passwordRef = useRef();
  let roleCodeRef = useRef();
  const [mobileNumber, setMobileNumber] = useState();

  return (
    <Modal show={show} onHide={closePopover} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col lg="6">
              <Form.Group className="mb3">
                <Form.Label htmlFor="firstname">First Name</Form.Label>
                <div className="form-control-wrap">
                  <Form.Control
                    id="firstname"
                    type="text"
                    placeholder="First name"
                    required
                    ref={firstNameRef}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg="6">
              <Form.Group className="mb3">
                <Form.Label htmlFor="lastname">Last Name</Form.Label>
                <div className="form-control-wrap">
                  <Form.Control
                    id="lastname"
                    type="text"
                    required
                    placeholder="Last name"
                    ref={lastNameRef}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg="6">
              <Form.Group className="mb3">
                <Form.Label htmlFor="email">Email Address</Form.Label>
                <div className="form-control-wrap">
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Email address"
                    required
                    ref={emailRef}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg="6">
              <Form.Group className="mb3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <div className="form-control-wrap">
                  <Form.Control
                    id="password"
                    type="text"
                    placeholder="Enter password"
                    required
                    ref={passwordRef}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg="6">
              <Form.Group className="mb3">
                <Form.Label htmlFor="mobile">Mobile</Form.Label>
                <div className="form-control-wrap">
                  {/* <Form.Control
                    id="mobile"
                    type="tel"
                    placeholder="Mobile"
                    ref={mobileRef}
                    required
                  /> */}
                  <PhoneInput2
                    placeholder="Mobile No"
                    country="in"
                    enableSearch
                    countryCodeEditable={false}
                    value={mobileNumber}
                    onChange={(mobileNumber) => {
                      setMobileNumber(mobileNumber);
                    }}
                  />
                </div>

                <div className="pe-3">

                </div>
              </Form.Group>
            </Col>

            <Col lg="12" className="mb-3">
              <Form.Group className="mb3">
                <Form.Label>Role</Form.Label>
                <div className="form-control-wrap">
                  <Form.Select
                    ref={roleCodeRef}
                    defaultValue={RoleCodesMap.Student} // default role is student
                  >
                    {getLowerRoleData().map((roleRow) => (
                      <option key={roleRow.roleCode} value={roleRow.roleCode}>
                        {roleRow.displayName}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>

            <Col lg="12">
              <p className="text-danger mb-3">{errorText}</p>
            </Col>
          </Row>

          <Stack direction="horizontal" className="justify-content-end">
            <Button variant="secondary" onClick={closePopover} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add User
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserPopover;
