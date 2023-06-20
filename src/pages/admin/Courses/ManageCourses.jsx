import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Select from "react-select";

import { ACTIVE_FILTER_STATES, routes } from "../../../utils/constants";
import Block from "../../../components/Block/Block";
import LoadingView from "../../../components/LoadingView";
import { Icon } from "../../../components";
import DataTableComponent from "../../../components/DataTable/DataTable";
import { Route, Switch } from "react-router";
import AddEditCourse from "./AddEditCourse";
import { useIonRouter } from "@ionic/react";
import useManageCourses from "../../../hooks/useManageCourses";

const ManageCourses = ({ editCourse }) => {
  const {
    loading,
    filteredData,
    activeFilter,
    setActiveFilter,
    getCategoryOptions,
    setSelectedCategory,
    selectedCategory,
    deleteCourse,
    getCategoryTitle,
  } = useManageCourses();

  const router = useIonRouter();

  if (loading || !filteredData) {
    return <LoadingView />;
  }

  const courseColumns = [
    {
      name: "Title",
      selector: (course) => course.title,
      cell: (course) => <span>{course.title}</span>,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (course) => course.category,
      cell: (course) => <span>{getCategoryTitle(course.category)}</span>,
      sortable: true,
    },
    {
      name: "Lesson Count",
      selector: (course) => course.totalChaptersCount,
      cell: (course) => <span>{course.totalChaptersCount}</span>,
      sortable: false,
      hide: "md",
    },
    {
      name: "Status",
      selector: (course) => course.isActive,
      cell: (course) => <span>{course.isActive ? "True" : "False"}</span>,
      sortable: true,
      hide: "md",
    },

    {
      name: "action",
      cell: (course) => (
        <div className="admin-header-edit-button">
          <Button
            variant="outline-secondary"
            onClick={() => editCourse(course)}
          >
            <i className="fas fa-pencil-alt"> </i>
          </Button>
          {course.isActive && (
            <Button
              variant="outline-secondary"
              onClick={() => deleteCourse(course)}
            >
              <i className="fas fa-trash-alt"> </i>
            </Button>
          )}
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <>
      <Block.Head>
        <Block.HeadBetween>
          <Block.HeadContent>
            <Block.Title tag="h2">Courses</Block.Title>
          </Block.HeadContent>
          <Block.HeadContent>
            <ul className="d-flex admin-table-header">
              <li>
                <Select
                  options={getCategoryOptions()}
                  className="text-start"
                  value={{
                    label: getCategoryTitle(selectedCategory),
                    value: selectedCategory,
                  }}
                  onChange={(newOption) => setSelectedCategory(newOption.value)}
                />
              </li>

              <li>
                <Select
                  options={Object.values(ACTIVE_FILTER_STATES).map(
                    (filterState) => ({
                      label: filterState,
                      value: filterState,
                    })
                  )}
                  className="text-start"
                  value={{ label: activeFilter, value: activeFilter }}
                  onChange={(newOption) => setActiveFilter(newOption.value)}
                />
              </li>

              <li>
                <Button
                  variant="primary"
                  onClick={() => {
                    router.push(routes.addCourse);
                  }}
                >
                  <Icon name="plus" />
                  <span>Add Course</span>
                </Button>
              </li>
            </ul>
          </Block.HeadContent>
        </Block.HeadBetween>
      </Block.Head>
      <Block>
        <Card>
          <DataTableComponent
            tableClassName="data-table-head-light table-responsive"
            data={filteredData}
            columns={courseColumns}
            searchFields={["title"]}
          />
        </Card>
      </Block>
    </>
  );
};

export default ManageCourses;
