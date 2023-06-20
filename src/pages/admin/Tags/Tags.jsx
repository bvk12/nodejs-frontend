import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Select from "react-select";

import Block from "../../../components/Block/Block";
import LoadingView from "../../../components/LoadingView";
import { Icon } from "../../../components";
import DataTableComponent from "../../../components/DataTable/DataTable";
import { useIonRouter } from "@ionic/react";
import useTags from "../../../hooks/useTags";
import AddEditTag from "./AddEditTag";
import { ACTIVE_FILTER_STATES } from "../../../utils/constants";

const Tags = () => {
  const {
    loading,
    filteredData,
    setSelectedTagType,
    selectedTagType,
    setShowAddModal,
    setShowEditModal,
    showAddModal,
    showEditModal,
    tag,
    setTag,
    createTag,
    getTagTypeOptions,
    updateTag,
    activeFilter,
    setActiveFilter,
    deleteTag,
  } = useTags();

  const router = useIonRouter();

  if (loading || !filteredData) {
    return <LoadingView />;
  }

  const tagColumns = [
    {
      name: "Name",
      selector: (tag) => tag.name,
      cell: (tag) => <span>{tag.name}</span>,
      sortable: true,
    },
    {
      name: "Type",
      selector: (tag) => tag.type,
      cell: (tag) => <span>{tag.type}</span>,
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
      cell: (tag) => (
        <div className="admin-header-edit-button">
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowEditModal(true);
              setTag(tag);
            }}
          >
            <i className="fas fa-pencil-alt"> </i>
          </Button>

          {tag.isActive && (
            <Button variant="outline-secondary" onClick={() => deleteTag(tag)}>
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
      {(showAddModal || showEditModal) && (
        <AddEditTag
          showAddModal={showAddModal}
          showEditModal={showEditModal}
          tag={tag}
          setTag={setTag}
          setShowAddModal={setShowAddModal}
          setShowEditModal={setShowEditModal}
          createTag={createTag}
          updateTag={updateTag}
          getTagTypeOptions={getTagTypeOptions}
        />
      )}

      <Block.Head>
        <Block.HeadBetween>
          <Block.HeadContent>
            <Block.Title tag="h2">Tags</Block.Title>
          </Block.HeadContent>
          <Block.HeadContent>
            <ul className="d-flex admin-table-header">
              <li>
                <Select
                  options={[
                    { label: "All", value: "All" },
                    ...getTagTypeOptions(),
                  ]}
                  className="text-start"
                  value={{ label: selectedTagType, value: selectedTagType }}
                  onChange={(newOption) => setSelectedTagType(newOption.value)}
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
                    setTag({});
                    setShowAddModal(true);
                  }}
                >
                  <Icon name="plus" />
                  <span>Add Tag</span>
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
            columns={tagColumns}
            searchFields={["type", "name"]}
          />
        </Card>
      </Block>
    </>
  );
};

export default Tags;
