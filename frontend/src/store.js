import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import reviewReducer from "./reducers/reviewReducer";

const reducer = combineReducers({
  products: productReducer.allProductsReducer,
  adminProducts: productReducer.adminProducts,
  newProduct: productReducer.newProductReducer,
  updateProduct: productReducer.updateProductReducer,
  delProduct: productReducer.deleteProductReducer,
  productDetails: productReducer.productDetailReducer,
  allOrders: orderReducer.allOrdersReducer,
  updateOrder: orderReducer.updateOrderReducer,
  delOrder: orderReducer.deleteOrderReducer,
  user: userReducer.loginRegisterUser,
  profile: userReducer.profileReducer,
  forgotPassword: userReducer.forgotPasswordReducer,
  cart: cartReducer.addToCart,
  newOrder: orderReducer.newOrder,
  myOrders: orderReducer.myOrders,
  orderDetails: orderReducer.orderDetails,
  newReview: reviewReducer.newReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
