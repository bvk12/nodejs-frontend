import { DynamicInputForm } from "../DynamicForms/DynamicInputForm";
export const SubscriptionSettings = () => {
  return (
    <><div>
      <DynamicInputForm formName="course_program_instance" />
      <br />
      <DynamicInputForm formName="platform_instance" />
      <br />
      <DynamicInputForm formName="partner_instance" />
      <br />

    </div>
    </>
  )
};
