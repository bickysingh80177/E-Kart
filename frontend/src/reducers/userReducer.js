import userConstants from "../constants/userConstants";

const loginRegisterUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
    case userConstants.REGISTER_USER_REQUEST:
    case userConstants.LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case userConstants.LOGIN_SUCCESS:
    case userConstants.REGISTER_USER_SUCCESS:
    case userConstants.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case userConstants.LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case userConstants.LOGIN_FAIL:
    case userConstants.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case userConstants.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case userConstants.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.UPDATE_PROFILE_REQUEST:
    case userConstants.UPDATE_PASSWORD_REQUEST:
    case userConstants.UPDATE_USER_REQUEST:
    case userConstants.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userConstants.UPDATE_PROFILE_SUCCESS:
    case userConstants.UPDATE_PASSWORD_SUCCESS:
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
        message: action.payload.message,
      };

    case userConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case userConstants.UPDATE_PROFILE_FAIL:
    case userConstants.UPDATE_PASSWORD_FAIL:
    case userConstants.UPDATE_USER_FAIL:
    case userConstants.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case userConstants.UPDATE_PROFILE_RESET:
    case userConstants.UPDATE_PASSWORD_RESET:
    case userConstants.UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case userConstants.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.FORGOT_PASSWORD_REQUEST:
    case userConstants.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case userConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case userConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case userConstants.FORGOT_PASSWORD_FAIL:
    case userConstants.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Admin Reducers
const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userConstants.ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case userConstants.ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userConstants.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case userConstants.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const userReducer = {
  loginRegisterUser,
  profileReducer,
  forgotPasswordReducer,
  // admin reducers
  allUsersReducer,
  userDetailsReducer,
};

export default userReducer;
