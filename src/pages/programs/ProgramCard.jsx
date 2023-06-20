import { Card, Badge } from "react-bootstrap";
import { useIonRouter } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";

import AddToCart from "../../components/AddToCart/AddToCart";
import {
  MAX_DESC_LENGTH,
  MAX_TITLE_LENGTH,
  SubscriptionTypes,
} from "../../utils/constants";
import { SubscriptionContext } from "../../context/SubscriptionContextProvider";
import { useContext } from "react";

const ProgramCard = (props) => {
  const {
    title,
    loading,
    id,
    userId,
    skillTags,
    description,
    handleProgramChange,
    getDifficultyLevelTitle,
    getContentSpecialityTitle,
    getSkillTags,
    contentSpecialityTags,
    courseIds,
    prices,
    bannerUrl = "https://www.techbricksedu.com/assets/frontend/default/img/course_thumbnail_placeholder.jpg",
  } = props;
  const router = useIonRouter();
  const location = useLocation();

  const { showCourseProgramPricing, hideCourseProgramCart } =
    useContext(SubscriptionContext);

  function handleClick() {
    const params = new URLSearchParams(location.search);
    let categoryId = params.get("categoryId");
    let programId = params.get("programId");
    console.log(
      "props of programcard",
      categoryId,
      programId,
      id,
      props.category
    );
    params.set("categoryId", props.category);
    params.set("programId", id);
    router.push({ pathname: "/programs", search: params.toString() });
  }

  if (loading) {
    return (
      <Card className="course-card skeleton-loader">
        <div className="card-skeleton-image"></div>
        <Card.Body>
          <div className="card-skeleton-title"></div>
          <div className="card-skeleton-description"></div>
          <div className="card-skeleton-tags"></div>
        </Card.Body>
      </Card>
    );
  }

  const getOffPercent = () => {
    //  console.log("prices",prices.basicPrice,prices.postOfferPrice)

    var offerPercent = 0;
    if (prices?.basicPrice) {
      offerPercent =
        (
          (prices.basicPrice - prices.postOfferPrice) /
          prices.basicPrice
        ).toFixed(2) * 100;
    }
    return offerPercent + "% Off";
  };

  const renderSkillTags = (skillTags) => {
    var skillTagsTrans = getSkillTags(skillTags);
    console.log(skillTagsTrans);
    return skillTagsTrans.map((itemInfo) => (
      <div className="btn btn-dark-outline rounded px-4 btn-sm">
        {itemInfo.name}
      </div>
    ));
  };

  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? title.slice(0, MAX_TITLE_LENGTH) + "..."
      : title;
  const truncatedDesc =
    description.length > MAX_DESC_LENGTH
      ? description.slice(0, MAX_DESC_LENGTH) + "..."
      : description;

  return (
    <Card className="course-card" onClick={handleClick}>
      <Badge variant="primary" className="card-badge">
        <i className="fas fa-graduation-cap" />
        <span style={{ fontSize: "0.6rem" }}>Program</span>
      </Badge>

      <Card.Body style={{ padding: 15 }}>
        <Card.Img className="card-image" variant="top" src={bannerUrl} />
        {/* <div className="share-block">
          <div>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </div>
          <div className="text-primary">
            <i className="fa fa-eye" aria-hidden="true"></i> {viewCount}
          </div>
          <div>
            <i className="fa fa-share-alt" aria-hidden="true"></i>
          </div>
        </div> */}
        {props.children}
        <Card.Title>{truncatedTitle}</Card.Title>
        <Card.Text>{truncatedDesc}</Card.Text>
      </Card.Body>

      <Card.Footer>
        {showCourseProgramPricing(SubscriptionTypes.program, id) ? (
          <div className="price-block">
            <div>{getOffPercent()}</div>
            <div className="price">
              <span>₹{prices?.basicPrice}</span> ₹ {prices?.postOfferPrice}{" "}
            </div>
            {!hideCourseProgramCart(SubscriptionTypes.program, id) && (
              <AddToCart userId={userId} id={id} type="program" />
            )}
          </div>
        ) : (
          <span> Go To Program </span>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ProgramCard;
