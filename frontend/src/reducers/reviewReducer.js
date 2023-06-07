import reviewConstants from "../constants/reviewConstants";

const newReviewReducer = (state = [], action) => {
  switch (action.type) {
    case reviewConstants.NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case reviewConstants.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case reviewConstants.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case reviewConstants.NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case reviewConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const reviewReducer = {
  newReviewReducer,
};

export default reviewReducer;
