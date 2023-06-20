// import { IonButton, IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import { IonHeader } from "@ionic/react";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useIonRouter } from "@ionic/react";
import VPTMobileIcon from "../assets/images/Logo-mobile.svg";
import VPTIcon from "../assets/images/Logo.svg";
import { AuthContext } from "../context/AuthContextProvider";
import { routes } from "../utils/constants";
import {
  CustomDropdownMenu,
  CustomDropdownToggle,
  Icon,
  Image,
  LinkList,
  Media,
  MediaGroup,
  MediaText,
} from "./";
import "./Header.css";
import { UserAPI } from "../services/apis/UserAPI";
import SearchBar from "./SearchBar";
import { SubscriptionContext } from "../context/SubscriptionContextProvider";

function QuickNav({ className, ...props }) {
  const compClass = classNames({
    "nk-quick-nav": true,
    [className]: className,
  });
  return <ul className={compClass}>{props.children}</ul>;
}

function QuickNavItem({ className, onClick, ...props }) {
  const compClass = classNames({
    "d-inline-flex": true,
    [className]: className,
  });
  return (
    <li onClick={onClick} className={compClass}>
      {props.children}
    </li>
  );
}

const Header = () => {
  const {
    user,
    setUser,
    auth,
    setAuth,
    signInStatus,
    goToSignIn,
    goToSignUp,
    isUserLoggedIn,
    goToShoppingCart,
    handleLogout,
    cartItemCount,
    getUserRole,
  } = useContext(AuthContext);
  const { isPartnerInstance } = useContext(SubscriptionContext);

  const router = useIonRouter();

  const [loading, setLoading] = useState(true);
  const [logos, setLogos] = useState();

  // for closing menu when user clicks items in mobile view
  const [menuExpanded, setMenuExpanded] = useState(false);

  const openSignInPage = () => {
    console.log("opening signin page...");
    goToSignIn();
  };

  const openSignUpPage = () => {
    console.log("opening signup page...");
    goToSignUp();
  };

  function handleMyAccount() {
    router.push(routes.account, "forward", "push");
  }

  const showCartPage = () => {
    router.push(routes.checkout);
  };

  const handleMenuItemsClick = () => {
    setMenuExpanded(false);
  };

  const renderRightSideNav = () => {
    const userLoggedIn = isUserLoggedIn();
    const isPartnerPlatform = isPartnerInstance();

    return (
      <>
        <SearchBar closeMenu={handleMenuItemsClick} />

        {!userLoggedIn ? (
          <div className="d-flex navbar-nav-right app-header-right-nav">
            {/* <Nav as="ul" className="me-auto mb-2 mb-md-0">
          <NavItem as="li">
            <DropdownButton
              id="dropdown-basic-button"
              className="border-radius-50"
              title="Register"
            >
              <Dropdown.Item
                onClick={() => {
                  openSignInPage();
                }}
                active={signInStatus === "signin"}
              >
                Sign In
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  openSignUpPage();
                }}
              >
                Sign Up
              </Dropdown.Item>
            </DropdownButton>
          </NavItem>
        </Nav> */}

            <Stack direction="horizontal" gap={4}>
              <Button
                variant="primary"
                onClick={() => {
                  openSignInPage();
                }}
              >
                Sign In
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => {
                  openSignUpPage();
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </div>
        ) : (
          <div className="nk-header-tools app-header-right-nav">
            <QuickNav>
              <Dropdown as={QuickNavItem} onClick={(e) => e.stopPropagation()}>
                <Dropdown.Toggle bsPrefix as={CustomDropdownToggle}>
                  <div className="d-inline-flex d-sm-none">
                    <Media shape="circle" size="md">
                      <Image
                        src={
                          user?.profileImage ||
                          "https://www.visualpathtech.com/uploads/user_images/thumbnail.png"
                        }
                        staticImage
                        thumbnail
                      />
                    </Media>
                  </div>
                  <div className="d-none d-sm-flex">
                    <Media shape="circle">
                      <Image
                        src={
                          user?.profileImage ||
                          "https://www.visualpathtech.com/uploads/user_images/thumbnail.png"
                        }
                        staticImage
                        thumbnail
                      />
                    </Media>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu-md"
                  as={CustomDropdownMenu}
                >
                  <div className="dropdown-content dropdown-content-x-lg py-3 border-bottom border-light">
                    <MediaGroup>
                      <Media size="xl" shape="circle">
                        <Image
                          src={
                            user?.profileImage ||
                            "https://www.visualpathtech.com/uploads/user_images/thumbnail.png"
                          }
                          staticImage
                          thumbnail
                        />
                      </Media>
                      <MediaText>
                        <div className="lead-text">
                          {user.firstName} {user.lastName}
                        </div>
                        <span className="sub-text">{getUserRole()}</span>
                      </MediaText>
                    </MediaGroup>
                  </div>
                  <Dropdown.Item className=" dropdown-content dropdown-content-x-lg py-3 border-bottom border-light">
                    <LinkList>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleMyAccount();
                          handleMenuItemsClick();
                        }}
                        target="_blank"
                      >
                        <Icon name="signout"></Icon>&nbsp; &nbsp; &nbsp;
                        <span>My Account</span>
                      </div>
                      {/* <LinkListItem to="/admin/profile"><Icon name="contact"></Icon><span>My Contacts</span></LinkListItem>
                            <LinkListItem to="/admin/profile-settings"><Icon name="setting-alt"></Icon><span>Account Settings</span></LinkListItem> */}
                    </LinkList>
                  </Dropdown.Item>
                  <Dropdown.Item className=" dropdown-content dropdown-content-x-lg py-3">
                    <LinkList>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleLogout();
                          handleMenuItemsClick();
                        }}
                        target="_blank"
                      >
                        <Icon name="signout"></Icon>&nbsp; &nbsp; &nbsp;
                        <span>Sign Out</span>
                      </div>
                    </LinkList>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* hide cart for partner instance */}
              {!isPartnerPlatform && (
                <QuickNavItem>
                  <button
                    className="btn-icon btn btn-zoom btn-sm d-sm-none position-relative"
                    onClick={showCartPage}
                  >
                    <Icon className="fs-1 ps-2" name="cart"></Icon>
                    <Badge bg="danger" pill className="cart-count-icon ">
                      {cartItemCount}
                    </Badge>
                  </button>
                  <button
                    className="btn-icon btn btn-zoom btn-md d-none d-sm-inline-flex position-relative"
                    onClick={showCartPage}
                  >
                    <Icon className="fs-1 ps-2" name="cart"></Icon>
                    <Badge bg="danger" pill className="cart-count-icon">
                      {cartItemCount}
                    </Badge>
                  </button>
                </QuickNavItem>
              )}
            </QuickNav>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    setLoading(true);
    async function loadHeaderImages() {
      try {
        let logos = await UserAPI.getLogoSettings();
        if (logos) setLogos(logos);
        //console.log("LOGOS",logos)
        setLoading(false);
      } catch (err) {
        console.log("Error loadign iamges.");
        setLoading(false);
      }
    }
    loadHeaderImages();
  }, []);

  if (loading) {
    return <>....</>;
  }

  return (
    <>
      <IonHeader>
        <Navbar
          expand="sm"
          expanded={menuExpanded}
          className="fixed-top custom-navbar d-flex flex-column"
        >
          <div className="scroll-red w-100">
            VisualpathTech an e-learning platform with 150+ courses
          </div>

          <Container fluid>
            <Link to={routes.home}>
              <NavbarBrand className="header-logo">
                <img
                  src={logos?.data?.logos?.lightLogo}
                  style={{ maxHeight: "90px" }}
                  className="img-fluid"
                  alt="vpt-icon"
                />
              </NavbarBrand>
              <NavbarBrand className="mobile-header-logo">
                <img src={VPTMobileIcon} className="img-fluid" alt="vpt-icon" />
              </NavbarBrand>
            </Link>

            <Navbar.Toggle
              aria-controls="navbarCollapse"
              aria-label="Toggle navigation"
              onClick={() => setMenuExpanded(!menuExpanded)}
            />
            <Navbar.Collapse id="navbarCollapse" onClick={handleMenuItemsClick}>
              <Nav as="ul" className="me-auto">
                <NavItem as="li">
                  <Link
                    to={routes.courses}
                    className="nav-btn btn "
                    id="header-nav-btn"
                  >
                    {/* <img src={CoursesIcon} alt="courses-icon" /> */}
                    Courses
                  </Link>
                </NavItem>

                <NavItem as="li">
                  <Link
                    to={routes.programs}
                    className="nav-btn btn "
                    id="header-nav-btn"
                  >
                    {/* <img src={CoursesIcon} alt="courses-icon" /> */}
                    Programs
                  </Link>
                </NavItem>

                <NavItem as="li">
                  <Link to={routes.home} className="nav-btn btn ">
                    <Button>Home</Button>
                  </Link>
                </NavItem>

                {/* <NavItem as="li">
                  <Nav.Link href="/live-training" className="nav-btn btn">
                    <img src={LiveTraining} alt="courses-icon" /> 
                    Live Training
                  </Nav.Link>
                </NavItem>

                <NavItem as="li">
                  <Nav.Link href="/live-training" className="nav-btn btn">
                    <img src={LiveTraining} alt="courses-icon" /> 
                    Code Compiler
                  </Nav.Link>
                </NavItem>

                <NavItem as="li">
                  <Nav.Link href="/live-training" className="nav-btn btn">
                    <img src={LiveTraining} alt="courses-icon" /> 
                    Free Assessments
                  </Nav.Link>
                </NavItem>

                <NavItem as="li">
                  <Nav.Link href="/live-training" className="nav-btn btn">
                    <img src={LiveTraining} alt="courses-icon" /> 
                    Blog
                  </Nav.Link>
                </NavItem> */}

                {/* <NavItem as="li" className="p-3">
                <Button variant="primary" onClick={(e) => getUser()}>
                  getUser
                </Button>
              </NavItem> */}

                {/* <NavItem as="li">
                <Form className="d-flex">
                  <FormControl
                    className="form-control me-2 w-265"
                    type="search"
                    placeholder="What do you want to learn|"
                    aria-label="Search"
                  />

                  <Button variant="outline-primary" type="submit">
                    <img src={SearchIcon} className="img-fluid" alt="search-icon" />
                  </Button>
                </Form>
              </NavItem> */}
              </Nav>
              {renderRightSideNav()}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </IonHeader>
    </>
  );
};

export default Header;
