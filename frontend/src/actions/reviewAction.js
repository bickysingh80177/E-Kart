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
  } catch (error) {}
};

const reviewAction = { newReview };

export default reviewAction;
