const catchAsyncErrors = require("../middleware/asyncError");
const dotenv = require("dotenv").config({ path: "backend/config/.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// process the payment
const processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "INR",
    metadata: {
      company: "Best-Kart",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

// sending the stripe secret key to the frontend
const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: `${process.env.STRIPE_PUBLIC_KEY}` });
});

exports.paymentController = {
  processPayment,
  sendStripeApiKey,
};
