import { useEffect, useState } from "react";
import Select from "react-select";
import { Card, Col, Row, Form } from "react-bootstrap";

import { PriceMetadataAPI } from "../../../../services/apis/PriceMetadataAPI";
import LoadingView from "../../../../components/LoadingView";
import { PriceAPI } from "../../../../services/apis/PriceAPI";
import { isOfferActive } from "../../../../utils/helper";

const PricesStep = ({ programContext }) => {
  const [isFree, setIsFree] = useState(false);

  const { programFormData, updateProgramFormData, getPrice } = programContext;
  // const { postOfferPrice=0, offerAmtApplied=0 } = programFormData?.prices;
  const [offerId, setOfferId] = useState(
    getPrice()?.offerId ? getPrice().offerId : -1
  );
  const [basicPrice, setBasicPrice] = useState(programFormData.prices ? programFormData.prices.basicPrice : 0);

  const [loading, setLoading] = useState(programContext.loading);
  const [offersData, setOffersData] = useState([]);
  const [selectedOfferOption, setSelectedOfferOption] = useState();
  //const [postOfferPrice, setPostOfferPrice] = useState(postOfferPriceI);
  //const [offerAmtApplied, setOfferAmntApplied] = useState(offerAmtAppliedI);
  //console.log("programContext",programContext)
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchOfferDetails();     
      console.log("]]]")
      setLoading(false);
    }
    console.log("[[[UseEffect () inital load:")
    fetchData();   
  }, []);

  useEffect(() => {
    console.log(
      "   [[[UseEffect() OfferId,offerAmtApplied",
      offerId,
      offerAmtApplied,
      
    );
    var offerAmtApplied = getOfferSelectedPrice();
    var newOfferPrice = getPostOfferAmount();
    console.log("   --> --> newOfferPrice,offerAmtApplied:", newOfferPrice, offerAmtApplied);
    updateProgramFormData({
      postOfferPrice: newOfferPrice,
      offerAmtApplied: offerAmtApplied,
      offerId: offerId,
    });
    console.log("   ]]]]")
  }, [basicPrice, offerId, selectedOfferOption]);

   useEffect(() => {
    console.log("Recieved offer Data : setting offerId")
     setSelectedOffer(offerId);
   }, [offersData]);

  const getOffer = (offerId) => {
    console.log("   gettingOffer (offerId,offersData)", offerId, offersData);
    var selectedOffer = { id: -1, OfferName: "none" };
    if (offersData.length > 0)
      selectedOffer = offersData.find((offer) => offer.id === offerId);

    console.log("   Offer details", selectedOffer)

    if (!selectedOffer){
      //invalid offer details found. setting to -1   
      return { id: -1, OfferName: "Select an Offer" };
    } 
    else{
      return selectedOffer;
    }
    
  };

  const getOfferLabel = (offerId) => {
    if (offerId === -1) {
      return "Select an Offer";
    }
    return getOffer(offerId)?.offerName;
  };

  const getOfferSelectedPrice = () => {
    var offerSelectedPrice = 0;   
    console.log("Selected ofer option value",selectedOfferOption) 
    if (!selectedOfferOption || selectedOfferOption.value === -1) {
      return offerSelectedPrice;
    }
    const selectedOffer = getOffer(selectedOfferOption.value);
    console.log("Selected offer is",selectedOffer)

    if(selectedOffer){
      if(selectedOffer.id=== -1) {
        return 0;
      }
    }

    if (!selectedOffer) return offerSelectedPrice;
    if (selectedOffer.offerType === "discount") {
      offerSelectedPrice = (selectedOffer.offerPercent * basicPrice) / 100;     
       
    } else {
      offerSelectedPrice = selectedOffer.offerAmount;
    }
    console.log("   Getting offer Selected price",offerSelectedPrice);
    return offerSelectedPrice;
  };

  const getPostOfferAmount = () => {
    var postOfferPrice = Math.max(basicPrice - getOfferSelectedPrice(), 0);
    //setPostOfferPrice(postOfferPrice)  ;
    // console.log("Basicprice:",basicPrice,getOfferSelectedPrice(),postOfferPrice)

    return postOfferPrice;
  };

  const setSelectedOffer = (offerId) => {
    if (offerId > 0) {
      const selectedOffer = getOffer(offerId);
      console.log("Selected offer (offersData,selectedOffer)", offersData, selectedOffer);
      const selectedOtpiton = {
        label: selectedOffer.offerName,
        value: offerId,
      };
      setSelectedOfferOption(selectedOtpiton);
    }
    // else{
    //   const selectedOtpiton = {
    //     label: 'Select an Offer',
    //     value: -1,
    //   };
    //   setSelectedOfferOption(selectedOtpiton);
    // }
  };

  const getOfferOptions = () => {
    const offerOptions = offersData.map((offer) => ({
      value: offer.id,
      label: offer.offerName,
    }));

    return [{ label: "Select an Offer", value: -1 }, ...offerOptions];
  };

  const fetchOfferDetails = async () => {
    try {
      // console.log("********************Fetching offer details....");
      setLoading(true);
      // setError(false);

      const { data: responseData } =
        await PriceMetadataAPI.getAdminOfferDetails();

      if (responseData.status === "SUCCESS") {
        // filter active offers
        const filterdOffers = responseData.data?.offers.filter(isOfferActive);
        setOffersData(filterdOffers);

        console.log("Setting offer option.");
        setSelectedOfferOption({
          label: getOfferLabel(offerId),
          value: offerId,
        });
      } else {
        throw responseData.message;
      }
    } catch (error) {
      // setError(true);
      console.error(
        "PriceStep: fetchOfferDetails: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <LoadingView />;
  }

  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Row className="p-3">
          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formCoursePrice">
              <Form.Label column xs={12} md={3} className="text-md-end">
                Program Price
              </Form.Label>
              <Col xs={12} md={9}>
                <Form.Control
                  type="number"
                  value={basicPrice}
                  onChange={(e) => {
                    setBasicPrice(Number(e.target.value));
                    updateProgramFormData({
                      basicPrice: Number(e.target.value),
                    });
                  }}
                  required
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formOfferSelect">
              <Form.Label column xs={12} md={3} className="text-md-end">
                Offer Type
              </Form.Label>
              <Col xs={12} md={9}>
                <Select
                  options={getOfferOptions()}
                  className="text-start"
                  onChange={(option) => {
                    console.log("Changed offer option")
                    setSelectedOfferOption(option);
                    updateProgramFormData({
                      offerId: Number(option.value),
                    });
                  }}
                  value={selectedOfferOption}
                  name="OfferSelect"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formOfferAmount">
              <Form.Label column xs={12} md={3} className="text-md-end">
                Offer Amount
              </Form.Label>
              <Col xs={12} md={9}>
                <Form.Control
                  type="number"
                  value={getOfferSelectedPrice()}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} className="text-md-end">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPostOfferAmount"
            >
              <Form.Label column xs={12} md={3} className="text-md-end">
                Post Offer Price
              </Form.Label>
              <Col xs={12} md={9}>
                <Form.Control
                  type="number"
                  value={getPostOfferAmount()}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PricesStep;
