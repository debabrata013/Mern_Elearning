const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Create a new message
router.post('/', async (req, res) => {
  try {
    const { doubtId, sender, message } = req.body;
    const newMessage = new Message({ doubt: doubtId, sender, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all messages for a doubt
router.get('/:doubtId', async (req, res) => {
  try {
    const messages = await Message.find({ doubt: req.params.doubtId }).populate('sender', 'userName role');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
