import { DynamicInputForm } from "../DynamicForms/DynamicInputForm";
export const PaymentSettings = () => {
  return (
    <><div>
      <DynamicInputForm formName="system_currency_settings" />
      <br />
      <DynamicInputForm formName="paypal_settings" />
      <br />
      <DynamicInputForm formName="stripe_settings" />
      <br />
      <DynamicInputForm formName="razorpay_settings" />
    </div>
    </>
  )
};
