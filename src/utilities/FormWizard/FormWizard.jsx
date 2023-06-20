import { ACTIVE_FILTER_STATES, routes } from "../../utils/constants";
import React from "react";
import { useLocation } from "react-router";
import { useIonRouter } from "@ionic/react";
import { Button, Card, Col, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import StepForm from "./StepForm"

const FormWizard = ({ steps, finalRoute }) => {
    const [currStep, setCurrStep] = useState(0);
    const router = useIonRouter();
    const location = useLocation();
    const stepFormData = location.state?.stepFormData;
    const [formData, setFormData] = useState(stepFormData);

    const stepData = {
        fields: [
            {
                label: 'Name',
                name: 'name',
                type: 'text',
                validation: { required: 'Name is required' },
            },
            {
                label: 'Email',
                name: 'email',
                type: 'email',
                validation: {
                    required: 'Email is required',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid email address',
                    },
                },
            },
            // Add more fields as needed
        ],
    };
    const initialValues = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        // Add more initial values as needed
    };

    const renderStep = () => {
        let StepComponent = steps[currStep].component;
        let newComp = React.cloneElement(steps[currStep].component, {
            ...steps[currStep]
        });
        return (
            <>
                {newComp} 
                <div className="d-flex justify-content-center">
                    <Button type="button" onClick={handleNextStep} variant="primary">
                        Next
                    </Button>
                </div>

                <div className="d-flex justify-content-center">
                    <Button type="button" onClick={handlePrevStep} variant="primary">
                        Prev
                    </Button>
                </div>
            </>
        );
    };

    const handleNextStep = (stepFormData) => {
        if (currStep < steps.length - 1) {
            setCurrStep(currStep + 1);
            setFormData({
                ...formData,
                ...stepFormData,
            });
        } else {
            router.push(finalRoute);
        }
    };

    const handlePrevStep = (stepFormData) => {
        if (currStep > 0) {
            setCurrStep(currStep - 1);
            setFormData({
                ...formData,
                ...stepFormData,
            });
        } else {
            router.push(finalRoute);
        }
    };

    console.log("stepData", steps[currStep])
    const formTitle = steps ? steps[currStep].title : "Step Adding Form";

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col xl={8}>
                    <Card style={{ marginBottom: "30px" }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <h4>{formTitle}</h4>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={8}>{renderStep()}</Col>
            </Row>
        </>
    );
};

export default FormWizard;
