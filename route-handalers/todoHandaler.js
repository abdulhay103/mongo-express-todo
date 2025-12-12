const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");

const router = express.Router();

const Todo = mongoose.model("Todo", todoSchema);

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ status: { $ne: "completed" } })
      .select({
        date: 0,
      })
      .limit(3);
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

// Create a single todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Error creating todo" });
  }
});

// Create multiple todos
router.post("/all", async (req, res) => {
  try {
    const newTodos = await Todo.insertMany(req.body);
    res.status(201).json(newTodos);
  } catch (error) {
    console.error("Error creating todos:", error);
    res.status(500).json({ error: "Error creating todos" });
  }
});

// Update a todo by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Error updating todo" });
  }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Error deleting todo" });
  }
});

module.exports = router;
