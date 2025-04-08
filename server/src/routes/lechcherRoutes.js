const express = require('express');
const router = express.Router();

const {
  
  uploadResource,
  deleteVideo,
  deleteResource,
  uploadVideo
} = require('../controllers/lechervideoController');
const upload = require('../middlewares/multer');
// Upload video
router.post('/video/:courseId/:chapterId',upload.single('video'), uploadVideo);
// router.post('/vid', uploadVideo);

// // Upload resource
router.post('/resource/:courseId/:chapterId', upload.single('resource'), uploadResource);

// Delete video (by lesson ID)
router.delete('/video/:courseId/:chapterId/:lessonId', deleteVideo);

// Delete resource (by resource ID)
router.delete('/resource/:courseId/:chapterId/:resourceId', deleteResource);

module.exports = router;
