const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);  // Create a new user
router.get('/users', userController.getAllUsers);  // Get all users
router.get('/users/:id', userController.getUserById);  // Get user by ID
router.put('/users/:id', userController.updateUser);  // Update user by ID
router.delete('/users/:id', userController.deleteUser);  // Delete user by ID

router.get('/teachers', userController.getAllTeachers);  // Get all teachers
router.get('/students', userController.getAllStudents);  // Get all students


router.post('/users/:userId/courses/:courseId', userController.addCourseToStudent);  // Add a course to student

module.exports = router;
