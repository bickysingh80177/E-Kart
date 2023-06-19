import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./ProductList.css";
import Metadata from "../layout/Metadata";
import productAction from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Sidebar from "./Sidebar";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch({ type: productAction.clearErrors });
    }
    dispatch({ type: productAction.getAdminProducts() });
  }, [dispatch, error, alert]);

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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((product) => {
      rows.push({
        id: product._id,
        name: product.name,
        stock: product.stock,
        price: product.price,
      });
    });

  return (
    <Fragment>
      <Metadata title={"ALL PRODUCTS - ADMIN"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">All Products</h1>
              <DataGrid
                columns={columns}
                rows={rows}
                pageSize={10}
                autoHeight
                disableSelectionOnClick
                className="productListTable"
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductList;

/* 
1. JADE
2. Grand Trontron
3. Cordlife
4. Hexagon
5. PTS consulting solution
6. atomberg

yet to open
1. Msys Technologies
2. go make my trip
3. Infoysis
4. ITC infotech
5. LTI Mindtree
6. Oracle

*/
