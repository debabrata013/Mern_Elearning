const express = require('express');
const router = express.Router();
const { updatePassword,updateProfile } = require('../controllers/profileController');


// Route for updating user profile
router.put('/',  updateProfile);
router.put("/password",updatePassword)

module.exports = router;