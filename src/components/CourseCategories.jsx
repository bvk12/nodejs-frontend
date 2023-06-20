import { useIonRouter } from "@ionic/react";
import { Col, Container, Row } from "react-bootstrap";
import useCourseCategories from "../hooks/useCourseCategories";
import CourseCategoryCard from "./CourseCategoryCard";

const CourseCategories = () => {
  const router = useIonRouter();
  const { loading, courseCategories, error } = useCourseCategories();

  const renderLoading = () => {
    return new Array(4).fill(0).map((_, index) => (
      <Col sm={6} md={4} lg={3} key={`category-loader-${index}`}>
        <CourseCategoryCard loading={true} />
      </Col>
    ));
  };

  const renderCategoryCards = () => {
    return courseCategories.map((catgeoryInfo) => (
      <Col sm={6} md={4} lg={3} key={catgeoryInfo.id}>
        <CourseCategoryCard {...catgeoryInfo} />
      </Col>
    ));
  };

  function handleClick(e) {
    e.preventDefault();

    router.push(`/courses`);
  }

  return (
    <section className="course-categories">
      <Container className="cards-container">
        <Row className="align-items-center mb-30">
          <Col md={9}>
            <div className="main-title text-left">Course Categories</div>
          </Col>
          <Col md={3} className="text-right">
            <a
              href="#"
              onClick={handleClick}
              className="btn btn-primary pull-right px-5"
            >
              See All Courses
            </a>
          </Col>
        </Row>

        <Row className="card-listing-container">
          {loading ? renderLoading() : renderCategoryCards()}
        </Row>
      </Container>
    </section>
  );
};

export default CourseCategories;
