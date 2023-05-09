import userConstants from "../constants/userConstants,";

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
      return {
        ...state,
        loading: true,
      };

    case userConstants.UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        ...state,
        isUpdated: action.payload,
      };

    case userConstants.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case userConstants.UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false,
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
};

export default userReducer;
