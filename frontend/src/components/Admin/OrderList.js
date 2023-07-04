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
import productConstants from "../../constants/productConstants";
import orderAction from "../../actions/orderAction";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

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
      alert.success("Product Deleted Successfully");
      dispatch({ type: productConstants.DELETE_PRODUCT_RESET });
      navigate("/admin/dashboard");
    }

    dispatch(orderAction.getAllOrders());
  }, [dispatch, error, alert, deleteError, isDeleted, navigate]);

  const deleteProductHandler = (id) => {
    // dispatch(productAction.deleteProduct(id));
  };

  const columns = [
    { field: "id", headerName: "Product Id", minwidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minwidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minwidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minwidth: 270,
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
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((product) => {
      rows.push({
        id: product._id,
        name: product.name,
        stock: product.stock,
        price: product.price,
      });
    });

  return (
    <Fragment>
      <Metadata title={"ALL orders - ADMIN"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">All Products</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight={false}
                disableSelectionOnClick
                className="productListTable"
                sx={{ overflowX: "scroll" }}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderList;
