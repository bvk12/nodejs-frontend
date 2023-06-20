import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import jwt_decode from "jwt-decode";
import { UserAPI } from "../../services/apis/UserAPI";
import { useIonRouter } from "@ionic/react";
import { routes } from "../../utils/constants";

export const GoogleLoginForm = () => {
  // const router = useIonRouter();
  const { user, setUser, setAuth } = useContext(AuthContext);
  // console.log(user, auth)
  const router = useIonRouter();

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token", response, response.credential)
    var userObject = jwt_decode(response.credential);
    //console.log("Google Auth details", userObject, user, response);

    // console.log("Google response decoded:", userObject)
    if (userObject) {
      console.log("============Google response no error.. calling userapi.");
      UserAPI.loginGoogle(userObject).then(async (res) => {
        console.info("Response after user execution:", res)
        if(res.data?.user)
        await setUser(res.data.user);
        // console.warn("User ====>", user, res.data.user)
        await setAuth(res.data.auth);
        // console.log("=========================", auth, user)
        if (res.data.status === "SUCCESS") router.push(routes.home);
      });
    }
  }

  useEffect(() => {
    /*Global google : since this is coming from global*/
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "583996685833-2he2alm11hoa5a2ck64cmf3buu6gtlq6.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large", shape: "circle", type: "icon" }
      );
    }
  }, [user]);

  return <></>;
};
