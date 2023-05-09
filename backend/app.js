const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const { productRouter } = require("./routes/productRoutes");
const { userRouter } = require("./routes/userRoutes");
const { orderRouter } = require("./routes/orderRoutes");
const errorMiddleware = require("./middleware/error");

const app = express();

// applying the middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

// middleware for error
app.use(errorMiddleware);

module.exports = app;
