import axios from "axios";

import cartConstant from "../constants/cartConstants";

// Add to cart
const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  dispatch({
    type: cartConstant.ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove product from cart
const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: cartConstant.REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping Info
const saveShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({
    type: cartConstant.SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

const cartAction = { addItemsToCart, removeItemFromCart, saveShippingInfo };

export default cartAction;
