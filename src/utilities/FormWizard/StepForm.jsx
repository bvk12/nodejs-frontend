import { useForm } from 'react-hook-form';

import { useLocation } from "react-router";
import { useIonRouter } from "@ionic/react";
import { Button, Card, Col, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { useState, useEffect } from "react";

const StepForm = ({ wizardData, handleNextStep,updateWizardData, currentStep, stepData, initialValues, onSubmit }) => {
    const { register, handleSubmit, errors, formState, reset } = useForm({
        mode: 'onChange',
        defaultValues: initialValues,
    });
    const { isDirty, isValid } = formState;
    const [isCompleted, setIsCompleted] = useState(false);


    console.log("StepsData:", stepData, "Initial Values", initialValues)

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    const handleFormSubmit = (data) => {
        // Include isDirty and isValid in the form data
        const formData = {
            ...data,
            isDirty,
            isValid,
        };

        // Call the external submit function
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {stepData.fields.map((field) => {

                console.log("Field,field",field);
                return(
                    <div key={field.name}>
                    <label>{field.label}</label>
                    <input
                        type={field.type}
                        name="venkat"
                    />
                  {errors? <span> {errors[field.name].message}  </span> : <></>}
                </div>
                )
            })}

            {/* Step form content */}
            <button type="submit">Submit</button>

            {/* Completion status */}
            {isDirty && isValid && <p>Step form is completed and validated.</p>}
        </form>
    );
};
export default StepForm;