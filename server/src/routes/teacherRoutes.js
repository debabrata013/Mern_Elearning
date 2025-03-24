const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { getAllCourse } =require('../controllers/teacherController');

// Create a new teacher
router.post('/', teacherController.createTeacher);

router.get('/', teacherController.getAllTeachers);
// Read teacher information
router.get('/id/:id', teacherController.getTeacher);

// Read teacher information by name
router.get('/name/:userName', teacherController.getTeacherByName);  

// Update teacher information
router.put('/:id', teacherController.updateTeacher);

// Delete a teacher
router.delete('/:id', teacherController.deleteTeacher);

router.get('/get',teacherController.getAllCourse)

module.exports = router;
