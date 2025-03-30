const express = require('express');
const router = express.Router();
const picController = require('../controllers/piccontroller');

// Route to upload a picture
router.post('/upload', picController.profilepic);

module.exports = router;