import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducer.allProductsReducer,
  productDetails: productReducer.productDetailReducer,
  user: userReducer.loginRegisterUser,
  profile: userReducer.profileReducer,
  forgotPassword: userReducer.forgotPasswordReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
