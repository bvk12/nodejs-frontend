import { Button, Form } from "react-bootstrap";
import LoadingView from "../../../../components/LoadingView";
import useCourseDetails from "../../../../hooks/useCourseDetails";
import BasicDetailsStep from "./BasicDetailsStep";
import MediaStep from "./MediaStep";
import OutcomesStep from "./OutcomesStep";
import PricesStep from "./PriceStep";
import RequirementsStep from "./RequirementsStep";
import SeoStep from "./SeoStep";

const CourseDetails = ({ handleNextStep, course }) => {
  const { handleSubmit, loading, ...courseContext } = useCourseDetails({
    course,
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // course is returned after creating course
      let course = await handleSubmit();
      handleNextStep(course);
    } catch (error) {
      console.error("Course Details, error: ", error);
    }
  };

  return loading || courseContext?.priceLoading ? (
    <LoadingView />
  ) : (
    <Form onSubmit={onSubmit}>
      <BasicDetailsStep courseContext={courseContext} />
      <OutcomesStep courseContext={courseContext} />
      <RequirementsStep courseContext={courseContext} />
      <PricesStep courseContext={courseContext} />
      <MediaStep courseContext={courseContext} />
      <SeoStep courseContext={courseContext} />

      <div className="d-flex justify-content-center">
        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default CourseDetails;
