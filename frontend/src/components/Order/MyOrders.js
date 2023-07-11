import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";

import "./MyOrders.css";
import orderAction from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/Metadata";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      // cellClassName: (params) => {
      //   if (params.formattedValue === "Processing") return "greenColor";
      //   else return "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Item Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // console.log(params.getValue(params.id, "id"));
        return (
          <Link to={`/orders/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

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
              // getCellClassName={(params) => {
              //   if (params.field === "status") {
              //     if (params.formattedValue === "Processing") {
              //       console.log("Processing");
              //       return "redColor";
              //     } else return "greenColor";
              //   }
              // }}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
