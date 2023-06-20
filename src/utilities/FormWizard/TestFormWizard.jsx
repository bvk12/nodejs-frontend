import { routes } from "../../utils/constants";
import StepForm from "./StepForm"
import FormWizard from "./FormWizard";

const TestFormWizard = ()=>{

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

const submitFunction = (formData) => {
    // Custom submit function logic
    console.log('Form data:', formData);


    // Update the wizard-level data
    updateWizardData(formData);

    // Mark the step form as completed
    setIsCompleted(true);

};

// In your component
const CourseDetailsForm = <StepForm
    stepData={stepData}  
    initialValues={initialValues}
    onSubmit={submitFunction}
/>

const steps = [
    {
        component: CourseDetailsForm,
        title: "Course Details",
        stepNum: 1,
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
        initialValues :{
            name: 'John Doe',
            email: 'johndoe@example.com',
            // Add more initial values as needed
        }
    },
    {
        component: CourseDetailsForm,
        title: "Curriculum Step",
        stepNum: 2,
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
        initialValues :{
            name: 'John Doe',
            email: 'johndoe@example.com',
            // Add more initial values as needed
        }
    },
    // Add more steps as needed
];

const finalRoute = routes.manageCourses;

// In your component
const myCourseWizard = <FormWizard steps={steps} finalRoute={finalRoute} />;

return ( 
    [myCourseWizard]
)

}

export default TestFormWizard;
