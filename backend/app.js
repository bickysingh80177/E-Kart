const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const { productRouter } = require("./routes/productRoutes");
const { userRouter } = require("./routes/userRoutes");
const { orderRouter } = require("./routes/orderRoutes");
const { paymentRouter } = require("./routes/paymentRoute");
const errorMiddleware = require("./middleware/error");

const app = express();

// setting up the project configuration file
dotenv.config({ path: "backend/config/.env" });

// applying the middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// middleware for error
app.use(errorMiddleware);

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

module.exports = app;
