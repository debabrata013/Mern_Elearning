const express = require('express');
const router = express.Router();
const picController = require('../controllers/piccontroller');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload a picture
router.post('/upload', upload.fields([{ name: 'profileImage', maxCount: 1 }]), picController.profilepic);

module.exports = router;
