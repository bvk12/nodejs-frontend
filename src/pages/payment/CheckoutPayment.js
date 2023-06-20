import { loadStripe } from "@stripe/stripe-js";
import { PaymentAPI } from "../../services/apis/PaymentAPI";
import { OrdersAPI } from "../../services/apis/OrdersAPI";
import { CartAPI } from "../../services/apis/CartAPI";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Icon from "../../components/Icon/Icon";
import { AuthContext } from "../../context/AuthContextProvider";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useIonRouter } from "@ionic/react";
import { useHistory } from "react-router";
import { routes } from "../../utils/constants";
import { IonPage, IonContent } from "@ionic/react";
import Footer from "../../layout/default/Footer";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51MUSekSIveuRWuUaeob8gZJvO3zRZfTrEWjKoX02q4nhiTzs4kHuiYmLFaW7J2MQCrGJYnir3JEvG0dmvGmqYhzH00B5xasqCP"
);

function CheckoutComponent() {
  const [pg, setPG] = useState("razorpay");
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(null);
  const [total, setTotal] = useState(0);
  const router = useIonRouter();
  const history = useHistory();

  useEffect(() => {
    var userId = user.userId;
    console.log("UserId in checkout page is:" + userId);
    async function fetchData() {
      // You can await here
      if (userId) {
        var cartApiResponse = await CartAPI.getCartItems(userId);
        console.log("Recieved data of cart...", cartApiResponse);
        var totalCartVal = 0;
        for (var cartItem of cartApiResponse.data.data) {
          totalCartVal = cartItem.amount + totalCartVal;
        }
        setTotal(totalCartVal);
        setCartItems(cartApiResponse.data.data);
      }
    }
    fetchData();
  }, [user]);

  const handleCheckoutResponse = async (payGateway, data) => {
    //alert("Paynent gateway",payGateway,user)
    console.log("User:", user);
    switch (payGateway) {
      case "razorpay": {
        return handleOpenRazorpay(data);
      }
      case "stripe": {
        console.log("Handling stripe");
        return handleStripe(data);
      }
      case "paypal": {
        console.log("Handling paypal");
        return handleOpenPaypal(data);
      }
      default: {
        return handleStripe(data);
      }
    }
  };

  const handleOpenRazorpay = (data) => {
    function handlePaymentCancel(response) {
      // Handle payment cancellation
      alert("You have cancelled the payment");
      console.log("Cancelled payment....");
    }


    if(!data){
      alert("Error occured while checkout.",data);   
      return;   
    }
    
    const newOrderDetails = {
      //id
      orderId: data.data.data.orderId,
      total: data.data.data.total,
      paymentGateway: data.data.data.paymentGateway,
      paymentGatewayOrderId: data.data.data.paymentGatewayOrderId,
      //paymentType
      //status
      //statusDesc
      //createdAt
      //updateAt
      totalCount: data.data.data.totalCount,
    };
    console.log("Data response newOrderDetails:", data.data.data);
    // var razorKey = "rzp_test_6tjMRdvCbqc8wx";
    var razr1 = null;
    let razorKey = 'rzp_live_VMuQP30hpyTin3';
    // console.log("razorKey",razorKey,process.env.REACT_APP_BASE_URL,process.env.RAZORPAY_GATEWAY_ID);
    // if(process.env.RAZORPAY_GATEWAY_ID)
    // {
    //   console.log("from env : razorKey",razorKey)
    //   razorKey = process.env.RAZORPAY_GATEWAY_ID;
    // }
    // console.log("razorKey",razorKey)


      var options = {
        key: razorKey, // Enter the Key ID generated from the Dashboard
        amount: data.data.data.totalAmount, // Amount is in currency subunits. Default currency is INR.
        // Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "VPTech Education Services",
        description: "Payment Transaction",
        order_id: data.data.data.paymentGatewayOrderId, //This is a sample Order ID.
        //Pass the `id` obtained in the response of Step 1
        prefill: {
          name: user.firstName + " " + user.lastName,
          email: user.email,
          contact: user.mobile,
        },
        // "callback_url": "https://localhost:3000/payment/successPay",
        oncancel: function (paymentResponse) {
          console.log("Cancelled ....");
        },
        onclose: function (paymentResponse) {
          console.log("Closed ....");
        },

        handler: async function (paymentResponse) {
          //alert(paymentResponse.razorpay_payment_id);
          //alert(paymentResponse.razorpay_order_id);
          //alert(paymentResponse.razorpay_signature);
          console.log("Payment response:", paymentResponse);
          // razr1.payments.fetch(paymentResponse.razorpay_payment_id);
          if (paymentResponse.razorpay_payment_id) {
            createPaymentRecordOnSuccess(paymentResponse, newOrderDetails);
            var cartItems = await CartAPI.clearCartItems(user.userId);
            router.push(routes.successPay, "forward", "push");
          } else {
            alert("Payment Failed..");
            console.log("Payment failed...");
          }
        },

        notes: {
          address: "FS369 Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
          },
        },
      };
      razr1 = new window.Razorpay(options);
      razr1.on("payment.failed", function (response) {
        //alert(response.error.code);
        alert("Payment Failed: " + response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        //alert(response.error.reason);
        //alert(response.error.metadata.order_id);
        //alert(response.error.metadata.payment_id);
      });
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
        alert("Error while redirecting:", result.error.message);
      }
    };

    const handleOpenPaypal = (data) => {
      window.location = data.forwardLink;
    };

    const buyCartItems = async () => {
      const orderResponse = await OrdersAPI.createOrder(pg, user.userId);
      console.log("ORDER RESPONSE", orderResponse);
      handleCheckoutResponse(pg, orderResponse);
    };

    const purchasePlatform = async (courseId = "-999", userId) => {
      const addToCartResponse = await CartAPI.createCartItem(
        courseId,
        "platform",
        userId
      );
      console.log(addToCartResponse);
      const orderResponse = await OrdersAPI.createOrder(pg, userId);
      console.log(orderResponse);
      handleCheckoutResponse(pg, orderResponse);
    };

    const createPaymentRecordOnSuccess = async (
      paymentResponse,
      newOrderDetails
    ) => {
      //PaymentAPI.createPayment()
      console.log(
        "################ New order and payment resonse",
        paymentResponse,
        newOrderDetails
      );
      const newPaymentRecord = {
        id: paymentResponse.razorpay_payment_id,
        orderId: newOrderDetails.orderId,
        total: newOrderDetails.total,
        paymentGateway: newOrderDetails.paymentGateway,
        paymentGatewayOrderId: newOrderDetails.paymentGatewayOrderId,
        //paymentType
        status: "success",
        //statusDesc
        //createdAt
        //updateAt
        totalCount: newOrderDetails.totalCount,
      };
      const paymentEntryResponse = await PaymentAPI.createPayment(
        newPaymentRecord
      );
      console.log("paymentEntry made", paymentEntryResponse);
      var clearResult = await CartAPI.clearCartItems(user.userId);
      console.log("Cleared the cartItems..", clearResult);
      var subInfo = paymentEntryResponse.data.data[0];
      var subscriptionDetails =
        " Entire Platform : Subscription Id:" +
        subInfo.id +
        " Start Date:" +
        subInfo.startDate +
        " End Date:" +
        subInfo.endDate;

      await PaymentAPI.sendPaymentSuccessEmail(
        newOrderDetails.orderId,
        paymentResponse.razorpay_payment_id,
        newOrderDetails.total,
        subscriptionDetails,
        user.email
      );
    };
    //4242424242424242

    function getRemoveItemUrl(courseId, courseType, userId) {
      var url = "/cart/removeCartItem?userId=" + userId;
      return url;
    }

    const removeItem = async (userId, courseId, courseType) => {
      await CartAPI.removeCartItem(userId, courseId, courseType).then(() => {
        //alert("Removed cart tiem..")
        window.location.reload(false);
      });
    };

    function displayCart() {
      return (
        <div class="container">
          <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
              <div class="col-md-9">
                <div class="ibox">
                  <div class="ibox-title">
                    <span class="pull-right">
                      (<strong>{cartItems?.length}</strong>) items
                    </span>
                    <h5>Items in your cart</h5>
                  </div>
                  {cartItems ? (
                    cartItems.map((item, index) => (
                      <div class="ibox-content">
                        <div class="table-responsive">
                          <table class="table shoping-cart-table">
                            <tbody>
                              <tr>
                                <td width="90">
                                  <div class="cart-product-imitation">
                                    <i className="fas fa-graduation-cap" />
                                  </div>
                                </td>
                                <td class="desc">
                                  <h3>
                                    <span href="#" class="text-navy">
                                      {item.courseTitle}
                                    </span>
                                  </h3>
                                  <p class="small">{item.description}</p>
                                  <dl class="small m-b-none">
                                    <dt>Description </dt>
                                    <dd> {item.courseType}</dd>
                                  </dl>

                                  <div class="m-t-sm">
                                    {/* <a class="text-muted"> <i className="fa fa-heart" style={{color:"blue"}} aria-hidden="true"></i> Add to wishlist</a>  &nbsp;|*/}
                                    &nbsp;
                                    <a
                                      href="javascript:void"
                                      class="text-muted"
                                      onClick={() =>
                                        removeItem(
                                          user.userId,
                                          item.courseId,
                                          item.courseType
                                        )
                                      }
                                    >
                                      <i
                                        class="fa fa-trash"
                                        style={{ color: "red" }}
                                      ></i>
                                      &nbsp; Remove
                                    </a>
                                  </div>
                                </td>

                                <td>
                                  <Icon name="sign-inr"></Icon>
                                  {item.amount}
                                  <s
                                    class="small text-muted"
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    {" "}
                                    <Icon name="sign-inr"></Icon>
                                    {item.basicPrice}
                                  </s>
                                </td>
                                <td width="65"></td>
                                <td>
                                  <h4>
                                    <Icon name="sign-inr"></Icon>
                                    {item.amount}
                                  </h4>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div class="col-md-3">
                <div class="ibox" style={{ position: "sticky", top: "10px" }}>
                  <div class="ibox-title">
                    <h5>Cart Summary</h5>
                  </div>
                  <div class="ibox-content">
                    <span>Total</span>
                    <h2 class="font-bold">
                      <Icon name="sign-inr"></Icon>
                      {total}
                    </h2>
                    <hr />
                    <div class="text-muted small">
                      *For India, United States, EU Nations - applicable sales
                      tax & payment gateway charges will be applied.
                    </div>
                    <br />
                    <div class="m-t-sm">
                      <Button role="link" onClick={buyCartItems}>
                        <i class="fa fa-shopping-cart"></i>&nbsp;Checkout
                      </Button>
                      <div class="btn-group">
                        <a href="/home" class="btn btn-white btn-sm">
                          {" "}
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="ibox">
                      <div class="ibox-title">
                        <h5>Support</h5>
                      </div>
                      <div class="ibox-content text-center">
                        <h3>
                          <i class="fa fa-phone"></i> +91 9154152888 ,9154152887
                        </h3>
                        <span class="small">
                          Please contact with us if you have any questions. We
                          are avalible 24h. support@visualpathtech.com
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <IonPage>
        <IonContent>
          <div
            style={{
              margin: "2%",
              marginTop: "12px",
              border: " solid 1px lightgray",
              overflow: "scroll-y",
            }}
          >
            {displayCart()}
            <div className="row">
              <div className=""></div>
              <div className="h-100 d-flex align-items-center justify-content-center">
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    history.push("/home");
                  }}
                  class="btn btn-primary cart-btn-transform m-3"
                  data-abc="true"
                >
                  Continue Shopping
                </a>
              </div>
            </div>

            <Footer />
          </div>
        </IonContent>
      </IonPage>
    );
  };

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
      console.log("Creating order for paypal", data);
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "0.02",
            },
          },
        ],
      });
    };

    const onApprove = (data, actions) => {
      console.log("Approved order", data);
      return actions.order.capture();
    };

    const onCancel = (data) => {
      // Show a cancel page, or return to cart
    };

    const onError = (data) => {
      // Show a error page, or return to cart
    };

    return (
      <Form>
        {[type].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              defaultChecked
              label={
                <a href="https://razorpay.com/" target="_blank">
                  <img
                    referrerpolicy="origin"
                    src="https://badges.razorpay.com/badge-dark.png "
                    style={{ height: "32px", width: "113px" }}
                    alt="Razorpay | Payment Gateway | Neobank"
                  />
                </a>
              }
              name="pg"
              type={type}
              id={`inline-${type}-1`}
              onClick={() => {
                setPG("razorpay");
              }}
            />

            {/* <Form.Check
            disabled
            inline
            label={
              <Icon
                name="cc-stripe"
                //name="sign-stripe-fulll"
                color="royalblue"
                size={"xl"}
                className="align-top"
              />
            }
            name="pg"
            onChange={() => {
              setPG("stripe");
            }}
            type={type}
            id={`inline-${type}-2`}
          />

          <Form.Check
            disabled
            inline
            name="pg"
            onChange={() => {
              setPG("paypal");
            }}
            label={
              <Icon
                name="cc-paypal"
                //name="sign-paypal-full"
                color="blue"
                size={"xl"}
                className="align-top"
              />
            }
            type={type}
            id={`inline-${type}-3`}
          /> */}
            <>{isPending ? <div className="spinner" /> : null}</>
          </div>
        ))}
      </Form>
    );
  }


export default CheckoutComponent;
