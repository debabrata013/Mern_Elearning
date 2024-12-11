const express = require('express');
const router = express.Router();
const { getProgress, updateProgress } = require('../controllers/progressController');

// Route to get course progress
router.get('/:userId/:courseId', getProgress);

// Route to update course progress
router.put('/:userId/:courseId', updateProgress);

module.exports = router;
