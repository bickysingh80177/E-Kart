import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import RedeemIcon from "@mui/icons-material/Redeem";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Button from "@mui/material/Button";

import "./ProcessOrder.css";
import MetaData from "../layout/Metadata";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import orderConstants from "../../constants/orderConstants";
import orderAction from "../../actions/orderAction";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateOrder
  );

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);
    dispatch(orderAction.updateOrder(params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(orderAction.clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(orderAction.clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Processed Successfully");
      dispatch({ type: orderConstants.UPDATE_ORDERS_RESET });
    }

    dispatch(orderAction.getOrderDetails(params.id));
  }, [dispatch, alert, error, params, updateError, isUpdated, navigate]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmShippingArea">
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
                        {order &&
                          order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
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
                      {order.orderStatus &&
                      order.orderStatus === "Delivered" ? (
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
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>
                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : !!(false || status === "")}
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
