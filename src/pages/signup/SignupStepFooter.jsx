import { Button, Stack, Row, Col, Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

const SignupStepFooter = ({ submitText }) => {
  const { goToSignIn } = useContext(AuthContext);

  return (
    <>

    <div>
      <Container>
        <Row>
          <Col sm={6}>
          <div className="f-14" style={{textAlign:"center"}}>
        Already registered User ?{" "}
        <a
          href={"javascript:void(0);"}
          onClick={() => {
            goToSignIn();
          }}
        >
          <strong> Sign In</strong>
        </a>
      </div>
          </Col>
          <Col sm={6} style={{textAlign:"center", marginTop:"3px"}}>
          <Button type="submit" variant="primary">
        {submitText}
      </Button>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default SignupStepFooter;
