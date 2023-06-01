import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

import "./OrderSuccess.css";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : isAuthenticated === false ? (
        navigate("/login")
      ) : (
        <Fragment>
          <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Your Order has been placed successfully</Typography>
            <Link to="/order/me">View Orders</Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderSuccess;
