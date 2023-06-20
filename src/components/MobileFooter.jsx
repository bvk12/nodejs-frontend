import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { routes } from "../utils/constants";

const MobileFooter = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom" className="mobile-footer">
      <Nav fill justify defaultActiveKey={routes.home} as={"ul"}>
        <Nav.Item>
          <Nav.Link
            to={routes.home}
            eventKey={routes.home}
            as={Link}
            className="footer-item"
          >
            <i class="fas fa-home"></i>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            to={routes.courses}
            eventKey={routes.courses}
            as={Link}
            className="footer-item"
          >
            <i className="fas fa-book" />
            Courses
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            to={routes.programs}
            eventKey={routes.programs}
            as={Link}
            className="footer-item"
          >
            <i className="fas fa-graduation-cap" />
            Programs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            to={routes.checkout}
            eventKey={routes.checkout}
            as={Link}
            className="footer-item"
          >
            <i class="fas fa-shopping-cart"></i>
            Cart
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default MobileFooter;
