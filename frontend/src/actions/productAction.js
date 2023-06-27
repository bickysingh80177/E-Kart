import axios from "axios";

import productConstants from "../constants/productConstants";

// get all products - Admin
const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.ADMIN_PRODUCT_REQUESTS });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({
      type: productConstants.ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (err) {
    dispatch({
      type: productConstants.ADMIN_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Create new product
const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.NEW_PRODUCT_REQUESTS });
    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );
    dispatch({ type: productConstants.NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: productConstants.NEW_PRODUCT_FAIL,
      error: error.response.data.message,
    });
  }
};

// Delete new product
const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUESTS });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch({
      type: productConstants.DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: productConstants.DELETE_PRODUCT_FAIL,
      error: error.response.data.message,
    });
  }
};

// get all products
const getProducts =
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

// get product details
const getProductDetails = (id) => async (dispatch) => {
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
const clearErrors = () => async (dispatch) => {
  dispatch({
    type: productConstants.CLEAR_ERRORS,
  });
};

const productAction = {
  getAdminProducts,
  createProduct,
  deleteProduct,
  getProducts,
  getProductDetails,
  clearErrors,
};

export default productAction;
