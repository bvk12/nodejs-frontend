import React, { useContext, useEffect, useState } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import { isPlatform, IonPage } from "@ionic/react";

import { AuthContext } from "../context/AuthContextProvider";
import { DialogTypes, routes } from "../utils/constants";
import LoadingView from "./LoadingView";

import _ from "lodash";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const { user, isRouteShown } = useContext(AuthContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const checkUserAccess = async () => {
    // before state is fetched from local storage, user is undefined.
    // later it is set to data or empty object depending on login state
    if (!user) return;

    if (_.isEmpty(user)) {
      // if it's ios platform, don't go to login page, instead allow user to navigate around
      if (isPlatform("ios")) {
        console.info(
          "IOS Application, So navigating to home page instead of login page"
        );
        history.push(routes.home);
        return;
      }

      history.push(`${routes.home}/#${DialogTypes.login}`);
      return;
    }

    handleRouteChange();
  };

  const handleRouteChange = async () => {
    if (!user || _.isEmpty(user)) return;

    setLoading(true);

    // else user data is available by this point
    const showRoute = await isRouteShown(pathname);
    if (!showRoute) {
      console.info(
        `this ${pathname} can't be shown to this user, redierecting to account`
      );
      history.push(routes.home);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkUserAccess();
  }, [user]);

  useEffect(() => {
    handleRouteChange();
  }, [pathname]);

  return (
    <>
      {loading ? (
        <IonPage>
          <LoadingView />
        </IonPage>
      ) : (
        <Route {...rest} render={(props) => <Component {...props} />} />
      )}
    </>
  );
};

export default PrivateRoute;
