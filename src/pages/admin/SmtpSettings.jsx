import { DynamicInputForm } from "../DynamicForms/DynamicInputForm";
export const SmtpSettings = () => {
  return (
    <><div>
      <DynamicInputForm formName="smtp_settings" />
      <DynamicInputForm formName="email_template_settings" />
    </div>
    </>
  )
};
