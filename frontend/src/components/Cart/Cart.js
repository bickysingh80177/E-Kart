import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import cartAction from "../../actions/cartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock < newQty) return;
    dispatch(cartAction.addItemsToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) return;
    dispatch(cartAction.addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(cartAction.removeItemFromCart(id));
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        "Cart is Empty"
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() => decreaseQty(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossAmount">
              <div></div>
              <div className="cartGrossBox">
                <p>Gross Total</p>
                <p>{`₹19347`}</p>
              </div>
              <div></div>
              <div className="checkoutBtn">
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
