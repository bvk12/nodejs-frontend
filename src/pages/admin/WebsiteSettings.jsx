import { DynamicInputForm } from "../DynamicForms/DynamicInputForm";
export const WebsiteSettings = () => {
  return (
    <>
      <br />
      <div>
        <DynamicInputForm formName="basic_settings" />
        <br />
        <DynamicInputForm formName="logo_settings" />
        <br />
        <DynamicInputForm formName="contact_settings" />
      </div>
    </>
  )
};
