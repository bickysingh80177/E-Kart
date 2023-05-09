const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const app = require("./app");
const connectDB = require("./config/database");

// Handling uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exceptions`);
  process.exit(1);
});

// setting up the project configuration file
dotenv.config({ path: "backend/config/.env" });

// connecting to the database
connectDB();

// setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
