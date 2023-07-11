import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./ProductList.css";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import Sidebar from "./Sidebar";
import orderAction from "../../actions/orderAction";
import orderConstants from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  //   const data = useSelector((state) => state.allOrders);
  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.delOrder
  );

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(orderAction.clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(orderAction.clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: orderConstants.DELETE_ORDERS_RESET });
      navigate("/admin/orders");
    }

    dispatch(orderAction.getAllOrders());
  }, [dispatch, error, alert, deleteError, isDeleted, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(orderAction.deleteOrder(id));
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemQty",
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
      type: "number",
      sortable: false,
      minwidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        itemQty: item.orderItems.length,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  return (
    <Fragment>
      <Metadata title={"ALL Orders -- ADMIN"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">All Orders</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight={false}
                disableSelectionOnClick
                className="productListTable"
                sx={{ overflowX: "scroll" }}
                getCellClassName={(params) => {
                  const status = params.formattedValue === "Processing";
                  if (status) {
                    return "redColor";
                  } else {
                    return "greenColor";
                  }
                }}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderList;
