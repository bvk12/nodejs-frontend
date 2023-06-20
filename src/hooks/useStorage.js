import { useEffect, useState } from "react";
import "../context/localstore";
import { LocalStorageKeys } from "../utils/constants";
import { getItem, setItem } from "../utils/storageUtils";

export function useStorage() {
  // initial state will be null
  const [user, _setUser] = useState();
  const [auth, _setAuth] = useState();
  const [signInStatus, setSignInStatus] = useState("signin");

  const initAuthState = async () => {
    // after update, both user Auth will be set to empty object if not present in local storage
    const storedUser = await getItem(LocalStorageKeys.loginUserKey);
    _setUser(storedUser || {});

    const storedAuth = await getItem(LocalStorageKeys.loginAuthKey);
    _setAuth(storedAuth || {});
  };

  useEffect(() => {
    initAuthState();
  }, []);

  const setUser = async (user) => {   
   await setItem(LocalStorageKeys.loginUserKey, user);
   _setUser(user);
  };

  const setAuth = async (auth) => {
    _setAuth(auth);
    setItem(LocalStorageKeys.loginAuthKey, auth);
  };

  return {
    user,
    setUser,
    auth,
    setAuth,
    _setAuth,
    setSignInStatus,
    signInStatus,
  };
}
