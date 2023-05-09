const mongoose = require("mongoose");
// require("dotenv").config({ path: "./config.env" });

// const dbLink = process.env.DATABASE_URI;
// console.log(process.env.DATABASE_URI);

const connectDB = () => {
  mongoose
    // .connect(dbLink)
    .connect("mongodb://localhost:27017/E-commerce")
    .then((data) => {
      console.log("Server connected to the database successfully");
      console.log(`Link: ${data.connection.host}`);
    });
};

module.exports = connectDB;
