const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/admin', userController.updateuserProfileadmin);
router.post('/teacher', userController.updateTeacherProfile);
router.post('/student', userController.updateuserProfile);

module.exports = router;
