import { useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import PhoneInput2 from "react-phone-input-2";
import { isValidNumber } from "libphonenumber-js";
import useToast from "../../../hooks/useToast";
import {
  ToastVariants,
} from "../../../utils/constants";
const EditUserPopover = ({
  show,
  closePopover,
  editUser,
  roleData,
  editUserData,
  isUserEmailPresent,
  getLowerRoleData,
  errorText
}) => {
  const { firstName, lastName, isActive, roleCode, email, mobile, userId } =
    editUserData;
  const { showToast } = useToast();
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    let addPlusNewMobile = mobileNumber;
    if (!mobileNumber.startsWith("+")) {
      addPlusNewMobile = "+" + mobileNumber;
    }
    //console.log("new mobilenumber starts", addPlusNewMobile.startsWith("+"));
    console.log("mobilenumber", addPlusNewMobile);
    if (!isValidNumber(addPlusNewMobile)) {
      setErrorText("Please Enter Valid Mobile Number");
      showToast(
        "Invalid Mobile Number entered, Please check your input ",
        ToastVariants.error
      );
      return false;
    }

    let userData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      mobile: addPlusNewMobile,
      isActive: isActiveRef.current.value === "true" ? true : false,
      roleCode: roleCodeRef.current.value,
    };

    const newEmail = emailRef.current.value;
    // only do if it's diff email
    if (newEmail !== email) {
      const isEmailPresent = await isUserEmailPresent(newEmail);
      if (!isEmailPresent) {
        editUser({ ...userData, email: emailRef.current.value }, userId);
        closePopover();
      }
    } else {
      editUser(userData, userId);      
      closePopover();
    }
  
  };//end of handleSubmit

  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let emailRef = useRef();
  let mobileRef = useRef();
  let isActiveRef = useRef();
  let roleCodeRef = useRef();
  const [mobileNumber, setMobileNumber] = useState(mobile);

  return (
    <Modal show={show} onHide={closePopover} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
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
                    defaultValue={firstName}
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
                    defaultValue={lastName}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg="9">
              <Form.Group className="mb3">
                <Form.Label htmlFor="mobile">Mobile</Form.Label>
                <div className="form-control-wrap">
                  {/* <Form.Control
                    id="mobile"
                    type="tel"
                    placeholder="Mobile"
                    ref={mobileRef}
                    required
                    defaultValue={mobile}
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
              </Form.Group>
            </Col>
            <Col lg="8">
              <Form.Group className="mb3">
                <Form.Label htmlFor="email">Email Address</Form.Label>
                <div className="form-control-wrap">
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Email address"
                    required
                    ref={emailRef}
                    defaultValue={email}
                  />
                </div>
              </Form.Group>
            </Col>


            <Col lg="12">
              <Form.Group className="mb3">
                <Form.Label>Active</Form.Label>
                <Form.Select defaultValue={isActive} ref={isActiveRef}>
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col lg="12" className="mb-3">
              <Form.Group className="mb3">
                <Form.Label>Role</Form.Label>
                <div className="form-control-wrap">
                  <Form.Select ref={roleCodeRef} defaultValue={roleCode}>
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
              Update User
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserPopover;
