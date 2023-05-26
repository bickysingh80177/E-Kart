import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./Payment.css";
import CheckoutSteps from "./CheckoutSteps";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";

const Payment = ({ stripeKey }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  //   const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment.");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      {/* <Elements stripe={loadStripe(stripeKey)}> */}
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated === true && (
          <Fragment>
            <Metadata title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
              <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                <Typography>Card Info</Typography>
                <div>
                  <CreditCardIcon />
                  <CardNumberElement className="paymentInput" />
                </div>
                <div>
                  <EventIcon />
                  <CardExpiryElement className="paymentInput" />
                </div>
                <div>
                  <VpnKeyIcon />
                  <CardCvcElement className="paymentInput" />
                </div>
                <input
                  type="submit"
                  value={`Pay ₹${orderInfo?.totalPrice}`}
                  ref={payBtn}
                  className="paymentFormBtn"
                />
              </form>
            </div>
          </Fragment>
        )
      )}
      {/* </Elements> */}
    </Fragment>
  );
};

export default Payment;
