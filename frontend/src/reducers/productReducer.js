import productConstants from "../constants/productConstants";

// Admin Operations
const adminProducts = (state = { products: [] }, action) => {
  switch (action.type) {
    case productConstants.ADMIN_PRODUCT_REQUESTS:
      return {
        loading: true,
        products: [],
      };

    case productConstants.ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case productConstants.ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const newProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case productConstants.NEW_PRODUCT_REQUESTS:
      return {
        ...state,
        loading: true,
      };

    case productConstants.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case productConstants.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    case productConstants.NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// delete product
const deleteProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case productConstants.DELETE_PRODUCT_REQUESTS:
      return {
        ...state,
        loading: true,
      };

    case productConstants.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case productConstants.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case productConstants.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// User Operations
const allProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productConstants.ALL_PRODUCT_REQUESTS:
      console.log("ADMIN REQUEST");
      return {
        loading: true,
        products: [],
      };

    case productConstants.ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case productConstants.ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_DETAILS_REQUESTS:
      return {
        loading: true,
        ...state,
      };

    case productConstants.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case productConstants.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const productReducer = {
  adminProducts,
  newProductReducer,
  deleteProductReducer,
  allProductsReducer,
  productDetailReducer,
};

export default productReducer;
