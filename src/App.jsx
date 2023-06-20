import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./pages/login/LoginForm";
import SignupForm from "./pages/signup/SignupForm";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/style.css";
import "./theme/variables.css";

import "./assets/scss/style.scss";

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AuthContextProvider from "./context/AuthContextProvider";
import UserAccount from "./pages/account/UserAccount";
import AdminPage from "./pages/admin/AdminPage";
import Home from "./pages/Home";
import { AppleLoginForm } from "./pages/login/AppleLoginForm";
import CheckoutComponent from "./pages/payment/CheckoutPayment";
import PaymentCancel from "./pages/payment/PaymentCancel";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import ResetPasswordForm from "./pages/reset/ResetPassword";
import { DialogTypes, routes } from "./utils/constants";
//import "./../../ReactLearning2022/reusable-snippets/ProxyConsole/proxyConsole.js.js"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CourseListing from "./pages/courses/CourseListing";
import CoursePage from "./pages/courses/CoursePage";
import DynamicSiteInfoPage from "./pages/DynamicSiteInfoPage/DynamicSiteInfoPage";
import ProgramListing from "./pages/programs/ProgramListing";
import Program from "./pages/programs/ProgramPage";
import SubscriptionContextProvider from "./context/SubscriptionContextProvider";
import MobileFooter from "./components/MobileFooter";
import CustomNamedUploadImage from "./pages/admin/Uploads/CustomNamedUploadImage";
import SalesReport from "./pages/admin/Reports/SalesReport/SalesReport";

const App = () => {
  //const payPalClientID = 'AaT_bhbjyE4CqudYSJDqPPCqiGXBbA9_SkdIICZBxjTCZEQqQI84q0FUPInDxrDAaeiMGRqJp4-zYm3q';
  //const payPalClientID = 'AyE4CqudYSJDqPPCqiGXBbA9_SkdIICZBxjTCZEQqQI84q0FUPInDxrDAaeiMGRqJp4-zYm3q';
  //const payPalClientID = 'https://www.section.io/engineering-education/nodejs-paypal-checkout/'
  //const payPalClientID = 'sb-dh9qf22300608@business.example.com';
  const payPalClientID =
    "AaZeRh0ZDkTgOlAys23BF1fTDBeKlEsz6EYdmggH0UcvGQ_rwwWuEHECytfTA4GqKmjNU6PhtXiGBEFB";

  const initialOptions = {
    "client-id": payPalClientID,
    currency: "USD",
    intent: "capture",
  };

  const [dialogType, setDialogType] = useState();

  const { hash } = useLocation();

  // using hash based routing
  useEffect(() => {
    if (hash) {
      const dialogType = hash.slice(1);
      setDialogType(dialogType);
    } else {
      setDialogType();
    }
  }, [hash]);

  const renderDialog = () => {
    if (!dialogType) return <></>;

    switch (dialogType) {
      case DialogTypes.login:
        return <LoginForm />;
      case DialogTypes.signup:
        return <SignupForm />;
      case DialogTypes.resetPassword:
        return <ResetPasswordForm />;
      default:
        return <></>;
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <AuthContextProvider>
        <SubscriptionContextProvider>
          <Header />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
          />

          {renderDialog()}
          <div className="main-app">
            <Switch>
              <Route path={routes.applelogin} component={AppleLoginForm} />
              {/* protected routes */}

              <Route path={routes.home} component={Home} />
              <Route path={routes.courses} component={CourseListing} />
              <Route path={routes.programs} component={ProgramListing} />
              <Route path={routes.program} component={Program} />
              <Route path={routes.coursePage} component={CoursePage} />
              <Route
                path={routes.dynamicSiteInfo}
                component={DynamicSiteInfoPage}
              />
              <PrivateRoute path={routes.imgUploads} component={CustomNamedUploadImage} />
              <PrivateRoute path={routes.admin} component={AdminPage} />              
              <PrivateRoute path={routes.account} component={UserAccount} />
              <PrivateRoute
                path={routes.checkout}
                component={CheckoutComponent}
              />
              <PrivateRoute
                path={routes.successPay}
                component={PaymentSuccess}
              />
              <PrivateRoute path={routes.cancelPay} component={PaymentCancel} />

              <Redirect from="*" to={routes.home} />
            </Switch>
          </div>

          <MobileFooter />
        </SubscriptionContextProvider>
      </AuthContextProvider>
    </PayPalScriptProvider>
  );
};
export default App;
