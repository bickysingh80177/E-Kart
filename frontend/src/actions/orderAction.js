import axios from "axios";

import orderConstants from "../constants/orderConstants";

// get all orders -- Admin
const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: orderConstants.ALL_ORDERS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch({ type: orderConstants.ALL_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: orderConstants.ALL_ORDERS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// update order -- Admin
const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: orderConstants.UPDATE_ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.put(`/api/v1/admin/order/${id}`, order, config);
    dispatch({ type: orderConstants.UPDATE_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: orderConstants.UPDATE_ORDERS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// delete order -- Admin
const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: orderConstants.DELETE_ORDERS_REQUEST });
    const data = await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch({
      type: orderConstants.DELETE_ORDERS_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: orderConstants.DELETE_ORDERS_FAIL,
      payload: err.response.data.message,
    });
  }
};

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

const orderAction = {
  getAllOrders,
  updateOrder,
  deleteOrder,
  createOrder,
  myOrders,
  getOrderDetails,
  clearErrors,
};

export default orderAction;
