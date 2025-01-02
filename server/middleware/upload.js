const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage });

module.exports = upload;
