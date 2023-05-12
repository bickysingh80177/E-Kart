import axios from "axios";
import { Navigate } from "react-router-dom";

import userConstants from "../constants/userConstants,";

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

// Clearing errors
const clearError = () => async (dispatch) => {
  dispatch({ type: userConstants.CLEAR_ERRORS });
};

const userAction = {
  userLogin,
  clearError,
  userRegister,
  loadUser,
  updateProfile,
  userLogout,
};

export default userAction;
