import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginRegister from "./components/User/LoginRegister";
import store from "./store";
import userAction from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NotFoundPage from "./components/NotFoundPage.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";

function App() {
  // const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(userAction.loadUser());
    getStripeApiKey();
  }, [stripeApiKey]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginRegister />} />
          <Route
            exact
            path="/account"
            element={<ProtectedRoute component={<Profile />} />}
          />
          <Route
            exact
            path="/profile/update"
            element={<ProtectedRoute component={<UpdateProfile />} />}
          />
          <Route
            exact
            path="/password/update"
            element={<ProtectedRoute component={<UpdatePassword />} />}
          />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/cart"
            element={<ProtectedRoute component={<Cart />} />}
          />
          <Route
            exact
            path="/shipping"
            element={<ProtectedRoute component={<Shipping />} />}
          />
          {stripeApiKey && (
            <Route
              exact
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment stripeKey={stripeApiKey} />
                </Elements>
              }
            />
          )}
          <Route
            exact
            path="/success"
            element={<ProtectedRoute component={<OrderSuccess />} />}
          />
          <Route
            exact
            path="/orders"
            element={<ProtectedRoute component={<MyOrders />} />}
          />
          <Route
            exact
            path="/order/confirm"
            element={<ProtectedRoute component={<ConfirmOrder />} />}
          />
          <Route
            exact
            path="/orders/:id"
            element={<ProtectedRoute component={<OrderDetails />} />}
          />

          {/* admin routes */}
          <Route
            exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true} component={<Dashboard />} />
            }
          />
          <Route
            exact
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true} component={<ProductList />} />
            }
          />
          <Route
            exact
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true} component={<NewProduct />} />
            }
          />
          <Route
            exact
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true} component={<UpdateProduct />} />
            }
          />
          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true} component={<OrderList />} />
            }
          />
          <Route
            exact
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true} component={<ProcessOrder />} />
            }
          />
          <Route
            exact
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true} component={<UsersList />} />
            }
          />
          <Route
            exact
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true} component={<UpdateUser />} />
            }
          />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
