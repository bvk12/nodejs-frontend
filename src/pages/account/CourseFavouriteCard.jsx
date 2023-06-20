import { useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { CourseDataAPI } from "../../services/apis/CourseDataAPI";
import ProfileSettingsIcon from "../../assets/images/profile.svg";
import  DeleteIcon from "../../assets/trash-solid.svg"
import  AddToCartIcon from "../../assets/cart-plus-solid.svg"

import { Card, Col, Container, Figure, Row } from "react-bootstrap";

import "./Favourite.css"
const CourseFavouriteCard = (props) => {
  const {
    id
  } = props;

  const router = useIonRouter();
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState();

  function handleClick() {
    router.push(`/course/${id}`);
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here   
      setLoading(true);
      var courseData = await CourseDataAPI.getCourseDetails(id);
      if (courseData.status === 200) {
        var courseInfo = courseData.data.data.course;
        var requiredCourseData = {
          title: courseInfo.title,
          shortDescription: courseInfo.shortDescription,
          id: courseInfo.id,
          thumbnailUrl: courseInfo.thumbnailUrl
        }
        setLoading(false);
        console.log("Recieved the course data for favorites:")
        setCourseInfo(requiredCourseData)
      } else {
        console.error("Error while fetching course detail.");
      }
    }
    fetchData();
  }, [])


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


  return (
    <Card className="course-card" onClick={handleClick}>
      <Card.Body>      
      <Card.Img className="card-image" variant="top" src={courseInfo.thumbnailUrl}/>
        <Card.Title>{courseInfo?.title}</Card.Title>
        <Card.Text>{courseInfo?.shortDescription}</Card.Text>
        { 
          <div className="price-block p-2">
        <button className="btn btn-secondry">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
         
        </div> 
        }        
      </Card.Body>
    </Card>
  );
};

export default CourseFavouriteCard;
