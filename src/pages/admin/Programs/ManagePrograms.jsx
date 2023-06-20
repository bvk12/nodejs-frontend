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
import AddEditProgram from "./AddEditProgram";
import { useIonRouter } from "@ionic/react";
import useManagePrograms from "../../../hooks/useManagePrograms";

const ManagePrograms = ({ editProgram }) => {
  const {
    loading,
    filteredData,
    activeFilter,
    setActiveFilter,
    getCategoryOptions,
    setSelectedCategory,
    selectedCategory,
    deleteProgram,
    getCategoryTitle,
  } = useManagePrograms();

  const router = useIonRouter();

  if (loading || !filteredData) {
    return <LoadingView />;
  }

  const programColumns = [
    {
      name: "Title",
      selector: (program) => program.title,
      cell: (program) => <span>{program.title}</span>,
      sortable: true,
    },
    {
      name: "Category",
      selector: (program) => program.category,
      cell: (program) => <span>{getCategoryTitle(program.category)}</span>,
      sortable: true,
    },
    {
      name: "Display Order ",
      selector: (program) => program.orderBy,
      cell: (program) => <span>{program.orderBy}</span>,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.isActive,
      cell: (row) => <span>{row.isActive ? "True" : "False"}</span>,
      sortable: true,
      hide: "md",
    },

    {
      name: "action",
      cell: (program) => (
        <div className="admin-header-edit-button">
          <Button
            variant="outline-secondary"
            onClick={() => {
             // console.log("Editing program:",program)
              editProgram(program);
            }}
          >
            <i className="fas fa-pencil-alt"> </i>
          </Button>
          {program.isActive && (
            <Button
              variant="outline-secondary"
              onClick={() => {
                // console.log("deleting program:",program)
                 deleteProgram(program) }}
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
            <Block.Title tag="h2">Programs</Block.Title>
          </Block.HeadContent>
          <Block.HeadContent>
            <ul className="d-flex admin-table-header">
              <li style={{ minWidth: "200px" }}>
                <Select
                  options={getCategoryOptions()}
                  className="text-start"
                  value={{
                    label: selectedCategory.label,
                    value: selectedCategory.value,
                  }}
                  onChange={(newOption) => setSelectedCategory(newOption)}
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
                    router.push(routes.addProgram);
                  }}
                >
                  <Icon name="plus" />
                  <span>Add Program</span>
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
            columns={programColumns}
            searchFields={["title"]}
          />
        </Card>
      </Block>
    </>
  );
};

export default ManagePrograms;
