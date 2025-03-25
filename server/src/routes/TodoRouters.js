const express = require("express");
const router = express.Router();
const todoController = require("../controllers/TodoController");


// Get all pending to-dos
router.get("/todos/pending",  todoController.getAllPendingTodos);

// Add a new to-do
router.post("/todos",  todoController.addTodo);

// Edit a to-do
router.put("/todos/:todoId",  todoController.editTodo);

// Mark a to-do as completed
router.patch("/todos/:todoId/complete",  todoController.markTodoAsCompleted);

// Delete a to-do
router.delete("/todos/:todoId",  todoController.deleteTodo);

module.exports = router;