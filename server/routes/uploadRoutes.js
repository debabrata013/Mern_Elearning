const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');

// Route to upload a file
router.post('/', uploadFile);

module.exports = router;
