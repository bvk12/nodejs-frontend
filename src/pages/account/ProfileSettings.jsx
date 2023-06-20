import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardContent,
  IonNote,
  IonIcon,
  IonList,
  IonRouterOutlet,
  IonCardTitle,
  IonTextarea,
  IonButton,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import { useRef } from "react";
import { Card, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import InputField from "../../components/InputField";
import LoadingView from "../../components/LoadingView";
import useProfileSettings from "../../hooks/useProfileSettings";

const ProfileSettings = () => {
  const {
    profileData,
    loading,
    setProfileSettings,
    error,
    errorText,
    countries,
  } = useProfileSettings();

  //console.log(errorText);
  const onSave = () => {
    console.info("ProfileSettings: Submitting profile settings");

    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      bio: bioRef.current.value,
      gender: genderRef.current.value,
      dob: dobRef.current.value,
      country: countryRef.current.value,
      state: stateRef.current.value,
      city: cityRef.current.value,
      qualificationId: qualificationIdRef.current.value,
      qualificationStreamId:qualificationStreamIdRef.current.value,
      expertiseId: expertiseIdRef.current.value,
      socialLinks: {
        twitterProfile: twitterRef.current.value,
        linkedinProfile: linkedinRef.current.value,
        facebookProfile: facebookRef.current.value,
        instagramProfile: instagramRef.current.value,
        githubProfile: githubRef.current.value,
        youtubeProfile: youtubeRef.current.value,
      },
    };

    setProfileSettings(data);
  };

  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let bioRef = useRef();
  let genderRef = useRef();
  let dobRef = useRef();
  let countryRef = useRef();
  let stateRef = useRef();
  let cityRef = useRef();
  let qualificationIdRef = useRef();
  let qualificationStreamIdRef = useRef();
  let expertiseIdRef = useRef();
  let twitterRef = useRef();
  let linkedinRef = useRef();
  let facebookRef = useRef();
  let githubRef = useRef();
  let instagramRef = useRef();
  let youtubeRef = useRef();

  if (loading || error) {
    return <LoadingView />;
  }

  const {
    firstName,
    lastName,
    bio,
    gender,
    dob,
    socialLinks = {},
    country,
    state,
    city,
    qualificationId,
    expertiseId,
    qualificationStreamId,
    specialisationId,
  } = profileData.profile;

  const {
    twitterProfile,
    facebookProfile,
    linkedinProfile,
    githubProfile,
    instagramProfile,
    youtubeProfile,
  } = socialLinks;

  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Card.Title>Profile Settings</Card.Title>

        <Form>
          <Row className="p-3">
            <Col xs={12} md={6}>
              <Form.Group as={Row} className="mb-3" controlId="firstName">
                <Form.Label column xs={12} md={4} className="text-md-end">
                  First Name
                </Form.Label>
                <Col xs={12} md={8}>
                  <Form.Control
                    style={{ textTransform: "capitalize" }}
                    type="text"
                    ref={firstNameRef}
                    defaultValue={firstName}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="lastName">
                <Form.Label column xs={12} md={4} className="text-md-end">
                  Last Name
                </Form.Label>
                <Col xs={12} md={8}>
                  <Form.Control
                    style={{ textTransform: "capitalize" }}
                    type="text"
                    ref={lastNameRef}
                    defaultValue={lastName}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} md={12} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="bio">
                <Form.Label column xs={12} md={2} className="text-md-end">
                  Bio
                </Form.Label>
                <Col xs={12} md={10}>
                  <Form.Control type="text" ref={bioRef} defaultValue={bio} />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group as={Row} className="mb-3" controlId="gender">
                <Form.Label column xs={12} md={4} className="text-md-end">
                  Gender
                </Form.Label>
                <Col xs={12} md={8}>
                  <Form.Select defaultValue={gender} ref={genderRef}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="dob">
                <Form.Label column xs={12} md={4} className="text-md-end">
                  DOB
                </Form.Label>
                <Col xs={12} md={8}>
                  <Form.Control
                    type="date"
                    defaultValue={dob}
                    ref={dobRef}
                    max={new Date().toISOString().slice(0, 10)}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                <Form.Label column xs={12} md={4} className="text-md-end">
                  Education
                </Form.Label>
                <Col xs={12} md={8}>
                  <Form.Select
                    ref={qualificationIdRef}
                    defaultValue={qualificationId}
                  >
                    {profileData.qualifications.map(({ id, code }) => (
                      <option value={id}>{code}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="qu">
                <Form.Label column xs={12} md={4} className="text-md-end">
                  Specialization
                </Form.Label>
                <Col xs={12} md={8}>
                  <Form.Select
                    ref={qualificationStreamIdRef}
                    defaultValue={qualificationStreamId}
                  > 
                    {profileData.qualificationStreams.map(({ id, code }) => (
                      <option value={id}>{code}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} md={12} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="expertise">
                <Form.Label column xs={12} md={2} className="text-md-end">
                  Area Of Expertise
                </Form.Label>
                <Col xs={12} md={10}>
                  <Form.Select ref={expertiseIdRef} defaultValue={expertiseId}>
                    {profileData.expertises.map(({ id, code }) => (
                      <option value={id}>{code}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} md={12} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="country">
                <Form.Label column xs={12} md={2} className="text-md-end">
                  Country
                </Form.Label>
                <Col xs={12} md={10}>
                  <Form.Select
                    ref={countryRef}
                    defaultValue={country || "India"}
                  >
                    {countries.map(({ name }) => (
                      <option value={name}>{name}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="state">
                <Form.Label column xs={12} md={4} className="text-md-end">
                  State
                </Form.Label>
                <Col xs={12} md={8}>
                  <Form.Control
                    style={{ textTransform: "capitalize" }}
                    type="text"
                    ref={stateRef}
                    defaultValue={state}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} className="text-md-end">
              <Form.Group as={Row} className="mb-3" controlId="city">
                <Form.Label column xs={12} md={4} className="text-md-end">
                  City
                </Form.Label>
                <Col xs={12} md={8}>
                  <Form.Control
                    type="text"
                    ref={cityRef}
                    defaultValue={city}
                    style={{ textTransform: "capitalize" }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <hr className="mt-0" />

          <div className="p-3">
            <Form.Group as={Row} className="mb-3" controlId="githubLink">
              <Form.Label column xs={12} md={2} className="text-md-end">
                <div style={{}}>
                  <i
                    className="fab fa-github"
                    style={{ fontSize: "32px", color: "#0e76a8" }}
                  ></i>
                </div>
              </Form.Label>
              <Col xs={12} md={10}>
                <InputGroup className="mb-2">
                  <InputGroup.Text>https://github.com/</InputGroup.Text>
                  <Form.Control
                    placeholder="Github Profile"
                    defaultValue={githubProfile}
                    ref={githubRef}
                  />
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="linkedinLink">
              <Form.Label column xs={12} md={2} className="text-md-end">
                <div style={{}}>
                  <i
                    className="fab fa-linkedin-in"
                    style={{ fontSize: "32px", color: "#0e76a8" }}
                  ></i>
                </div>
              </Form.Label>
              <Col xs={12} md={10}>
                <InputGroup className="mb-2">
                  <InputGroup.Text>https://in.linkedin.com/</InputGroup.Text>
                  <Form.Control
                    placeholder="LinkedIn Profile"
                    defaultValue={linkedinProfile}
                    ref={linkedinRef}
                  />
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="youtubeLink">
              <Form.Label column xs={12} md={2} className="text-md-end">
                <div style={{}}>
                  <i
                    className="fab fa-youtube"
                    style={{ fontSize: "32px", color: "#0e76a8" }}
                  ></i>
                </div>
              </Form.Label>
              <Col xs={12} md={10}>
                <InputGroup className="mb-2">
                  <InputGroup.Text>https://youtube.com</InputGroup.Text>
                  <Form.Control
                    placeholder="Yotube Profile"
                    defaultValue={youtubeProfile}
                    ref={youtubeRef}
                  />
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="facebookLink">
              <Form.Label column xs={12} md={2} className="text-md-end">
                <i
                  className="fab fa-facebook-f"
                  style={{ fontSize: "32px", color: "#4267B2" }}
                ></i>
              </Form.Label>
              <Col xs={12} md={10}>
                <InputGroup className="mb-2">
                  <InputGroup.Text>https://www.facebook.com/</InputGroup.Text>
                  <Form.Control
                    placeholder="Facebook Profile"
                    defaultValue={facebookProfile}
                    ref={facebookRef}
                  />
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="instagramLink">
              <Form.Label column xs={12} md={2} className="text-md-end">
                <i
                  className="fab fa-instagram"
                  style={{ color: "#1DA1F2", fontSize: "32px" }}
                ></i>
              </Form.Label>
              <Col xs={12} md={10}>
                <InputGroup className="mb-2">
                  <InputGroup.Text>https://instagram.com/</InputGroup.Text>
                  <Form.Control
                    placeholder="Instagram Profile"
                    defaultValue={instagramProfile}
                    ref={instagramRef}
                  />
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="twitterLink">
              <Form.Label column xs={12} md={2} className="text-md-end">
                <i
                  className="fab fa-twitter"
                  style={{ color: "#1DA1F2", fontSize: "32px" }}
                ></i>
              </Form.Label>
              <Col xs={12} md={10}>
                <InputGroup className="mb-2">
                  <InputGroup.Text>https://twitter.com/</InputGroup.Text>
                  <Form.Control
                    placeholder="Twitter Profile"
                    defaultValue={twitterProfile}
                    ref={twitterRef}
                  />
                </InputGroup>
              </Col>
            </Form.Group>
          </div>
        </Form>

        <p className="text-danger mt-4">{errorText}</p>
      </Card.Body>

      <Card.Footer className="text-end">
        <Button variant="primary" onClick={onSave}>
          Update
        </Button>
      </Card.Footer>
    </Card>
  );
};
export default ProfileSettings;
