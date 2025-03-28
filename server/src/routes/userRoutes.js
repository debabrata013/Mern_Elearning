const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/admin', userController.updateuserProfileadmin);
router.put('/teacher/', userController.updateTeacherProfile);
router.put('/student', userController.updateuserProfile);

module.exports = router;
