import DynamicInput from "./DynamicInput";
import { useForm } from "react-hook-form";
import { AdminAPI } from "../../services/apis/AdminAPI";
import { Block } from "../../components";
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { PriceAPI } from "../../services/apis/PriceAPI"
import {
  IonButton
} from "@ionic/react";
import useToast from "../../hooks/useToast";
import {
  ToastVariants,
} from "../../utils/constants";
export const GenericDynamicForm = ({ defaultValues, dynamicForm, sectionName = "Generic", sectionTitle = "Generic" }) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange", // I want to change it to onBlur
    defaultValues: defaultValues,
  });

  const { showToast } = useToast();



  const updatePriceMaster = async () => {
    alert("Updateing platform pricing");
    var platformPricingVals = getValues();
    var newPlatformPrice = platformPricingVals.platform_price;
    PriceAPI.updatePrice(-999, "platform", newPlatformPrice)
  }


  const onSubmit = (data) => {
    //alert("Data is getting submitted,", sectionName, JSON.stringify(data));
    console.log("Submitting data", data);


    if (sectionName === 'platform_subscription') {
      updatePriceMaster()
    }

    // console.log(getValues());
    var requestBody = {
      name: sectionName,
      title: sectionTitle,
      data: getValues(),
      metaData: dynamicForm,
    };
    AdminAPI.saveConfigSettings(requestBody).then((response) => {
      console.log("SAVED DATA SUCCESFULLY", response);
      showToast(
        "Saved Config Data Successfully. ",
        ToastVariants.success
      );
    });
  };

  function getFormDataNew() {
    if (dynamicForm != null) {
      console.log("Generic Dynamic Form : Default Values:===>", getValues(), dynamicForm);

      return Object.keys(dynamicForm).map((fieldName, index) => {
        const { rules, label, height,rows ,fullwidth} = dynamicForm[fieldName];
        console.log("Rows of textarea",rows,dynamicForm[fieldName])
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
                contentState={defaultValues ? defaultValues[fieldName] : null}
                {...dynamicForm[fieldName]}
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
              <nav>
                <ol className="breadcrumb breadcrumb-arrow mb-0">
                  <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="/admin">Settings</Link></li>
                  <li className="breadcrumb-item active" aria-current="page"> {sectionTitle}</li>
                </ol>
              </nav>
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
                  {dynamicForm != null ? getFormDataNew() : <></>}
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
