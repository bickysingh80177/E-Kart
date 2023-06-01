import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";

import "./MyOrders.css";
import orderAction from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/Metadata";

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const columns = [];
  const rows = [];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(orderAction.clearErrors());
    }
    dispatch(orderAction.myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user?.name} - Order`} />
      {loading ? (
        <Loader />
      ) : isAuthenticated === false ? (
        navigate("/login")
      ) : (
        <Fragment>
          <div className="myOrdersPage">
            <Typography id="myOrdersHeading">{`${user.name}'s Orders`}</Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
