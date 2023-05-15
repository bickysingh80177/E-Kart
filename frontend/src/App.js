import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import webFont from "webfontloader";
import { useSelector } from "react-redux";

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

function App() {
  // const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(userAction.loadUser());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginRegister />} />
          <Route exact path="/account" element={<Profile />} />
          {/* {isAuthenticated === true ? (
          ) : (
            <Route exact path="/login" element={<LoginRegister />} />
          )} */}
          {/* <ProtectedRoute exact path="/account" component={Profile} /> */}
          {/* <Route
            exact
            path="/account"
            render={(props) => {
              if (isAuthenticated) return <Profile {...props} />;
              else return <LoginRegister />;
            }}
          /> */}
          {/* {isAuthenticated === true && ( */}
          <Route exact path="/profile/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          {/* )} */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
