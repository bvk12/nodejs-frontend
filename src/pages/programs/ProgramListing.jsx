import { IonContent, IonPage } from "@ionic/react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import CourseCard from "../../components/CourseCard";
import ProgramCard from "./ProgramCard";
import useProgramListing from "../../hooks/useProgramListing";
import Program from "./ProgramPage";
import Footer from "../../components/Footer/Footer";

const ProgramListing = (props) => {
  const { showFilters = true, embed, showFooter = true } = props;
  const {
    loading,
    filteredPrograms,
    categories,
    getCategoryOptions,
    getProgramOptions,
    selectedCategory,
    selectedProgram,
    renderProgramCourses,
    handleCategoryChange,
    handleProgramChange,
    getContentSpecialityTitle,
    getDifficultyLevelTitle,
    getSkillTags,
    user,
  } = useProgramListing();

  const renderLoading = () => {
    return new Array(8).fill(0).map((_, index) => (
      <Col sm={6} md={4} lg={3}>
        <CourseCard key={`loading-${index}`} loading={true} />
      </Col>
    ));
  };

  const renderProgramCards = () => {
    //console.log("Selected program", selectedProgram);
    return filteredPrograms.map((programInfo) => (
      <Col key={programInfo.id} sm={6} md={4} lg={3}>
        <ProgramCard
          {...programInfo}
          handleProgramChange={handleProgramChange}
          userId={user.userId}
          getContentSpecialityTitle={getContentSpecialityTitle}
          getDifficultyLevelTitle={getDifficultyLevelTitle}
          getSkillTags={getSkillTags}
        />
      </Col>
    ));
  };

  const renderProgram = () => {
    // console.log("Rendering program courses...");
    return <Program id={selectedProgram.value} embed={true} />;
  };

  const embedProgram = () => {
    return (
      <>
        {" "}
        <Container className="mt-4 cards-container">
          {showFilters ? (
            <Row lg={9}>
              <Card className="mb-3 p-4">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col md={6} sm={12} className="mb-2">
                    <h3>Programs</h3>
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
                    <p> Program </p>
                    <Select
                      options={getProgramOptions()}
                      className="text-start"
                      value={{ ...selectedProgram }}
                      onChange={(newOption) => handleProgramChange(newOption)}
                    />
                  </Col>
                </Row>
              </Card>
            </Row>
          ) : (
            <></>
          )}
          <Row lg={9} className="card-listing-container">
            {loading
              ? renderLoading()
              : selectedProgram.value === -1
              ? renderProgramCards()
              : renderProgram()}
          </Row>
        </Container>
        {showFooter && <Footer />}
      </>
    );
  };

  const pageProgram = () => {
    return (
      <IonPage>
        <IonContent>{embedProgram()}</IonContent>
      </IonPage>
    );
  };

  return <>{embed ? embedProgram() : pageProgram()}</>;
};
export default ProgramListing;
