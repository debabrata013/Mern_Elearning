const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ 1. Create a new To-Do for a user
router.post('/create', async (req, res) => {
  const { userId, todo } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.todos.push({ todo });
    await user.save();

    res.status(201).json({ message: 'Todo added successfully', todos: user.todos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// ✅ 2. Get all pending To-Dos for a user
router.get('/pending/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const pendingTodos = user.todos.filter(todo => todo.status === 'pending');
    res.status(200).json(pendingTodos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending todos' });
  }
});

// ✅ 3. Get total number of pending To-Dos
router.get('/pending-count/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const pendingCount = user.todos.filter(todo => todo.status === 'pending').length;
    res.status(200).json({ pendingCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get pending count' });
  }
});

// ✅ 4. Delete a To-Do
router.delete('/delete/:userId/:todoId', async (req, res) => {
  const { userId, todoId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Ensure proper comparison by converting both to strings
    const initialTodoCount = user.todos.length;
    user.todos = user.todos.filter(todo => todo._id.toString() !== todoId);

    if (user.todos.length === initialTodoCount) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await user.save();

    res.status(200).json({ message: 'Todo deleted successfully', todos: user.todos });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
