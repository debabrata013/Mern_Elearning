const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route to get all messages for a specific course
router.get('/course/:courseId', chatController.getChatMessages);

// Route to send a text message
router.post('/course/:courseId/message', chatController.sendTextMessage);

// Route to upload media (image or video) to AWS S3
router.post('/course/:courseId/media', chatController.uploadMedia);

// Route to send a media message (with URL from S3)
router.post('/course/:courseId/message/media', chatController.sendMediaMessage);

module.exports = router;
