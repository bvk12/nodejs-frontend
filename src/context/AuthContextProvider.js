import { createContext, useEffect, useState } from "react";
import { useStorage } from "../hooks/useStorage";
import {
  routes,
  routeToRoleFeaturesCodesMap,
  LocalStorageKeys,
} from "../utils/constants";
import _ from "lodash";
import { useHistory, useLocation } from "react-router";

import { DialogTypes } from "../utils/constants";
import { UserAPI } from "../services/apis/UserAPI";
import { CartAPI } from "../services/apis/CartAPI";

import { getItem, removeItem, setItem } from "../utils/storageUtils";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const history = useHistory();
  const { search, pathname } = useLocation();  const [cartItemCount, setCartItemCount] = useState(0);
  const [settingsMenuStatus, _setSettingsMenuStatus] = useState()

  const { signInStatus, setSignInStatus, user, setUser, auth, setAuth } =
    useStorage();


  const setSettingsMenuStatus = (val) => {
    setItem("settingsMenu", val)
    _setSettingsMenuStatus(val);
  }

  // get the cart count when user first visits the page
  useEffect(() => {
    if (!isUserLoggedIn()) return;

    getCartItemCount();
  }, [user]);

  useEffect(() => {
    console.log("Settign menu status changed to:", settingsMenuStatus);
  }, [settingsMenuStatus]);

  const goToSignIn = () => {
    // console.log("go to sign in.........................", signInStatus);
    setSignInStatus("signin");
    history.push({ pathname, search, hash: DialogTypes.login });
  };

  const goToCart = () => {
    //  console.log("go to sign in.........................", signInStatus);
    setSignInStatus("signin");
    history.push(routes.cart);
  };

  const goToSignUp = () => {
    //  console.log("go to sign up.........................", signInStatus);
    setSignInStatus("signup");
    history.push({ pathname, search, hash: DialogTypes.signup });
  };

  const closePopover = () => {
    history.push({ pathname, search });
  };

  const handleLogout = () => {
    setUser({});
    setAuth({});

    // remove permissions from cache so that we can get latest ones next time
    removeItem(LocalStorageKeys.userPermissionKeys);

    history.push({ pathname: routes.home, hash: DialogTypes.login });
  };

  const isRouteShown = async (route) => {
    let permissions;

    const routeSegments = route.split("/").filter(Boolean);

    // need to check for every parent route
    for (let i = 0; i < routeSegments.length; i++) {
      const currentRoute = `/${routeSegments.slice(0, i + 1).join("/")}`;

      const featureCode = routeToRoleFeaturesCodesMap[currentRoute];

      if (featureCode) {
        // doing this, so that we only get permissions when we need it. (not on every call)
        if (!permissions) {
          permissions = await getPermissions();
        }

        // check if this user has permission to access this feature code.
        let hasAcess = checkRequiredFeatureAccess(featureCode, permissions);
        if (!hasAcess) return false;
      }
    }

    return true;
  };

  const checkRequiredFeatureAccess = (featureCode, permissions) => {
    if (!featureCode) return true;

    // if for reason,a ny error happens, better not to show the route itself
    if (!permissions) return false;

    let featurePermissions = permissions.find(
      (permission) => permission.featureCode === featureCode
    );

    if (!featurePermissions) return false;

    return featurePermissions.permissions?.includes("all");
  };

  const getPermissions = async () => {
    try {
      const localPermissions = await getItem(
        LocalStorageKeys.userPermissionKeys
      );

      // if cache is still valid, use it as it is
      if (localPermissions) {
        return localPermissions.feature_permissions;
      }

      // else get new data and update cache
      const { data: permissionData } = await UserAPI.getUserPermissions();
      const permissions = permissionData.data.role;

      // keeping 5 mins
      const timestamp = new Date().getTime() + 5 * 60 * 1000;
      setItem(LocalStorageKeys.userPermissionKeys, permissions, timestamp);

      return permissions.feature_permissions;
    } catch (error) {
      console.error(
        "AuthContextProvider: getPermissions: error occured",
        error
      );
    }
  };

  const showAdminSideNav = async () => {
    if (_.isEmpty(user)) return false;

    const showAdminRoute = await isRouteShown(routes.admin);

    return showAdminRoute;
  };

  const isUserLoggedIn = () => {
    if (_.isEmpty(user)) {
      return false;
    }

    return true;
  };

  const getCartItemCount = async () => {
    try {
      var currentCartItems = await CartAPI.getCartItems(user.userId);
      const cartItemCount = currentCartItems.data.data?.length;
      //   console.info(
      //   "AuthContextProvider: getCartItemCount: got the cart item count",
      //  cartItemCount
      //  );

      setCartItemCount(cartItemCount);
    } catch (error) {
      console.error(
        "AuthContextProvider: getCartItems: error getting cart items, error: ",
        error
      );
    }
  };

  const updateCartItemCount = (value) => {
    setCartItemCount(value);
  };

  const getUserRole = () => {
    if (_.isEmpty(user)) return "Student";

    return user.roleName || "Student";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        auth,
        setAuth,
        isRouteShown,
        showAdminSideNav,
        signInStatus,
        setSignInStatus,
        goToSignIn,
        goToSignUp,
        closePopover,
        handleLogout,
        isUserLoggedIn,
        updateCartItemCount,
        cartItemCount,
        getUserRole,
        settingsMenuStatus,
        setSettingsMenuStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
