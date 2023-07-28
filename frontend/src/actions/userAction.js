import axios from "axios";
import { Navigate } from "react-router-dom";

import userConstants from "../constants/userConstants";

// get all users -- Admin
const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.ALL_USER_REQUEST });
    const { data } = await axios.get("/api/v1/admin/users");
    dispatch({ type: userConstants.ALL_USER_SUCCESS, payload: data.users });
  } catch (err) {
    dispatch({
      type: userConstants.ALL_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};

// get user details -- Admin
const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch({
      type: userConstants.USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: userConstants.USER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// update user details -- Admin
const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.UPDATE_USER_REQUEST });
    const config = { "Content-Type": "application/json" };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );
    dispatch({ type: userConstants.UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: userConstants.UPDATE_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};

// delete user -- Admin
const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: userConstants.DELETE_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};

// login
const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.LOGIN_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    // console.log(data);

    dispatch({ type: userConstants.LOGIN_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({
      type: userConstants.LOGIN_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Register
const userRegister = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.REGISTER_USER_REQUEST,
    });

    const config = { header: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch({
      type: userConstants.REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: userConstants.REGISTER_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Load User
const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.LOAD_USER_REQUEST });
    const { data } = await axios.get("/api/v1/me");
    dispatch({ type: userConstants.LOAD_USER_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({
      type: userConstants.LOAD_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Logout User
const userLogout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({ type: userConstants.LOGOUT_SUCCESS });
    <Navigate to="/login" />;
  } catch (err) {
    dispatch({
      type: userConstants.LOGOUT_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Update Profile
const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.UPDATE_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      "/api/v1/profile/update",
      userData,
      config
    );
    dispatch({
      type: userConstants.UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: userConstants.UPDATE_PROFILE_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Update Password
const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.UPDATE_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/password/update",
      password,
      config
    );
    dispatch({
      type: userConstants.UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: userConstants.UPDATE_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Forgot Password
const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/password/forgot", email, config);
    dispatch({
      type: userConstants.FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: userConstants.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );
    dispatch({
      type: userConstants.RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: userConstants.RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing errors
const clearError = () => async (dispatch) => {
  dispatch({ type: userConstants.CLEAR_ERRORS });
};

const userAction = {
  // Admin actions
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,

  userLogin,
  userRegister,
  loadUser,
  updateProfile,
  userLogout,
  updatePassword,
  forgotPassword,
  resetPassword,
  clearError,
};

export default userAction;
