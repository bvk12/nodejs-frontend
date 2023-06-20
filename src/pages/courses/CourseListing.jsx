import { IonContent, IonPage } from "@ionic/react";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import CourseCard from "../../components/CourseCard";
import useCourseListing from "../../hooks/useCourseListing";
import Footer from "../../components/Footer/Footer";

const CourseListing = ({ trendingCourses }) => {
  const {
    loading,
    filteredCourses,
    categories,
    getCategoryOptions,
    selectedCategory,
    handleCategoryChange,
    getSubcategoryOptions,
    handleSubcategoryChange,
    selectedSubCategory,
    getDifficultyLevelTitle,
    getContentSpecialityTitle,
    getTrendingCourses,
  } = useCourseListing();

  const renderLoading = () => {
    return new Array(8).fill(0).map((_, index) => (
      <Col sm={6} md={4} lg={3}>
        <CourseCard key={`loading-${index}`} loading={true} />
      </Col>
    ));
  };

  const renderCourseCards = () => {
    return (
      <>
        {filteredCourses.map((courseInfo) => (
          <Col key={courseInfo.id} sm={6} md={4} lg={3}>
            <CourseCard
              {...courseInfo}
              getContentSpecialityTitle={getContentSpecialityTitle}
              getDifficultyLevelTitle={getDifficultyLevelTitle}
            />
          </Col>
        ))}
      </>
    );
  };

  const renderTrendingCourses = () => {
    return (
      <>
        {getTrendingCourses()?.map((courseInfo) => (
          <Col key={courseInfo.id} sm={6} md={4} lg={3}>
            <CourseCard
              {...courseInfo}
              getContentSpecialityTitle={getContentSpecialityTitle}
              getDifficultyLevelTitle={getDifficultyLevelTitle}
            />
          </Col>
        ))}
      </>
    );
  };

  if (trendingCourses) {
    return (
      <Row lg={9} className="card-listing-container">
        {loading ? renderLoading() : renderTrendingCourses()}
      </Row>
    );
  }

  return (
    <IonPage>
      <IonContent>
        <Container className="mt-4 cards-container">
          <Row lg={9}>
            <Card className="mb-3 p-4">
              <Row className="d-flex justify-content-between align-items-center">
                <Col md={6} sm={12} className="mb-2">
                  <h3>Courses</h3>
                </Col>

                <Col sm={6} md={3} className="mb-2">
                  <p> Category </p>
                  <Select
                    options={getCategoryOptions()}
                    className="text-start"
                    value={{ ...selectedCategory }}
                    onChange={(newOption) => handleCategoryChange(newOption)}
                  />
                </Col>

                <Col sm={6} md={3} className="mb-2">
                  <p> Subcategory </p>

                  <Select
                    options={getSubcategoryOptions()}
                    className="text-start"
                    value={{ ...selectedSubCategory }}
                    onChange={(newOption) => handleSubcategoryChange(newOption)}
                  />
                </Col>
              </Row>
            </Card>
          </Row>

          <Row lg={9} className="card-listing-container">
            {loading ? renderLoading() : renderCourseCards()}
          </Row>
        </Container>

        <Footer />
      </IonContent>
    </IonPage>
  );
};
export default CourseListing;
