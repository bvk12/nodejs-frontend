import { Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CourseDataAPI } from "../../services/apis/CourseDataAPI";
import Block from "../../components/Block/Block";
import CourseFavouriteCard from "./CourseFavouriteCard"
const UserFavourites = () => {

  const [favData, setFavData] = useState([])

  useEffect(() => {
    async function fetchData() {
      // You can await here   
      var apiResponse = await CourseDataAPI.getCoursesProgress();
      setFavData(apiResponse?.data?.data.progress)
    }
    fetchData();
  }, []);


  const renderCourseCards = () => {
    return favData.map((courseInfo) => {
      console.log("CoursePrg:", courseInfo);     
      return <Col key={courseInfo.id} md={5} sm={6}>
         <CourseFavouriteCard id={courseInfo.courseId}></CourseFavouriteCard>
      </Col>
    }
    );
  };

  return (
    <>
      <Block>
        <Card className="m-2 p-1">
          <Card.Body>
            <Card.Title>My Favourites</Card.Title>
            <Row className="m-2 p-1 card-listing-container">
              {renderCourseCards()}
            </Row>
          </Card.Body>
        </Card>
      </Block>


    </>
  );
};

export default UserFavourites;
