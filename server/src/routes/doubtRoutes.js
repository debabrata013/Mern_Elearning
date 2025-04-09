const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubts');

// Create a new doubt
router.post('/', async (req, res) => {
  try {
    const { courseId,askedBy, title, description } = req.body;
    const newDoubt = new Doubt({ course: courseId,  askedBy, title, description });
    await newDoubt.save();
    res.status(201).json(newDoubt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all doubts for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const doubts = await Doubt.find({ course: req.params.courseId }).populate('askedBy', 'userName profileImage role') // You can customize the fields
    .populate('course', 'title');
    res.json(doubts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doubts for a specific student
router.get('/student/:studentId', async (req, res) => {
  try {
    const doubts = await Doubt.find({ askedBy: req.params.studentId }).populate('course');
    res.json(doubts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
