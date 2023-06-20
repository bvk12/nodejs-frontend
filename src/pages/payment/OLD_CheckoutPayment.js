import { loadStripe } from "@stripe/stripe-js";
import { PaymentAPI } from "../../services/apis/PaymentAPI";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import Icon from '../../components/Icon/Icon';
import { AuthContext } from "../../context/AuthContextProvider";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";




// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51MUSekSIveuRWuUaeob8gZJvO3zRZfTrEWjKoX02q4nhiTzs4kHuiYmLFaW7J2MQCrGJYnir3JEvG0dmvGmqYhzH00B5xasqCP");

function CheckoutComponent() {

  const [pg, setPG] = useState("razorpay");
  const { user } = useContext(AuthContext);

  const handleCheckoutResponse = async (payGateway, data) => {
    //alert("Paynent gateway",payGateway,user)
    console.log("User:", user)
    switch (payGateway) {
      case 'razorpay':
        {
          return handleOpenRazorpay(data);
        }
      case 'stripe':
        {
          console.log("Handling stripe")
          return handleStripe(data);
        }
      case 'paypal':
        {
          console.log("Handling paypal")
          return handleOpenPaypal(data);
        }
      default: {
        return handleStripe(data)
      }
    }
  }

  const handleOpenRazorpay = (data) => {

    console.log("Data:", data.data)
    var razorKey = 'rzp_test_6tjMRdvCbqc8wx'
    //var razorKey = 'rzp_live_VMuQP30hpyTin3'    
    var options = {
      "key": razorKey, // Enter the Key ID generated from the Dashboard
      "amount": data.data.amount, // Amount is in currency subunits. Default currency is INR.
      // Hence, 50000 refers to 50000 paise
      "currency": data.data.currency,
      "name": "VPTech Education Services",
      "description": "Payment Transaction",
      "order_id": data.data.order_id,//This is a sample Order ID. 
      //Pass the `id` obtained in the response of Step 1
      "prefill": {
        "name": "Venkat Parsi",
        "email": "parsi.venkatramana@gmail.com",
        "contact": "8886406677"
      },
      // "callback_url": "https://localhost:3000/payment/successPay",
      "handler": function (paymentResponse) {
        alert(paymentResponse.razorpay_payment_id);
        alert(paymentResponse.razorpay_order_id);
        alert(paymentResponse.razorpay_signature);

      
      },
      handler2: function (res) {
        console.log("Razorpay callback", res);
      },
      "notes": {
        "address": "FS369 Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    }
    var razr1 = new window.Razorpay(options)
    razr1.open();
  }

  const handleStripe = async (session) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    //alert("handling stripe payments")
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      alert("Error while redirecting:", result.error.message)
    }
  };

  const handleOpenPaypal = (data) => {
    window.location = data.forwardLink
  }




  const handleClick = async () => {



    const response = await PaymentAPI.createPayment(
      {
        type: pg,
        productIds: "CLOUD_BUNDLE_1",
        amount: 10,
        userId: '17'
      });

    const session = await response.data;
    console.log("Successfully order created", session)
    handleCheckoutResponse(pg, session)

  };

  //4242424242424242
  //
  return (
    <div style={{ margin: "5%" }}>
      <Icon
        name="video-fill"
        color="royalblue"
        size={'xl'}
        className="align-top"
      />
      <h4>You have selected Bundle</h4>
      <h4>Amount: 200
        <Icon
          name="sign-inr">
        </Icon></h4>
      <p>Once click on pay, you will be redirected to our Payment gateway.</p>
      <CheckInline type="radio" setPG={setPG}></CheckInline>

      <Button role="link" onClick={handleClick}> Click here to Pay  </Button>
    </div>

  );
}

function CheckInline({ type, setPG }) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  function onCurrencyChange({ target: { value } }) {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  }
  if (!type) type = "radio";

  const createOrder = (data, actions) => {
    console.log("Creating order for paypal", data)
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.02",
          },
        },
      ],
    });
  }

  const onApprove = (data, actions) => {
    console.log("Approved order", data)
    return actions.order.capture();
  };

  const onCancel = (data) => {
    // Show a cancel page, or return to cart
  }

  const onError = (data) => {
    // Show a error page, or return to cart
  }

  return (
    <Form>
      {[type].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            defaultChecked
            label={<a href="https://razorpay.com/" target="_blank">
              <img referrerpolicy="origin"
                src="https://badges.razorpay.com/badge-dark.png "
                style={{ height: '32px', width: '113px' }}
                alt="Razorpay | Payment Gateway | Neobank" /></a>}
            name="pg"
            type={type}
            id={`inline-${type}-1`} onClick={() => { setPG('razorpay') }}
          />

          <Form.Check
            inline
            label={<Icon
              name="cc-stripe"
              //name="sign-stripe-fulll"
              color="royalblue"
              size={'xl'}
              className="align-top"
            />}
            name="pg"
            onChange={() => { setPG('stripe') }}
            type={type}
            id={`inline-${type}-2`}
          />


          <Form.Check
            inline
            name="pg"
            onChange={() => { setPG('paypal') }}
            label={<Icon
              name="cc-paypal"
              //name="sign-paypal-full"
              color="blue"
              size={'xl'}
              className="align-top"
            />}
            type={type}
            id={`inline-${type}-3`}
          />
          <>
            <select value={currency} onChange={onCurrencyChange}>
              <option value="USD">United States dollar</option>
              <option value="EUR">Euro</option>
            </select>
            {isPending ? <div className="spinner" /> : null}
            <PayPalButtons
              onApprove={(data, actions) => onApprove(data, actions)}
              createOrder={(data, actions) => createOrder(data, actions)} />
          </>
        </div>
      ))}
    </Form>
  );
}

export default CheckoutComponent;