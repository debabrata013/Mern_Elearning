const express = require('express');
const router = express.Router();
const { createCourse, addChapter } = require('../controllers/courseController');

// Route to create a course
router.post('/', createCourse);

// Route to add a chapter to a course
router.post('/:courseId/chapters', addChapter);

module.exports = router;
