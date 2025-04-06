const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
  
  uploadResource,
  deleteVideo,
  deleteResource,
  uploadVideo
} = require('../controllers/lechervideoController');

// Upload video
router.post('video/:courseId/:chapterId', upload.single('video'), uploadVideo);

// Upload resource
router.post('resource/:courseId/:chapterId', upload.single('resource'), uploadResource);

// Delete video
router.delete('video/:courseId/:chapterId/:lessonId', deleteVideo);

// Delete resource
router.delete('resource/:courseId/:chapterId/:resourceId', deleteResource);

module.exports = router;
