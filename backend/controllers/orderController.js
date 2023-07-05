const model = require("../models/orderModel");
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/asyncError");

const Order = model.orderModel;
const Product = productModel.productModel;

// Create new order
const placeNewOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("Order with the given id is not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user orders
const userOrder = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id;
  const orders = await Order.find({ user: id }).populate("user", "name email");

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders -- Admin
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order status -- Admin
const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return next(new ErrorHandler("Order not found with given id", 404));
  }

  if (order.orderStatus === "Delivered") {
    next(new ErrorHandler("You have already Delivered this produce", 400));
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
};

// delete order -- Admin
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = Order.findById(id);

  if (!order) {
    return next(new ErrorHandler("Order not found with provided id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

exports.orderController = {
  placeNewOrder,
  getSingleOrder,
  userOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
