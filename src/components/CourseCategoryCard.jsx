import { useIonRouter } from "@ionic/react";

import { getRandomInt } from "../utils/helper";

const CourseCategoryCard = (props) => {
  const { title, content, loading, id, icon } = props;

  const dynamicColors = ["#0058FF", "#FFD402", "#FE5A02", "#00A651", "#ED1D25"];

  const router = useIonRouter();

  function handleClick() {
    router.push(`/courses?categoryId=${id}`);
  }

  const setDynamicBgColor = (event) => {
    // only do for category card
    if (!event.currentTarget.classList.contains("categories-card")) {
      return;
    }

    let randomColor = dynamicColors[getRandomInt(dynamicColors.length)];
    event.currentTarget.style.background = randomColor;
  };

  const removeDynamicBgColor = (event) => {
    if (!event.currentTarget.classList.contains("categories-card")) {
      return;
    }

    event.currentTarget.style.background = "";
  };

  if (loading) {
    return (
      <div
        className="categories-card card1 skeleton-loader"
        onMouseEnter={setDynamicBgColor}
      >
        <div className="icon"></div>
        <div className="title"></div>
        <div className="content">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="categories-card card1"
      onClick={handleClick}
      onMouseEnter={setDynamicBgColor}
      onMouseLeave={removeDynamicBgColor}
    >
      <div className="icon">
        {/* <img src={thumbnailUrl} className="img-fluid" /> */}
        <i className={`${icon} img-fluid category-card-icon`} />
      </div>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  );
};

export default CourseCategoryCard;
