const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.post('/teachers', upload.single('profileImage'), userController.createTeacher);
router.post('/students', upload.single('profileImage'), userController.createStudent);
router.get('/teachers', userController.getAllTeachers);
router.get('/students', userController.getAllStudents);
router.delete('/user/:id', userController.deleteUser);
router.post('/admins', userController.createAdmin);
// router.get('/user/:email', userController.getUserByEmail);
// router.get("/user/:name", userController.getUserByName);
// router.get('/user/:id', userController.getUserById);
// router.put('/user/:id', userController.updateUser);
// router.delete('/user/:id', userController.deleteUser);


module.exports = router;
