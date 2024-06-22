const express = require("express");
const mongoose = require("mongoose");
// const Product = require("./models/product.model.js");
const product = require("./routes/product.route");
const app = express();
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handlers.js");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/products", product);
app.use(notFound);
app.use(errorHandlerMiddleware);
// port and connection running server
const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Connected to database!");
  } catch (error) {
    console.log(error);
  }
};

start();
