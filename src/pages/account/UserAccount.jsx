import {
  IonButton,
  IonCheckbox,
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
} from "@ionic/react";
import { Card, Col, Container, Figure, Row } from "react-bootstrap";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from "../../utils/constants";
import LoginSettings from "./LoginSettings/LoginSettings";
import ProfileSettings from "./ProfileSettings";
import Subscriptions from "./Subscriptions";
import UserCourses from "./UserCourses";
import MyFavouritesIcon from "../../assets/favourite-2765.svg";
import MyCoursesIcon from "../../assets/courses-icon.svg";
import ProfileSettingsIcon from "../../assets/images/profile.svg";
import LoginSettingsIcon from "../../assets/images/settings.svg";
import SubscriptionsIcon from "../../assets/images/subscriptions.svg";
import LogoutIcon from "../../assets/images/logout.svg";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import Layout from "../../layout/default";
import _ from "lodash";
import "./userAccount.css";

import "../../theme/style.css";
import ProfilePhotoWeb from "../../components/ProfilePhoto/ProfilePhotoWeb";
import UserFavourites from "./UserFavourites";

const UserAccount = (props) => {
  const {
    user,
    setUser,
    setAuth,
    showAdminSideNav,
    handleLogout: handleSignout,
    getUserRole,
  } = useContext(AuthContext);
  const [editProfilePic, setEditProfilePic] = useState(false);

  const [showSideNav, setShowSideNav] = useState(false);

  const isSideNavVisible = async () => {
    const showNav = await showAdminSideNav();
    setShowSideNav(showNav);
  };

  useEffect(() => {
    isSideNavVisible();
  }, [user]);

  const { history } = props;

  const onClickProfilePic = () => {
    console.log("edit profiel pic");
    setEditProfilePic(true);
  };

  const pushRoute = (e, route) => {
    e.preventDefault();
    history.push(route);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    handleSignout();
  };

  const renderSideMenu = () => {
    return (
      <Card className="card border-0">
        <Figure className="text-center image-content-block">
          <div className="background-profile-image">
            <Figure.Image
              alt="Background Profile Image"
              key={Date.now()}
              src={
                user.profileImage + "?" + Date.now() ||
                "https://www.visualpathtech.com/uploads/user_images/thumbnail.png"
              }
            />
          </div>
          <div className="profile-pic-container">
            <a href="javascript:void" onClick={onClickProfilePic}>
              <Figure.Image
                width={100}
                height={100}
                alt="171x180"
                key={Date.now()}
                src={
                  user.profileImage + "?" + Date.now() ||
                  "https://www.visualpathtech.com/uploads/user_images/thumbnail.png"
                }
                className="profile-pic"
              />
            </a>

            <div className="edit">
              <a href="#">
                <i className="fas fa-pencil-alt fa-lg"></i>
              </a>
            </div>
          </div>

          <Figure.Caption>
            {`${user.firstName} ${user.lastName}`}
          </Figure.Caption>

          <div className="role-email">
            <span>{getUserRole()}</span>
          </div>
        </Figure>

        {/*<ProfilePhoto></ProfilePhoto>*/}
        <ProfilePhotoWeb
          showIt={editProfilePic}
          setEditProfilePic={setEditProfilePic}
          profileImage={user.profileImage}
        ></ProfilePhotoWeb>

        <div className="nav-list">
          <a href="#" onClick={(e) => pushRoute(e, routes.userSubscriptions)}>
            <img src={SubscriptionsIcon} alt="Subscriptions" /> Subscriptions
          </a>

          {/* <a href="#" onClick={(e) => pushRoute(e, routes.favouritesPage)}>
            <img src={MyFavouritesIcon} alt="My Favourites" /> Favourites
          </a> */}

          <a href="#" onClick={(e) => pushRoute(e, routes.userCourses)}>
            <img src={MyCoursesIcon} alt="My Progress" /> Progress
          </a>

          <a href="#" onClick={(e) => pushRoute(e, routes.profileSettings)}>
            <img src={ProfileSettingsIcon} alt="Profile Settings" /> Profile
            Settings
          </a>
          <a href="#" onClick={(e) => pushRoute(e, routes.loginSettings)}>
            <img src={LoginSettingsIcon} alt="Login Settings" /> Login Settings
          </a>
          {/* add logout logic here */}
          <a href="#" onClick={(e) => handleLogout(e)}>
            <img src={LogoutIcon} alt="Logout" /> Logout
          </a>
        </div>
      </Card>
    );
  };

  return (
    <IonPage>
      <IonContent ion-padding className="user-account">
        <Layout
          title="My Account"
          showSidebar={showSideNav ? true : false}
          showHeader={false}
        >
          <Row>
            <Col md={3} className="menu-block">
              {renderSideMenu()}
            </Col>
            <Col md={9} className="content-block">
              <Switch>
                <Route
                  exact
                  path={routes.userCourses}
                  component={UserCourses}
                />
                <Route
                  exact
                  path={routes.userSubscriptions}
                  component={Subscriptions}
                />
                <Route
                  exact
                  path={routes.favouritesPage}
                  component={UserFavourites}
                />
                <Route
                  exact
                  path={routes.profileSettings}
                  component={ProfileSettings}
                />
                <Route
                  exact
                  path={routes.loginSettings}
                  component={LoginSettings}
                />
                <Route render={() => <Redirect to={routes.userCourses} />} />
              </Switch>
            </Col>
          </Row>
        </Layout>
      </IonContent>
    </IonPage>
  );
};

export default UserAccount;
