const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubts');
const { route } = require('./messageRoutes');

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

router.get('/:id', async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id).populate('askedBy', 'userName profileImage role')
    .populate('course', 'title');
    if (!doubt) return res.status(404).json({ message: 'Doubt not found' });
    res.json(doubt);
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
router.put("/:doubtId/resolve", async (req, res) => {
  const { doubtId } = req.params;

  try {
    // Find the doubt by ID
    const doubt = await Doubt.findById(doubtId);

    // If doubt not found
    if (!doubt) {
      return res.status(404).json({ message: "Doubt not found" });
    }

    // Update isResolved to true
    doubt.isResolved = true;

    // Save the updated doubt
    await doubt.save();

    res.status(200).json({
      message: "Doubt marked as resolved",
      updatedDoubt: doubt,
    });
  } catch (error) {
    console.error("Error resolving doubt:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
