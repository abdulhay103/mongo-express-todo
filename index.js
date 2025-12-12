require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoHandaler = require("./route-handalers/todoHandaler");

// express app setup
const app = express();
app.use(express.json());

// Port configuration
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Route handlers can be added here
app.use("/todos", todoHandaler);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
