import axios from "axios";

import orderConstants from "../constants/orderConstants";

// Create order
const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: orderConstants.CREATE_ORDER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({
      type: orderConstants.CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: orderConstants.CREATE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

// my orders
const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: orderConstants.MY_ORDERS_REQUEST });
    const { data } = await axios.get("api/v1/order/me");
    dispatch({ type: orderConstants.MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (err) {
    dispatch({
      type: orderConstants.MY_ORDERS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// get order details
const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: orderConstants.ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch({
      type: orderConstants.ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
const clearErrors = () => async (dispatch) => {
  dispatch({ type: orderConstants.CLEAR_ERRORS });
};

const orderAction = { createOrder, myOrders, getOrderDetails, clearErrors };

export default orderAction;
