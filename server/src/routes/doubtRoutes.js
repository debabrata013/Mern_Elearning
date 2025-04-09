const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubts');

router.post('/', async (req, res) => {
  const doubt = await Doubt.create(req.body);
  res.status(201).json(doubt);
});

router.get('/course/:courseId', async (req, res) => {
  const doubts = await Doubt.find({ course: req.params.courseId })
    .populate('askedBy directedTo');
  res.json(doubts);
});

router.patch('/:id/resolve', async (req, res) => {
  const updated = await Doubt.findByIdAndUpdate(req.params.id, { isResolved: true }, { new: true });
  res.json(updated);
});

module.exports = router;
