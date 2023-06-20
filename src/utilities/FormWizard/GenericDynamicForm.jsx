import DynamicInput from "./DynamicInput";
import { useForm } from "react-hook-form";
import { Block } from "../../components";
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import useToast from "../../hooks/useToast";
import {
  ToastVariants,
} from "../../utils/constants";
export const GenericDynamicForm = ({ initialValues,  fields, sectionName = "Generic", sectionTitle = "Generic" }) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange", // I want to change it to onBlur
    initialValues: initialValues,
  });

  const { showToast } = useToast();


  const onSubmit = (data) => {
    console.log("Submitting data", data);
    showToast("Submitting Data..",ToastVariants.info);
       
  };

  function getFormData() {
    if (fields != null) {
      console.log("Generic Dynamic Form : Default Values:===>", getValues(), fields);

      return Object.keys(fields).map((fieldName, index) => {
        const { rules, label, height,rows ,fullwidth} = fields[fieldName];
        console.log("Rows of textarea",rows,fields[fieldName])
        return (
          <Col  md={fullwidth?12:6}>
            <Form.Group className="form-group">
              <DynamicInput
                control={control}
                index={index}
                label={label}
                rules={rules}
                getValues={getValues}
                name={fieldName}
                setValue={setValue}
                errors={errors}
                register={register}
                height={height}
                rows={rows}
                contentState={initialValues ? initialValues[fieldName] : null}
                {...fields[fieldName]}
              />
            </Form.Group>
          </Col>
        );
      });
    } else {
      return <br />;
    }
  }
  const genericForm = () => {
    return (
      <>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <Block.Head>
          <Block.HeadBetween>
            <Block.HeadContent>
              <Block.Title tag="h2">  {sectionTitle}</Block.Title>
             
            </Block.HeadContent>
            <Block.HeadContent>

            </Block.HeadContent>
          </Block.HeadBetween>
        </Block.Head>

        <Block>
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit(onSubmit)} id="test"  >
                <Row className="g-3 gx-gs">
                  {fields != null ? getFormData() : <></>}
                  <div style={{ textAlign: "center" }}>
                    <Button
                      shape="round"
                      typeof="sumbit"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Block>
      </>
    );
  }

  return (
    <>
      {genericForm()}

    </>
  );
};
