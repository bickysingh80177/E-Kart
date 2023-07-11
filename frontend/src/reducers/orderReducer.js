import orderConstants from "../constants/orderConstants";

// Admin
const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case orderConstants.ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case orderConstants.ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.UPDATE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderConstants.UPDATE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case orderConstants.UPDATE_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case orderConstants.UPDATE_ORDERS_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    default:
      return {
        ...state,
      };
  }
};

const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.DELETE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderConstants.DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case orderConstants.DELETE_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case orderConstants.DELETE_ORDERS_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return {
        ...state,
      };
  }
};

const newOrder = (state = [], action) => {
  switch (action.type) {
    case orderConstants.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderConstants.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case orderConstants.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const myOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case orderConstants.MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case orderConstants.MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// order detail reducer
const orderDetails = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderConstants.ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case orderConstants.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case orderConstants.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const orderReducer = {
  allOrdersReducer,
  updateOrderReducer,
  deleteOrderReducer,
  newOrder,
  myOrders,
  orderDetails,
};

export default orderReducer;
