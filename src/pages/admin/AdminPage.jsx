import React from "react";
import { Route, Switch } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import { DynamicInputForm } from "../DynamicForms/DynamicInputForm";
import { routes } from "../../utils/constants";
import Roles from "./Roles/Roles";
import Features from "./Features/Features";
import RoleFeatures from "./RoleFeatures";
import Layout from "../../layout/default";
import ManageUsers from "./ManageUsers/ManageUsers";
import Categories from "./Categories/Categories";
import Courses from "./Courses/Courses";
import Programs from "./Programs/Programs";
import Tags from "./Tags/Tags";
import Offers from "./Offers/Offers";
import AdminDashboard from "./AdminDashboard";
import SalesReport from "./Reports/SalesReport/SalesReport";
import UserReport from "./Reports/UsersReport/UsersReport";
import SubscriptionReport from "./Reports/SubscriptionReport/SubscriptionReport";

const AdminPage = (props) => {
  const { match } = props;

  return (
    <IonPage style={{}}>
      <IonContent ion-padding className="admin-dashboard">
        <Layout title="Admin Dashboard" showHeader={false}>
          <Switch>
            <Route
              exact
              path={routes.adminDashboard}
              component={AdminDashboard}
            />
            <Route exact path={routes.adminSalesReport} component={SalesReport} />
            <Route exact path={routes.adminUserReport} component={UserReport} />
            <Route exact path={routes.adminSubscriptionReport} component={SubscriptionReport} />
            <Route exact path={routes.adminRoles} component={Roles} />
            <Route exact path={routes.adminFeatures} component={Features} />
            <Route
              exact
              path={routes.adminRoleFeatures}
              component={RoleFeatures}
            />

            <Route exact path={routes.manageUsers} component={ManageUsers} />

            <Route
              exact
              path={routes.manageCategories}
              component={Categories}
            />

            <Route path={routes.manageCourses} component={Courses} />

            <Route path={routes.managePrograms} component={Programs} />

            <Route exact path={routes.manageTags} component={Tags} />

            <Route exact path={routes.maangeOffers} component={Offers} />

            {
              <Route
                path={`${routes.adminSettings}/:formName/`}
                render={(props) => {
                  console.log("URL matched", match.url);
                  return (
                    <DynamicInputForm formName={props.match.params.formName} />
                  );
                }}
              />
            }
            {/* <Route 
                  render={() => <Redirect to={`${match.url}/system_settings`} />}
                /> */}
          </Switch>
        </Layout>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;
