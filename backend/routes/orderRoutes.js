const express = require("express");

const { orderController } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .post("/order/new", isAuthenticatedUser, orderController.placeNewOrder)
  .get("/order/me", isAuthenticatedUser, orderController.userOrder)
  .get("/order/:id", isAuthenticatedUser, orderController.getSingleOrder)
  .get(
    "/admin/orders",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    orderController.getAllOrders
  )
  .put(
    "/admin/order/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    orderController.updateOrder
  )
  .delete(
    "/admin/order/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    orderController.deleteOrder
  );

exports.orderRouter = router;
