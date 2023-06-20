import { useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import LoadingView from "../../../../components/LoadingView";
import useCurriculum from "../../../../hooks/useCurriculum";
import VideoIcon from "../../../../assets/video.png";
import DeletIcon from "mdi-react/DeleteIcon";
import PencilIcon from "mdi-react/PencilIcon";

import "./CurriculumStep.css";
import AddEditChapter from "./AddEditChapter";
import AddEditSection from "./AddEditSection";

const CurriculumStep = ({ handleNextStep, course }) => {
  const { id: courseId } = course;

  const {
    loading,
    chapterData,
    setaddEditChapterData,
    addEditChapterData,
    showAddChapterModal,
    showEditChapterModal,
    setShowAddChapterModal,
    setShowEditChapterModal,
    openCreateChapterModal,
    openEditChapterModal,
    createChapter,
    updateChapter,
    deleteChapter,
    setAddEditSectionData,
    setShowAddSectionModal,
    setShowEditSectionModal,
    showAddSectionModal,
    showEditSectionModal,
    openCreateSectionModal,
    openEditSectionModal,
    deleteSection,
    createSection,
    updateSection,
    getSectionCountOfChapter,
    addEditSectionData,
  } = useCurriculum(courseId);

  const renderSectionCard = (section, sectionNo) => {
    return (
      <Card className="mb-2 section-card">
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={VideoIcon}
                alt="Video Icon"
                height="16px"
                className="me-2"
              />
              {`  Section ${sectionNo}: ${section.title} `}
            </div>

            <div className="section-actions">
              <Button
                variant="outline"
                className="p-0 me-1"
                onClick={() => openEditSectionModal(section)}
              >
                <PencilIcon size={16} />
              </Button>

              <Button
                variant="outline"
                className="p-0 me-1"
                onClick={() => deleteSection(section)}
              >
                <DeletIcon size={16} />
              </Button>
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    );
  };

  const renderChapter = (chapter, chapterNo) => {
    const { sections = [] } = chapter;
    return (
      <Col xl={12}>
        <Card className="bg-light mb-5 chapter-card">
          <Card.Body>
            <Card.Title>
              <Stack
                direction="horizontal"
                className="justify-content-between chapter-title"
              >
                <div>{`Chapter ${chapterNo}: ${chapter.title} `}</div>
                <div className="chapter-actions">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-4"
                    onClick={() => openEditChapterModal(chapter)}
                  >
                    Edit Chapter
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => deleteChapter(chapter)}
                  >
                    Delete Chapter
                  </Button>
                </div>
              </Stack>
            </Card.Title>

            {sections
              .filter((section) => section.isActive)
              .sort((a, b) => a.ordering - b.ordering)
              .map((section, index) => renderSectionCard(section, index + 1))}
          </Card.Body>
        </Card>
      </Col>
    );
  };

  if (loading) {
    return <LoadingView />;
  }

  return (
    <Container>
      {(showAddChapterModal || showEditChapterModal) && (
        <AddEditChapter
          showAddChapterModal={showAddChapterModal}
          showEditChapterModal={showEditChapterModal}
          addEditChapterData={addEditChapterData}
          setaddEditChapterData={setaddEditChapterData}
          setShowAddChapterModal={setShowAddChapterModal}
          setShowEditChapterModal={setShowEditChapterModal}
          createChapter={createChapter}
          updateChapter={updateChapter}
          deleteChapter={deleteChapter}
        />
      )}

      {(showAddSectionModal || showEditSectionModal) && (
        <AddEditSection
          showAddSectionModal={showAddSectionModal}
          showEditSectionModal={showEditSectionModal}
          addEditSectionData={addEditSectionData}
          setShowAddSectionModal={setShowAddSectionModal}
          setShowEditSectionModal={setShowEditSectionModal}
          setAddEditSectionData={setAddEditSectionData}
          createSection={createSection}
          updateSection={updateSection}
          deleteSection={deleteSection}
          chapterData={chapterData}
          getSectionCountOfChapter={getSectionCountOfChapter}
        />
      )}

      <Row className="d-flex justify-content-center">
        <Col xl={12} className="text-center my-4">
          <Button
            variant="outline-primary"
            className="me-4"
            onClick={() => openCreateChapterModal()}
          >
            Add Chapter
          </Button>
          {chapterData && chapterData.length > 0 && (
            <Button
              variant="outline-primary"
              onClick={() => openCreateSectionModal()}
            >
              Add Section
            </Button>
          )}
        </Col>

        <Col xl={12}>
          <Row>
            {chapterData &&
              chapterData
                .filter(
                  (chapter) => chapter.isActive
                ) /* only show active chapters */
                .sort((a, b) => a.ordering - b.ordering)
                .map((chapter, index) => renderChapter(chapter, index + 1))}
          </Row>
        </Col>

        <Col xl={12} className="text-center my-4">
          <Button type="click" variant="primary" onClick={handleNextStep}>
            Go to Courses
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CurriculumStep;
