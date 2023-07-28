import axios from "axios";

import reviewConstants from "../constants/reviewConstants";

// new Review
const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: reviewConstants.NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put("/api/v1/review", reviewData, config);

    dispatch({
      type: reviewConstants.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: reviewConstants.NEW_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

// get all reviews for a product -- Admin
const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: reviewConstants.ALL_REVIEW_REQUEST });
    const { data } = await axios.get(`/api/v1/reviews?id=${productId}`);
    dispatch({
      type: reviewConstants.ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (err) {
    dispatch({
      type: reviewConstants.ALL_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Delete Product Review -- Admin
const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: reviewConstants.DELETE_REVIEW_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );
    dispatch({
      type: reviewConstants.DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: reviewConstants.DELETE_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Clearning errors
const clearErrors = () => async (dispatch) => {
  dispatch({ type: reviewConstants.CLEAR_ERRORS });
};

const reviewAction = { newReview, getAllReviews, deleteReview, clearErrors };

export default reviewAction;
