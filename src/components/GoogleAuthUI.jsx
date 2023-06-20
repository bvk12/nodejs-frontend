import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useEffect, useState } from "react";
import { isPlatform } from "@ionic/core";
import { IonAvatar, IonButton, IonText } from "@ionic/react";
import useToast from "../hooks/useToast";
export const GoogleAuthUI = () => {
  const [user, setUser] = useState(null);

  const { showToast } = useToast();

  const notification = (data) => {
    showToast(data.description);
  };

  useEffect(() => {
    if (!isPlatform("capacitor")) {
      notification({
        placement: "top",
        description: "Not capacitor plaform .. initializing googleAuth",
      });
      GoogleAuth.initialize({
        clientId:
          "637042349641-resl2k9ikgp2jkg1llqibltac1dtkg91.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        grantOfflineAccess: true,
      });
    } else {
      notification({
        placement: "top",
        description: " capacitor plaform .. not initializing googleAuth",
      });
      GoogleAuth.initialize({
        clientId:
          "637042349641-resl2k9ikgp2jkg1llqibltac1dtkg91.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        grantOfflineAccess: true,
      });
    }
  });

  async function signIn() {
    try {
      let googleUser = await GoogleAuth.signIn();
      console.log("user:", user, googleUser);
      setUser(googleUser);
      notification({
        placement: "top",
        description: "Welcome back: " + googleUser.givenName,
      });
    } catch (error) {
      notification({
        placement: "top",
        description: "Error:" + error,
      });
      console.log(error, error?.code);
    }
  }

  async function refresh() {
    let authCode = await GoogleAuth.refresh();
    notification({
      placement: "top",
      description: "Welcome back: " + authCode,
    });
    console.log("user:", authCode);
  }

  async function signOut() {
    await GoogleAuth.signOut();
    setUser(null);
    notification({
      placement: "top",
      description: "good bye ",
    });
  }

  return (
    <>
      <IonButton expand="full" onClick={signIn}>
        Sign In
      </IonButton>
      <IonButton expand="full" onClick={signOut}>
        Sign Out
      </IonButton>
      <IonButton expand="full" onClick={refresh}>
        Refresh
      </IonButton>
      <IonAvatar slot="start">
        <div className="row">
          <div className="col-sm-2"> </div>
          <div className="col-sm-3">
            {" "}
            <IonText>{user?.familyName}</IonText>
          </div>
          <div className="col-sm-3">
            {" "}
            <IonText>{user?.givenName}</IonText>
          </div>
          <div className="col-sm-3">
            <IonText>{user?.email}</IonText>
          </div>
        </div>

        <br />
        <br />
      </IonAvatar>
    </>
  );
};
