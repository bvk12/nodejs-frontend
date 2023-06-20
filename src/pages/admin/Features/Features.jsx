import LoadingView from "../../../components/LoadingView";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
  Stack,
  Table,
} from "react-bootstrap";
import { ACTIVE_FILTER_STATES } from "../../../utils/constants";
import AddFeaturePopover from "./AddFeaturePopover";
import EditFeaturePopover from "./EditFeaturePopover";
import useFeatures from "../../../hooks/useAdminFeatures";

import Block from "../../../components/Block/Block";
import DataTableComponent from "../../../components/DataTable/DataTable";
import { Icon } from "../../../components";

const Features = () => {
  const {
    loading,
    filteredData,
    editFeature,
    activeFilter,
    setActiveFilter,
    showAddFeaturePopover,
    setshowAddFeaturePopover,
    showEditFeaturePopover,
    setshowEditFeaturePopover,
    createFeature,
    editFeatureData,
    seteditFeatureData,
  } = useFeatures();

  if (loading || !filteredData) {
    return <LoadingView />;
  }

  const featureColumns = [
    // {
    //   name: "Feature Name",
    //   selector: (row) => row.featureName,
    //   cell: (row) => <span>{row.featureName}</span>,
    //   sortable: true,
    // },
    {
      name: "Display Name",
      selector: (row) => row.displayName,
      cell: (row) => <span>{row.displayName}</span>,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.isActive,
      cell: (row) => <span>{row.isActive ? "True" : "False"}</span>,
      sortable: true,
      hide: "md",
    },
    // {
    //   name: "Feature Description",
    //   selector: (row) => row.description,
    //   cell: (row) => <span>{row.description}</span>,
    //   sortable: true,
    //   hide: "md",
    // },
    {
      name: "action",
      cell: (row) => (
        <div className="admin-header-edit-button">
          <Button
            variant="outline-secondary"
            onClick={() => {
              setshowEditFeaturePopover(true);
              seteditFeatureData(row);
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
            <Block.Title tag="h2">Features</Block.Title>
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
                  onClick={() => setshowAddFeaturePopover(true)}
                >
                  <Icon name="plus" />
                  <span>Add Feature</span>
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
            columns={featureColumns}
            searchFields={["featureName", "displayName", "description"]}
          />
        </Card>
      </Block>

      {showAddFeaturePopover && (
        <AddFeaturePopover
          show={showAddFeaturePopover}
          closePopover={() => setshowAddFeaturePopover(false)}
          createFeature={createFeature}
        />
      )}

      {showEditFeaturePopover && (
        <EditFeaturePopover
          show={showEditFeaturePopover}
          closePopover={() => setshowEditFeaturePopover(false)}
          updateFeature={editFeature}
          editFeatureData={editFeatureData}
        />
      )}
    </>
  );
};

export default Features;
