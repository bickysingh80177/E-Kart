const express = require("express");

const { paymentController } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/payment/process",
  isAuthenticatedUser,
  paymentController.processPayment
);
router.get(
  "/stripeapikey",
  isAuthenticatedUser,
  paymentController.sendStripeApiKey
);

exports.paymentRouter = router;
