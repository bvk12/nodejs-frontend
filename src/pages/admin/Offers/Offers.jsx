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
import AddEditOffer from "./AddEditOffers";
import { ACTIVE_FILTER_STATES } from "../../../utils/constants";
import useOffers from "../../../hooks/useOffers";
import { isOfferActive } from "../../../utils/helper";

const Offers = () => {
  const {
    loading,
    filteredData,
    setselectedType,
    selectedType,
    setShowAddModal,
    setShowEditModal,
    showAddModal,
    showEditModal,
    offer,
    setOffer,
    createOffer,
    getOfferTypeOptions,
    updateOffer,
    activeFilter,
    setActiveFilter,
    deleteOffer,
  } = useOffers();

  const router = useIonRouter();

  if (loading || !filteredData) {
    return <LoadingView />;
  }

  const offerColumns = [
    {
      name: "Name",
      selector: (offer) => offer.offerName,
      cell: (offer) => <span>{offer.offerName}</span>,
      sortable: true,
    },
    {
      name: "Code",
      selector: (offer) => offer.offerCode,
      cell: (offer) => <span>{offer.offerCode}</span>,
      sortable: true,
    },
    {
      name: "Percent",
      selector: (offer) => offer.offerPercent,
      cell: (offer) => (
        <span>
          {offer.offerPercent && offer.offerType === "discount"
            ? offer.offerPercent
            : "-"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (offer) => offer.offerAmount,
      cell: (offer) => (
        <span>
          {offer.offerAmount && offer.offerType === "offer"
            ? offer.offerAmount
            : "-"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Type",
      selector: (offer) => offer.offerType,
      cell: (offer) => <span>{offer.offerType}</span>,
      sortable: true,
    },

    {
      name: "Status",
      selector: (offer) => isOfferActive(offer),
      cell: (offer) => <span>{isOfferActive(offer) ? "True" : "False"}</span>,
      sortable: true,
      hide: "md",
    },

    {
      name: "action",
      cell: (offer) => (
        <div className=" admin-header-edit-button">
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowEditModal(true);
              setOffer(offer);
            }}
          >
            <i className="fas fa-pencil-alt"> </i>
          </Button>

          {isOfferActive(offer) && (
            <Button
              variant="outline-secondary"
              onClick={() => deleteOffer(offer)}
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
      {(showAddModal || showEditModal) && (
        <AddEditOffer
          showAddModal={showAddModal}
          showEditModal={showEditModal}
          offer={offer}
          setOffer={setOffer}
          setShowAddModal={setShowAddModal}
          setShowEditModal={setShowEditModal}
          createOffer={createOffer}
          updateOffer={updateOffer}
          getOfferTypeOptions={getOfferTypeOptions}
        />
      )}

      <Block.Head>
        <Block.HeadBetween>
          <Block.HeadContent>
            <Block.Title tag="h2">Offers</Block.Title>
          </Block.HeadContent>
          <Block.HeadContent>
            <ul className="d-flex admin-table-header">
              <li>
                <Select
                  options={[
                    { label: "All", value: "All" },
                    ...getOfferTypeOptions(),
                  ]}
                  className="text-start"
                  value={{ label: selectedType, value: selectedType }}
                  onChange={(newOption) => setselectedType(newOption.value)}
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
                    setOffer({});
                    setShowAddModal(true);
                  }}
                >
                  <Icon name="plus" />
                  <span>Add Offer</span>
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
            columns={offerColumns}
            searchFields={["offerType", "offerName", "offerCode"]}
          />
        </Card>
      </Block>
    </>
  );
};

export default Offers;
