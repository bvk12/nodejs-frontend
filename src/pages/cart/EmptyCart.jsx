import "./EmptyCart.css";
function EmptyCart(props) {
  return (
    <div class="empty-cart container-fluid  mt-100" hidden={props.hidden}>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Hey {props?.name}</h5>
            </div>
            <div class="card-body cart">
              <div class="col-sm-12 empty-cart-cls text-center">
                <img
                  src="https://i.imgur.com/dCdflKN.png"
                  width="130"
                  height="130"
                  class="img-fluid mb-4 mr-3"
                />
                <h3>
                  <strong>Your Cart is Empty</strong>
                </h3>
                <h4>Add something to make you happy :)</h4>
                <a
                  href="/home"
                  class="btn btn-primary cart-btn-transform m-3"
                  data-abc="true"
                >
                  Continue shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
