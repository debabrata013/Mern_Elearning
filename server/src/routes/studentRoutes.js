const express = require('express');
const router = express.Router();
const {createStudent, getStudent, getAllStudents, getStudentByName, updateStudent, deleteStudent} = require('../controllers/studentController');

// Create a new student
router.post('/', createStudent);

// Read student information
router.get('/:id', getStudent);

// Read all students
router.get('/', getAllStudents);

// Get student information by name
router.get('/name/:userName', getStudentByName);


// Update student information
router.put('/:id', updateStudent);

// Delete a student
router.delete('/:id', deleteStudent);

module.exports = router;