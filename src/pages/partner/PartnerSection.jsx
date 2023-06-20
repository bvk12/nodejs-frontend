import React from 'react'

const PartnerSection = () => {
  return (
    <>
<section className="bg-light-secondry instructor">
<Container>
  <Row>
    <Col md={6}>
      <Card>
        <Card.Body className="p-4">
          <Row>
            <Col md={2}>
              <img src={Instructor} className="img-fluid" />
            </Col>
            <Col md={10}>
              <h3 className="mb-3">Become an Instructor</h3>
              <p className="basic-text mb-3">
                Turn your technical expertise, "real-world"
                experience and great communications skills into
                a rewarding part-time teaching opportunity.
                We're expanding our instructor force to meet the
                growing demand for our training programs.
              </p>
              <button className="btn btn-secondry">
                Register
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6}>
      <Card>
        <Card.Body className="p-4">
          <Row>
            <Col md={2}>
              <img src={Instructor} className="img-fluid" />
            </Col>
            <Col md={10}>
              <h3 className="mb-3">Become a Partner</h3>
              <p className="basic-text mb-3">
                Turn your technical expertise, "real-world"
                experience and great communications skills into
                a rewarding part-time teaching opportunity.
                We're expanding our instructor force to meet the
                growing demand for our training programs.
              </p>
              <button className="btn btn-secondry">
                Register
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
</section>
<section
className="bg-light-primary-1 partners text-center subscribe-section"
style={{ background: "#2A2A31;" }}
>
<Container style={{ background: "#2A2A31" }}>
  <Row>
    <Col md={12} className="text-center">
      <Row className="align-items-center p-4 justify-content-center">
        <Col md={10} sm={8}>
          {subscribe()}
        </Col>
      </Row>
    </Col>
  </Row>
</Container>
</section>
</>
  )
}

export default PartnerSection;
