import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import "./Dashboard.css";
import Sidebar from "./Sidebar";
import NotAuthorized from "./NotAuthorized.js";
import Loader from "../layout/Loader/Loader";
import productAction from "../../actions/productAction";

Chart.register(...registerables);

const Dashboard = () => {
  // const { user } = useSelector((state) => state.user);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);

  let outOfStocks = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) outOfStocks += 1;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStocks, products.length - outOfStocks],
      },
    ],
  };

  useEffect(() => {
    dispatch(productAction.getAdminProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {/* {role === "admin" ? ( */}
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard </Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Total amount <br /> ₹2000
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
      {/* ) : (
        navigate("/account")
      )} */}
    </Fragment>
  );
};

export default Dashboard;
