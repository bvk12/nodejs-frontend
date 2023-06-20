import { Card, Form, Button, Row, Col } from "react-bootstrap";

import Layout from "../../layout/default";
import Block from "../../components/Block/Block";
import { Icon } from "../../components/Icon/Icon";
import { Link } from "react-router-dom";

function SystemSettings() {
  return (
    <Layout title="Form controls">
      <Block.Head>
        <Block.HeadBetween>
          <Block.HeadContent>
            <Block.Title tag="h2">System Settings</Block.Title>
            <nav>
              <ol className="breadcrumb breadcrumb-arrow mb-0">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="">Settings</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  System Settings
                </li>
              </ol>
            </nav>
          </Block.HeadContent>
          <Block.HeadContent></Block.HeadContent>
        </Block.HeadBetween>
      </Block.Head>
      <Block>
        <Card>
          <Card.Body>
            <Row className="g-3 gx-gs">
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText1">
                    Upload Logo
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Control
                      type="file"
                      id="exampleFormControlInputText6"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText2">
                    Website Title
                  </Form.Label>
                  <div className="form-control-wrap">
                    <div className="form-control-hint">
                      <span>hint</span>
                    </div>
                    <Form.Control
                      type="text"
                      id="exampleFormControlInputText2"
                      placeholder="Input text placeholder"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText3">
                    System Name
                  </Form.Label>
                  <div className="form-control-wrap">
                    <div className="form-control-icon start">
                      <Icon name="eye"></Icon>
                    </div>
                    <Form.Control
                      type="text"
                      id="exampleFormControlInputText3"
                      placeholder="Input text placeholder"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText4">
                    Slogan
                  </Form.Label>
                  <div className="form-control-wrap">
                    <div className="form-control-icon end">
                      <Icon name="eye"></Icon>
                    </div>
                    <Form.Control
                      type="text"
                      id="exampleFormControlInputText4"
                      placeholder="Input text placeholder"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlTextarea8">
                    Meta Keywords
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Control
                      as="textarea"
                      placeholder="Textarea Placeholder"
                      id="exampleFormControlTextarea8"
                      rows="3"
                    ></Form.Control>
                  </div>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlTextarea8">
                    Meta Description
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Control
                      as="textarea"
                      placeholder="Textarea Placeholder"
                      id="exampleFormControlTextarea8"
                      rows="3"
                    ></Form.Control>
                  </div>
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText6">
                    System Email
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Control
                      type="text"
                      id="exampleFormControlInputText2"
                      placeholder="Input text placeholder"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText6">
                    Phone
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Control
                      type="text"
                      id="exampleFormControlInputText2"
                      placeholder="Input text placeholder"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText5">
                    Time Zone
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Select
                      id="exampleFormControlInputText5"
                      aria-label="Default select example"
                    >
                      <option value="0">Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText6">
                    Purchase Code
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Control
                      type="text"
                      id="exampleFormControlInputText2"
                      placeholder="Input text placeholder"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlTextarea8">
                    Address
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Control
                      as="textarea"
                      placeholder="Textarea Placeholder"
                      id="exampleFormControlTextarea8"
                      rows="3"
                    ></Form.Control>
                  </div>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="exampleFormControlInputText6">
                    Footer Text
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Control
                      type="text"
                      id="exampleFormControlInputText2"
                      placeholder="Input text placeholder"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Block>
    </Layout>
  );
}

export default SystemSettings;
