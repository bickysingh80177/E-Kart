import axios from "axios";

import productConstants from "../constants/productConstants";

// get all products
export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 1000000],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: productConstants.ALL_PRODUCT_REQUESTS,
      });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lt]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lt]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        // link += `&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: productConstants.ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: productConstants.ALL_PRODUCT_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.PRODUCT_DETAILS_REQUESTS,
    });

    const { data } = await axios.get(`/api/v1/products/${id}`);
    // console.log(data);

    dispatch({
      type: productConstants.PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: productConstants.PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: productConstants.CLEAR_ERRORS,
  });
};

// const productActions = { getProduct, clearErrors };

// export default productActions;
