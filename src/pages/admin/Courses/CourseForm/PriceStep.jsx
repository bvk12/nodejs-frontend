import { useEffect, useState } from "react";
import Select from "react-select";
import { Card, Col, Row, Form } from "react-bootstrap";

import { PriceMetadataAPI } from "../../../../services/apis/PriceMetadataAPI";
import LoadingView from "../../../../components/LoadingView";
import { isCourseFree, isOfferActive } from "../../../../utils/helper";

const PricesStep = ({ courseContext }) => {
  // const [isFree, setIsFree] = useState(false);

  const { priceData, setPriceData, priceLoading, courseFormData } =
    courseContext;

  const { contentSpecialityTags = [] } = courseFormData;

  const {
    basicPrice,
    offerId = -1,
    offerAmtApplied,
    postOfferPrice,
  } = priceData;

  const [loading, setLoading] = useState(true);
  const [offersData, setOffersData] = useState();
  const [selectedOfferOption, setSelectedOfferOption] = useState();

  const isFreeCourse = isCourseFree(contentSpecialityTags);

  useEffect(() => {
    if (!offersData) {
      return;
    }

    setSelectedOfferOption({
      label: getOfferLabel(offerId),
      value: offerId,
    });
  }, [offersData]);

  useEffect(() => {
    if (isFreeCourse) return;

    fetchOfferDetails();
  }, [isFreeCourse]);

  // update post offer price and new offer amt when ever basic price/offer amt is changed
  useEffect(() => {
    const newOfferAmt = getOfferSelectedPrice();
    const newPostOfferPrice = getPostOfferAmount();

    setPriceData({
      ...priceData,
      offerAmtApplied: newOfferAmt,
      postOfferPrice: newPostOfferPrice,
    });
  }, [priceData.basicPrice, priceData.offerId]);

  const getOffer = (offerId) => {
    const selectedOffer = offersData.find((offer) => offer.id === offerId);

    return selectedOffer;
  };

  const getOfferLabel = (offerId) => {
    if (offerId === -1) {
      return "Select an Offer";
    }

    return getOffer(offerId)?.offerName;
  };

  const getOfferSelectedPrice = () => {
    if (!selectedOfferOption || selectedOfferOption.value === -1) {
      return 0;
    }

    const selectedOffer = getOffer(selectedOfferOption.value);

    if (!selectedOffer) return 0;

    if (selectedOffer.offerType === "discount") {
      return (selectedOffer.offerPercent * basicPrice) / 100;
    } else {
      return selectedOffer.offerAmount;
    }
  };

  const getPostOfferAmount = () => {
    return Math.max(basicPrice - getOfferSelectedPrice(), 0);
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
      setLoading(true);
      // setError(false);

      const { data: responseData } =
        await PriceMetadataAPI.getAdminOfferDetails();

      if (responseData.status === "SUCCESS") {
        const filterdOffers = responseData.data?.offers.filter(isOfferActive);
        setOffersData(filterdOffers);
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

  if (isFreeCourse) return <></>;

  if (loading || priceLoading) {
    return <LoadingView />;
  }

  return (
    <Card className="border-0 mb-4">
      <Card.Body>
        <Row className="p-3">
          {/* check how to handle on backend, see if this is really needed */}
          {/* <Col xs={12} md={12} className="text-md-end">
            <Form.Group as={Row} className="mb-3" controlId="formFreeCourse">
              <Form.Check
                onChange={(e) =>
                  updateCourseFormData({
                    priceStatusTag: e.target.checked ? "Free" : "Paid",
                  })
                }
                checked={basicPrice === 0}
                type="checkbox"
                label="Check if this is a free course"
              />
            </Form.Group>
          </Col> */}

          {
            <>
              <Col xs={12} md={12} className="text-md-end">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formCoursePrice"
                >
                  <Form.Label column xs={12} md={2} className="text-md-end">
                    Course Price
                  </Form.Label>
                  <Col xs={12} md={10}>
                    <Form.Control
                      type="number"
                      value={basicPrice}
                      onChange={(e) =>
                        setPriceData({
                          ...priceData,
                          basicPrice: Number(e.target.value),
                        })
                      }
                      required
                      min="1"
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={12} md={12} className="text-md-end">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formOfferSelect"
                >
                  <Form.Label column xs={12} md={2} className="text-md-end">
                    Offer Type
                  </Form.Label>
                  <Col xs={12} md={10}>
                    <Select
                      options={getOfferOptions()}
                      className="text-start"
                      onChange={(option) => {
                        setSelectedOfferOption(option);

                        setPriceData({
                          ...priceData,
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
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formOfferAmount"
                >
                  <Form.Label column xs={12} md={2} className="text-md-end">
                    Offer Amount
                  </Form.Label>
                  <Col xs={12} md={10}>
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
                  <Form.Label column xs={12} md={2} className="text-md-end">
                    Post Offer Price
                  </Form.Label>
                  <Col xs={12} md={10}>
                    <Form.Control
                      type="number"
                      value={getPostOfferAmount()}
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Col>
            </>
          }
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PricesStep;
