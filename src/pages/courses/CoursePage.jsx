import { IonContent, IonPage } from "@ionic/react";
import React, { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Tabs,
  Tab,
  Form,
  Button,
} from "react-bootstrap";
import ReactPlayer from "react-player";
import LoadingView from "../../components/LoadingView";
import useCoursePage from "../../hooks/useCoursePage";

import "./CoursePage.css";
import { AuthContext } from "../../context/AuthContextProvider";

const CoursePage = () => {
  const {
    courseData: course,
    loading,
    handleChapterClick,
    handleSectionClick,
    getSelectedSection,
    selectedSectionId,
    sendSectionProgress,
    handleSectionCheckbox,
    reactPlayerRef,
    isCourseSectionLocked,
    showCheckbox,
    addCourseToCart,
    handlePlayerReady,
  } = useCoursePage();

  const { isUserLoggedIn, goToSignUp } = useContext(AuthContext);

  if (loading) {
    return <LoadingView />;
  }

  const selectedSection = getSelectedSection();

  const renderSection = (chapterData, sectionData, sectionIndex) => {
    const isSectionLocked = isCourseSectionLocked(sectionData);
   // console.log(sectionData)
    return (
      <div
        className={
          sectionData.id === selectedSectionId
            ? "section-container active"
            : "section-container"
        }
        key={sectionData.id}
        onClick={() => handleSectionClick(chapterData, sectionData)}
      >
        {showCheckbox() && (
          <Form.Check
            type={"checkbox"}
            className="section-checkbox"
            checked={sectionData.isCompleted}
            onClick={(e) => {
              e.stopPropagation();
             // console.info("CoursePage: renderSection:,sectionData.id", e.target.checked,sectionData.id);
              handleSectionCheckbox(sectionData, e.target.checked);
            }}
            disabled={isSectionLocked}
          />
        )}

        <div>
          <div className="section-duration-container">
            {isSectionLocked ? (
              <i class="fas fa-lock fs-3" />
            ) : (
              <i className="far fa-play-circle fs-3" />
            )}            
            {sectionData.ordering}.&nbsp;
            {sectionData.title}
          </div>
          {/* <p className="section-duration-container">
            {<i className="fas fa-play"></i>} {sectionData.duration}
          </p> */}
        </div>
      </div>
    );
  };

  const renderChapter = (chapterData, chapterIndex) => {
    return (
      // for now commenting this to show only sections.
      // <Accordion.Item
      //   eventKey={String(chapterIndex)}
      //   className="chapter-container"
      // >
      //   <Accordion.Header className="fw-bold">
      //     {chapterData.title}
      //   </Accordion.Header>
      // <Accordion.Body className="sections-list">
      <div className="sections-list">
        {chapterData.sections &&
          chapterData.sections.map((section, sectionIndex) => (
            <li>{renderSection(chapterData, section, sectionIndex)}</li>
          ))}
          <hr style={{borderTop:"1px solid white", padding:"0px", margin:"0px"}}/>
      </div>
      //    </Accordion.Body>
      //  </Accordion.Item>
    );
  };

  const getHTMLParsed = (course) =>{
    if(course){
      if(course.description)
       {
        if(course.description){
          let description = course.description;
          try{
           description = JSON.parse(course.description);
           return description.html;
          }
          catch(error){
            return description;
          }         
        }
       }
    } 
    return "";  
  }

  const renderCourseDetailTabs = () => {
    return (
      <Tabs defaultActiveKey="course details" className="my-3 " fill>
        <Tab eventKey="course details" title="Course Info" >
          <div className="course-details-tab">
            <h2 className="mb-3"> Description </h2>             
            <div  dangerouslySetInnerHTML={{__html:getHTMLParsed(course)}}></div>
          </div>
        </Tab>

        <Tab eventKey="requirements" title="Requirements">
          <ul className="course-details-tab">
            {course.requirements.map((requirementText) => (
              <li> {requirementText}</li>
            ))}
          </ul>
        </Tab>

        <Tab eventKey="outcomes" title="Outcomes">
          <ul className="course-details-tab">
            {course.outcomes.map((outcomeText) => (
              <li> {outcomeText}</li>
            ))}
          </ul>
        </Tab>
      </Tabs>
    );
  };

  // const onReady = React.useCallback(() => {
  //   const timeToStart = (7 * 60) + 12.6;
  //   //reactPlayerRef.current.seekTo(timeToStart, 'seconds');
  // }, [reactPlayerRef.current]);

  return (
    <IonPage>
      <IonContent>
        <Container fluid className="pt-4 course-container">
          <Row>
            <Col md={12}>
              <h4 className="fw-bold my-3 text-white">{course.title} </h4>
            </Col>
            <Col md={8} className="video-player-container">
              {isCourseSectionLocked(selectedSection) ? (
                <div className="d-flex align-items-center flex-column text-center justify-content-center">
                  <p className="fw-bold mt-5 text-white fs-2">
                    Buy this course to continue watching
                  </p>

                  {isUserLoggedIn() ? (
                    <Button
                      variant="outline-primary"
                      className="mb-3"
                      size="lg"
                      onClick={addCourseToCart}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      className="mb-3"
                      size="lg"
                      onClick={() => {
                        goToSignUp();
                      }}
                    >
                      Sign Up
                    </Button>
                  )}
                </div>
              ) : (
                <ReactPlayer
                  className="react-player"
                  url={selectedSection.contentUrl}
                  controls
                  width="100%"
                  height="500px"
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                  ref={reactPlayerRef}
                  progressInterval={10000}
                  onProgress={sendSectionProgress}
                  onReady={handlePlayerReady}
                  onContextMenu={(e) => e.preventDefault()}
                />
              )}
            </Col>

            <Col md={4} className="chapter-content-container">
              {/* <Card>
                <Card.Body> */}
              {/* <Accordion flush> */}
              {course.chapters &&
                course.chapters.map((chapter, index) =>
                  renderChapter(chapter, index)
                )}
              {/* </Accordion> */}
              {/* </Card.Body>
              </Card> */}
            </Col>
          </Row>
        </Container>

        <Col md={8}>
          <Card>
            <Card.Body> {renderCourseDetailTabs()} </Card.Body>
          </Card>
        </Col>
      </IonContent>
    </IonPage>
  );
};

export default CoursePage;
