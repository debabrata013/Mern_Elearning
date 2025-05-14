const express = require('express');
const router = express.Router();
const {
  getUnassignedCourses,
  assignCourseToStudent,
  removeCourseFromStudent,
  getAssignedCourses  // <-- add this
} = require('../controllers/courseAssignmentController');

// Get all courses not assigned to the student
router.get('/unassigned/:studentId', getUnassignedCourses);

// Get all courses assigned to the student
router.get('/assigned/:studentId', getAssignedCourses);  // <-- new route

// Assign a course to a student
router.post('/assign', assignCourseToStudent);

// Remove a course from a student
router.post('/remove', removeCourseFromStudent);

module.exports = router;
