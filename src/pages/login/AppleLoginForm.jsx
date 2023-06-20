import { useIonRouter } from "@ionic/react";
import { routes } from "../../utils/constants";
import { UserAPI } from "../../services/apis/UserAPI";
import AppleSignin from "react-apple-signin-auth";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContextProvider";

import { Stack } from "react-bootstrap";
export const AppleLoginForm = () => {
  const router = useIonRouter();
  const { user, setUser } = useContext(AuthContext);

  const appleResponse = (response) => {
    console.log("Apple response", response);
    if (!response.error) {
      UserAPI.loginApple(response)
        .then((res) => {
          setUser(res.data.user);
          console.log("Response after user execution:", res.data.user);
          if (res.data.status === "SUCCESS")
            router.push(routes.home, "forward", "push");
        })
        .catch((err) => console.log(err));
    }
  };

  //https://appleid.apple.com/auth/authorize?response_type=code&redirect_uri=https://example-app.com/redirect&scope=name email&client_id=com.visualpathtech.applogin&response_mode=form_post

  return (
    <>
      <AppleSignin
        /** Auth options passed to AppleID.auth.init() */
        authOptions={{
          /** Client ID - eg: 'com.example.com' */
          clientId: "com.visualpathtech.applogin",
          /** Requested scopes, seperated by spaces - eg: 'email name' */
          scope: "email name",
          /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
          redirectURI: "https://mylocaladdr.com:3000/account/courses",
          /** State string that is returned with the apple response */
          state: "state",
          /** Nonce */
          nonce: "nonce",
          /** Uses popup auth instead of redirection */
          usePopup: true,
        }} // REQUIRED
        /** General props */
        uiType="dark"
        /** className */
        className="apple-auth-btn"
        /** Removes default style tag */
        noDefaultStyle={false}
        /** Extra controlling props */
        /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
        onSuccess={appleResponse} // default = undefined
        /** Called upon signin error */
        onError={(error) => console.error(error)} // default = undefined
        /** Skips loading the apple script if true */
        skipScript={false} // default = undefined
        /** Apple image props */
        iconProp={{ style: { marginTop: "10px" } }} // default = undefined
        /** render function - called with all props - can be used to fully customize the UI by rendering your own component  */
        render={(props) => (
          <Stack direction="horizontal">
            <a href="_blank" onClick={props.onClick}>
              <i className="fab fa-apple"></i>
            </a>
          </Stack>
        )}
      />
    </>
  );
};
