const User = require("../models/User");

// Get all pending to-dos
exports.getAllPendingTodos = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const pendingTodos = user.todos.filter(todo => todo.status === "pending");
        res.status(200).json({ pendingTodos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark a to-do as completed
exports.markTodoAsCompleted = async (req, res) => {
    try {
        const { todoId } = req.params;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const todo = user.todos.id(todoId);
        if (!todo) return res.status(404).json({ message: "To-Do not found" });

        todo.status = "completed";
        await user.save();
        res.status(200).json({ message: "To-Do marked as completed", todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a to-do
exports.deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.todos = user.todos.filter(todo => todo._id.toString() !== todoId);
        await user.save();

        res.status(200).json({ message: "To-Do deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit a to-do
exports.editTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { todo, status, priority, dueDate } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingTodo = user.todos.id(todoId);
        if (!existingTodo) return res.status(404).json({ message: "To-Do not found" });

        if (todo) existingTodo.todo = todo;
        if (status) existingTodo.status = status;
        if (priority) existingTodo.priority = priority;
        if (dueDate) existingTodo.dueDate = new Date(dueDate);

        await user.save();
        res.status(200).json({ message: "To-Do updated successfully", existingTodo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new to-do
exports.addTodo = async (req, res) => {
    try {
        const { todo, priority, dueDate } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newTodo = { todo, priority, dueDate: dueDate ? new Date(dueDate) : null };
        user.todos.push(newTodo);
        await user.save();

        res.status(201).json({ message: "To-Do added successfully", newTodo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
