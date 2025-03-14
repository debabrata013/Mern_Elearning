const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup
router.post('/signup', authController.signup);

// Login
router.post('/login', authController.login);

// Forget Password
router.post('/forget-password', authController.forgetPassword);

// Route to check OTP and update password
router.post('/check-otp', authController.checkOtpAndUpdatePassword);

module.exports = router;