import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormCheck,
  Row,
  Stack,
  Table,
} from "react-bootstrap";

import { Block } from "../../components";
import DataTableComponent from "../../components/DataTable/DataTable";
import LoadingView from "../../components/LoadingView";
import useRoleFeatures from "../../hooks/useRoleFeatures";

const RoleFeatures = () => {
  const {
    loading,
    roleData,
    featureData,
    selectedRoleCode,
    setSelectedRoleCode,
    permissionTypes,
    isPermissionPresent,
    updatePermission,
    isAllPermissionPresent = () => {},
    updateAllPermission = () => {},
  } = useRoleFeatures();

  if (loading) {
    return <LoadingView />;
  }

  const permissionColumns = [
    {
      name: "",
      selector: (row) => row.displayName,
      cell: (row) => <span>{row.displayName}</span>,
      sortable: true,
      width: "150px",
    },
    {
      name: "All",
      cell: (feature) => {
        const checked = isAllPermissionPresent(feature.featureCode);

        return (
          <span>
            <FormCheck
              type={"checkbox"}
              checked={checked}
              onClick={(e) => {
                updateAllPermission(feature.featureCode, e.target.checked);
              }}
            />
          </span>
        );
      },
    },
    ...permissionTypes?.map((permission) => ({
      name: permission,
      cell: (feature) => {
        const checked = isAllPermissionPresent(feature.featureCode);

        return (
          <span>
            <FormCheck type={"checkbox"} disabled={true} checked={checked} />
          </span>
        );
      },
    })),
  ];

  return (
    <>
      <Block.Head>
        <Block.HeadBetween>
          <Block.HeadContent>
            <Block.Title tag="h2">Roles & Permissions</Block.Title>
          </Block.HeadContent>
        </Block.HeadBetween>
      </Block.Head>

      <Block>
        <Card className="mb-3">
          <Card.Body>
            <div className="d-flex align-items-center">
              <span className="text me-4">Role</span>
              <select
                className="form-select"
                onChange={(event) => {
                  const { selectedIndex } = event.target;
                  setSelectedRoleCode(roleData[selectedIndex].roleCode);
                }}
              >
                {roleData.map((roleRow) => (
                  <option key={roleRow.roleCode}>{roleRow.displayName}</option>
                ))}
              </select>
            </div>
          </Card.Body>
        </Card>
      </Block>

      <Block>
        <Card>
          <DataTableComponent
            tableClassName="data-table-head-light table-responsive"
            data={featureData}
            columns={permissionColumns}
            searchFields={["displayName"]}
          />
        </Card>
      </Block>
    </>
  );
};

export default RoleFeatures;
