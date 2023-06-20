import { useIonRouter } from "@ionic/react";
import { useContext } from "react";
import { Badge, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContextProvider";
import {
  MAX_DESC_LENGTH,
  MAX_TITLE_LENGTH,
  SubscriptionTypes,
} from "../utils/constants";
import AddToCart from "./AddToCart/AddToCart";
import { SubscriptionContext } from "../context/SubscriptionContextProvider";
import { isCourseFree } from "../utils/helper";

const CourseCard = (props) => {
  const {
    title,
    content,
    loading,
    id,
    category,
    levelTag,
    shortDescription,
    contentSpecialityTags,
    viewCount = 200,
    thumbnailUrl,
    getDifficultyLevelTitle,
    getContentSpecialityTitle,
    progress,
    prices = {},
  } = props;

  const { basicPrice = 1, offerAmtApplied = 1, postOfferPrice = 0 } = prices;
  const { user } = useContext(AuthContext);
  const router = useIonRouter();

  const isFreeCourse = isCourseFree(contentSpecialityTags);

  const { showCourseProgramPricing, hideCourseProgramCart } =
    useContext(SubscriptionContext);

  function handleClick() {
    router.push(`/course/${id}`);
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

  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? title.slice(0, MAX_TITLE_LENGTH) + "..."
      : title;
  const truncatedDesc =
    shortDescription.length > MAX_DESC_LENGTH
      ? shortDescription.slice(0, MAX_DESC_LENGTH) + "..."
      : shortDescription;

  return (
    <Card className="course-card" onClick={handleClick}>
      <Badge variant="primary" className="card-badge">
        <i className="fas fa-book" />
        <span style={{ fontSize: "0.6rem" }}>Course</span>
      </Badge>

      <Card.Body style={{ padding: 15 }}>
        {thumbnailUrl && (
          <Card.Img className="card-image" variant="top" src={thumbnailUrl} />
        )}
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
        {isFreeCourse ? (
          <span> Free Course </span>
        ) : showCourseProgramPricing(SubscriptionTypes.course, id) ? (
          <div className="price-block">
            <div>{Math.round((offerAmtApplied / basicPrice) * 100)}% Off</div>
            <div className="price">
              <span>{`₹${basicPrice}`}</span> {`₹${postOfferPrice} `}
            </div>
            {!hideCourseProgramCart(SubscriptionTypes.course, id) && (
              <AddToCart id={id} userId={user?.userId} type="course" />
            )}
          </div>
        ) : (
          <span> Go To Course </span>
        )}
      </Card.Footer>

      {/* <Card.Footer className="bg-transparent d-flex justify-content-between">
        <div className="btn btn-primary rounded px-4 btn-sm">
          {getContentSpecialityTitle &&
            getContentSpecialityTitle(contentSpecialityTags[0])}
        </div>
        <div className="btn btn-dark-outline rounded px-4 btn-sm">
          {getDifficultyLevelTitle && getDifficultyLevelTitle(levelTag)}
        </div>
      </Card.Footer> */}
    </Card>
  );
};

export default CourseCard;
