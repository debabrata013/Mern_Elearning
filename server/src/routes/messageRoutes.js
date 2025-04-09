const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/:doubtId', async (req, res) => {
  const messages = await Message.find({ doubt: req.params.doubtId }).populate('sender');
  res.json(messages);
});

module.exports = router;
