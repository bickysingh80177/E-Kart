/* import React, { Fragment } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    {loading === false && (
      <Route
        {...rest}
        render={(props)=>{
          if(isAuthenticated)
        }}
      />
    )}
  )
      // {loading === false && (
      //   <Route
      //     {...rest}
      //     render={(props) => {
      //       if (isAuthenticated === false) {
      //         return <Navigate to="/login" />;
      //       }
      //       <Component {...props} />;
      //     }}
      //   />)
      // }
  
};

export default ProtectedRoute;
 */

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    // <Fragment>
    // {loading === false && (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === false) {
          return navigate("/login");
        }

        return <Component {...props} />;
      }}
    />
    // )}
    // </Fragment>
  );
};

export default ProtectedRoute;
