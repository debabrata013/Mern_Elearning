// create the routes for all the controller lechervideoController.js 

const express = require('express');
const router = express.Router();
const lechervideoController = require('../controllers/lechervideoController');

// Route to get all videos
router.get('/videos', lechervideoController.getAllVideos);

// Route to get a specific video by ID
router.get('/videos/:id', lechervideoController.getVideoById);

// Route to create a new video
router.post('/videos', lechervideoController.createVideo);

// Route to update a video by ID
router.put('/videos/:id', lechervideoController.updateVideo);

// Route to delete a video by ID
router.delete('/videos/:id', lechervideoController.deleteVideo);

module.exports = router;

