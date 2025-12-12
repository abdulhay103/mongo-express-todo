const express = require("express");
const Router = express.Router();

//Get all todos
Router.get("/", async (req, res) => {
  res.send("Get all todos");
});

//Create a new todo
Router.post("/", (req, res) => {
  res.send("Create a new todo");
});
module.exports = Router;
