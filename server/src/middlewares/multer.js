const multer = require('multer');


// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffer

const upload = multer({ storage });

module.exports = upload;