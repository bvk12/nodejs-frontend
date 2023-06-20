import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { CartAPI } from "../../services/apis/CartAPI";
import useToast from "../../hooks/useToast";
import { ToastVariants } from "../../utils/constants";

const AddToCart = (props) => {
  const { showToast } = useToast();
  const { id, type, userId } = props;
  const { updateCartItemCount } = useContext(AuthContext);

  const addToCart = async (id) => {
    // await CartAPI.clearCartItems(user.userId);
    if (!userId) {
      showToast("You need to login first to add items to cart.");
      return;
    }
    var currentCartItems = await CartAPI.getCartItems(userId);
    console.log("Cartitems", currentCartItems);
    console.log("User id,programid", userId, id);
    var courseItem = await CartAPI.createCartItem(id, type, userId);
    if (courseItem) {
      showToast(
        "Good Choice - Selected Item added to Cart.",
        ToastVariants.success
      );
      console.log("Course Added...", courseItem);
    }
    // get latest count from backend
    updateCartItemCount(courseItem.data.count);
    //  router.push(routes.checkout, "forward", "push");
    //alert("Want to subsribe to platform ?")
  };

  return (
    <>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(id);
          }}
          className="btn btn-secondry"
        >
          <i className="fa fa-cart-plus" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
};

export default AddToCart;
