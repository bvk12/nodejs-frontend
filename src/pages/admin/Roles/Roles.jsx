import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { ACTIVE_FILTER_STATES } from "../../../utils/constants";
import AddRolePopover from "./AddRolePopover";
import EditRolePopover from "./EditRolePopover";
import Block from "../../../components/Block/Block";
import LoadingView from "../../../components/LoadingView";
import useRoles from "../../../hooks/useAdminRoles";
import { Icon } from "../../../components";
import DataTableComponent from "../../../components/DataTable/DataTable";

const Roles = () => {
  const {
    loading,
    filteredData,
    editRole,
    activeFilter,
    setActiveFilter,
    showAddRolePopover,
    setShowAddRolePopover,
    showEditRolePopover,
    setShowEditRolePopover,
    createRole,
    editRoleData,
    setEditRoleData,
  } = useRoles();

  if (loading || !filteredData) {
    return <LoadingView />;
  }

  const roleColumns = [
    // {
    //   name: "Role Name",
    //   selector: (row) => row.roleName,
    //   cell: (row) => <span>{row.roleName}</span>,
    //   sortable: true,
    // },
    {
      name: "Display Name",
      selector: (row) => row.displayName,
      cell: (row) => <span>{row.displayName}</span>,
      sortable: true,
    },
    {
      name: "Role Description",
      selector: (row) => row.description,
      cell: (row) => <span>{row.description}</span>,
      sortable: true,
      hide: "md",
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
      cell: (row) => (
        <div className="admin-header-edit-button">
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowEditRolePopover(true);
              setEditRoleData(row);
            }}
          >
            <i className="fas fa-pencil-alt"> </i>
          </Button>
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
            <Block.Title tag="h2">Roles</Block.Title>
          </Block.HeadContent>
          <Block.HeadContent>
            <ul className="d-flex admin-table-header">
              <li>
                <DropdownButton
                  as={ButtonGroup}
                  title={activeFilter}
                  className="me-4"
                >
                  {Object.values(ACTIVE_FILTER_STATES).map((filterState) => (
                    <Dropdown.Item
                      eventKey={filterState}
                      onClick={() => {
                        setActiveFilter(filterState);
                      }}
                      key={filterState}
                    >
                      {filterState}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </li>

              <li>
                <Button
                  variant="primary"
                  onClick={() => setShowAddRolePopover(true)}
                >
                  <Icon name="plus" />
                  <span>Add Role</span>
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
            columns={roleColumns}
            searchFields={["roleName", "displayName", "description"]}
          />
        </Card>
      </Block>

      {showAddRolePopover && (
        <AddRolePopover
          show={showAddRolePopover}
          closePopover={() => setShowAddRolePopover(false)}
          createRole={createRole}
        />
      )}

      {showEditRolePopover && (
        <EditRolePopover
          show={showEditRolePopover}
          closePopover={() => setShowEditRolePopover(false)}
          editRole={editRole}
          editRoleData={editRoleData}
        />
      )}
    </>
  );
};

export default Roles;
