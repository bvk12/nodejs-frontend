import { loadStripe } from "@stripe/stripe-js";
import { PaymentAPI } from "../../services/apis/PaymentAPI";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51MUSekSIveuRWuUaeob8gZJvO3zRZfTrEWjKoX02q4nhiTzs4kHuiYmLFaW7J2MQCrGJYnir3JEvG0dmvGmqYhzH00B5xasqCP");

function StripeCheckoutComponent() {
  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const response = await PaymentAPI.createPayment("stripe");

    console.log(response);

    const session = await response.data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div style={{ margin: "5%" }}>
      <img
        style={{ width: "20%", border: "1px gray solid" }}
        src="/images/tshirt.png"
      ></img>
      <h4>You have selected T-shirt</h4>
      <h4>Amount: 200 (INR)</h4>
      <p>Once click on pay, you will be redirected to our Payment gateway.</p>
      <button role="link" onClick={handleClick}>
        {" "}
        Click here to Pay
      </button>
    </div>
  );
}

export default StripeCheckoutComponent;