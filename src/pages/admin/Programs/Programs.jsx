import { ACTIVE_FILTER_STATES, routes } from "../../../utils/constants";

import { Route, Switch, useHistory } from "react-router";
import AddEditProgram from "./AddEditProgram";
import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import ManagePrograms from "./ManagePrograms";

const Programs = () => {

  const history = useHistory();

  const editProgram = (program) => {
    history.push(`/admin/programs/edit-program/${program.id}`, {
      editedProgram: program,
    });
  };

  // const [editedProgram, setEditedProgram] = useState();
  // const router = useIonRouter();

  // const editProgram = (program) => {
  //   console.log("program",program,program.id)
  //   setEditedProgram(program);
  //   router.push(`/admin/programs/edit-program/${program.id}`);
  // };
  return (
    <Switch>
      <Route exact path={routes.addProgram} component={AddEditProgram} />
      <Route exact path={routes.editProgram} component={AddEditProgram} />   

      <Route
        exact
        path={routes.managePrograms}
        render={(props) => <ManagePrograms editProgram={editProgram} />}
      />
    </Switch>
  );
};

export default Programs;
