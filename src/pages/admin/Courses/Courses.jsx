import { ACTIVE_FILTER_STATES, routes } from "../../../utils/constants";

import { Route, Switch, useHistory } from "react-router";
import AddEditCourse from "./AddEditCourse";
import ManageCourses from "./ManageCourses";

const Courses = () => {
  const history = useHistory();

  const editCourse = (course) => {
    history.push(`/admin/courses/edit-course/${course.id}`, {
      editedCourse: course,
    });
  };
  return (
    <Switch>
      <Route exact path={routes.addCourse} component={AddEditCourse} />
      <Route exact path={routes.editCourse} component={AddEditCourse} />

      <Route
        exact
        path={routes.manageCourses}
        render={(props) => <ManageCourses editCourse={editCourse} />}
      />
    </Switch>
  );
};

export default Courses;
