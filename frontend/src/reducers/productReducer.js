import productConstants from "../constants/productConstants";

const allProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productConstants.ALL_PRODUCT_REQUESTS:
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

    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
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
  allProductsReducer,
  productDetailReducer,
};

export default productReducer;
