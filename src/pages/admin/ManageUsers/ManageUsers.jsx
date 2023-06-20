import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { ACTIVE_FILTER_STATES } from "../../../utils/constants";
import Block from "../../../components/Block/Block";
import LoadingView from "../../../components/LoadingView";
import useRoles from "../../../hooks/useAdminRoles";
import { Icon, Image, Media, MediaGroup, MediaText } from "../../../components";
import DataTableComponent from "../../../components/DataTable/DataTable";
import { filter } from "ionicons/icons";
import useManageUsers from "../../../hooks/useManageUsers";
import { toInitials } from "../../../utilities";
import AddUserPopover from "./AddUserPopover";
import EditUserPopover from "./EditUserPopover";

const ManageUsers = () => {
  const {
    loading,
    filteredData,
    setSelectedRoleCode,
    setActiveFilter,
    roleData,
    showAddUserPopover,
    setShowAddUserPopover,
    showEditUserPopover,
    setShowEditUserPopover,
    editUserData,
    setEditUserData,
    createUser,
    editUser,
    getRoleNameForRoleCode,
    isUserEmailPresent,
    errorText,
    setErrorText,
    getLowerRoleData,
    showEditForRoleCode,
  } = useManageUsers();

  if (loading || !filteredData) {
    return <LoadingView />;
  }

  const userColumns = [
    {
      name: "Users",
      grow: 2,
      selector: (row) => row.firstName,
      cell: (row) => (
        <MediaGroup>
          <Media size="md" shape="circle">
            {row.profileImage ? (
              <Image src={row.profileImage} staticImage />
            ) : (
              <span className="smaller fw-medium">
                {toInitials(`${row.firstName} ${row.lastName}`)}
              </span>
            )}
          </Media>
          <MediaText>
            <span className="title">{`${row.firstName} ${row.lastName}`}</span>
            <span className="small text">{row.email}</span>
          </MediaText>
        </MediaGroup>
      ),
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      cell: (row) => <span>{row.mobile}</span>,
      sortable: true,
      hide: "md",
    },
    {
      name: "Role Name",
      cell: (row) => <span>{getRoleNameForRoleCode(row.roleCode)}</span>,
      sortable: false,
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
      name: "TimeStamp",
      selector: (row) => row.createdAt,
      cell: (row) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {new Date(row.createdAt).toLocaleString()}
        </span>
      ),
      sortable: true,
      hide: "md",
    },
    {
      name: "action",
      cell: (row) => {
        if (showEditForRoleCode(row.roleCode)) {
          return (
            <div className="admin-header-edit-button">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setErrorText("");
                  setShowEditUserPopover(true);
                  setEditUserData(row);
                }}
              >
                <i className="fas fa-pencil-alt"> </i>
              </Button>
            </div>
          );
        } else {
          return <></>;
        }
      },
      sortable: false,
    },
  ];

  return (
    <>
      <Block.Head>
        <Block.HeadBetween>
          <Block.HeadContent>
            <Block.Title tag="h2">All Users</Block.Title>
          </Block.HeadContent>
          <Block.HeadContent>
            <ul className="d-flex admin-table-header">
              <li>
                <div className="data-table-select">
                  <select
                    className="form-select"
                    onChange={(event) => {
                      const { selectedIndex } = event.target;

                      if (selectedIndex === 0) {
                        setSelectedRoleCode("All");
                        return;
                      }

                      setSelectedRoleCode(roleData[selectedIndex - 1].roleCode);
                    }}
                  >
                    <option key={"All"}>All</option>

                    {roleData.map((roleRow) => (
                      <option key={roleRow.roleCode}>
                        {roleRow.displayName}
                      </option>
                    ))}
                  </select>
                </div>
              </li>

              <li>
                <div className="data-table-select">
                  <select
                    className="form-select"
                    onChange={(event) => {
                      setActiveFilter(event.target.value);
                    }}
                  >
                    {Object.values(ACTIVE_FILTER_STATES).map((filterState) => (
                      <option key={filterState}>{filterState}</option>
                    ))}
                  </select>
                </div>
              </li>

              <li>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowAddUserPopover(true);
                    setErrorText("");
                  }}
                >
                  <Icon name="plus" />
                  <span>Add User</span>
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
            columns={userColumns}
            searchFields={["firstName", "lastName", "email", "mobile"]}
          />
        </Card>
      </Block>

      {showAddUserPopover && (
        <AddUserPopover
          show={showAddUserPopover}
          closePopover={() => setShowAddUserPopover(false)}
          createUser={createUser}
          roleData={roleData}
          isUserEmailPresent={isUserEmailPresent}
          errorText={errorText}
          getLowerRoleData={getLowerRoleData}
        />
      )}

      {showEditUserPopover && (
        <EditUserPopover
          show={showEditUserPopover}
          closePopover={() => setShowEditUserPopover(false)}
          editUser={editUser}
          editUserData={editUserData}
          roleData={roleData}
          isUserEmailPresent={isUserEmailPresent}
          errorText={errorText}
          getLowerRoleData={getLowerRoleData}
        />
      )}
    </>
  );
};

export default ManageUsers;
