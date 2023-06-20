import { Button, Form } from "react-bootstrap";
import LoadingView from "../../../../components/LoadingView";
import useProgramDetails from "../../../../hooks/useProgramDetails";
import BasicDetailsStep from "./BasicDetailsStep";
import PricesStep from "./PriceStep";

const ProgramDetails = ({ program, handleNextStep }) => {
  const { handleSubmit, loading, ...programContext } = useProgramDetails({
    program,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let program = await handleSubmit();
      handleNextStep();
    } catch (error) {
      console.error("Program Details, error: ", error);
    }
  };

  return loading ? (
    <LoadingView />
  ) : (
    <Form onSubmit={onSubmit}>
      <BasicDetailsStep programContext={programContext} />
      <PricesStep programContext={programContext} />

      <div className="d-flex justify-content-center">
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default ProgramDetails;
