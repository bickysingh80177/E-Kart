import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import RedeemIcon from "@mui/icons-material/Redeem";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

import "./OrderDetails.css";
import Metadata from "../layout/Metadata";
import orderAction from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(orderAction.clearErrors());
    }
    dispatch(orderAction.getOrderDetails(params.id));
  }, [dispatch, alert, error, params.id]);

  return (
    <Fragment>
      <Metadata title="Order Detail" />
      {loading ? (
        <Loader />
      ) : isAuthenticated === false ? (
        navigate("/login")
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode} ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  {/* <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p> */}
                  {order.paymentInfo &&
                  order.paymentInfo.status === "succeeded" ? (
                    <p>
                      <CheckCircleIcon className="greenColor" />
                      PAID
                    </p>
                  ) : (
                    <p>
                      <SmsFailedIcon className="redColor" />
                      NOT PAID
                    </p>
                  )}
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  {/* <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p> */}
                  {order.orderStatus && order.orderStatus === "Delivered" ? (
                    <p>
                      <RedeemIcon className="greenColor" />
                      {order.orderStatus && order.orderStatus}
                    </p>
                  ) : (
                    <p>
                      <HourglassTopIcon className="redColor" />
                      {order.orderStatus && order.orderStatus}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        ₹{item.price}X {item.quantity} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
