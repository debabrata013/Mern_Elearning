// courseRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer to use memory storage (suitable for S3 uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Import the course controllers
const courseController = require('../controllers/courseController');

/**
 * @route   POST /courses
 * @desc    Create a new course with file uploads (coverImage, introVideo, syllabusPDF)
 */
router.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'introVideo', maxCount: 1 },
    { name: 'syllabusPDF', maxCount: 1 },
    {name: "material", maxCount: 1}
  ]),
  courseController.createCourse
);

/**
 * @route   PUT /courses/:courseId
 * @desc    Update a course by id; handles file updates if provided
 */
router.put(
  '/:courseId',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'introVideo', maxCount: 1 },
    { name: 'syllabusPDF', maxCount: 1 },
    {name: "material", maxCount: 1}
  ]),
  courseController.updateCourse
);

/**
 * @route   POST /courses/uploadLecture
 * @desc    Upload a lecture video; expects lecture video file in req.file and additional data in req.body
 */
router.post(
  '/uploadLecture',
  upload.single('lectureVideo'),
  courseController.uploadLecture
);

/**
 * @route   DELETE /courses/deleteLectureVideo
 * @desc    Delete a lecture video by specifying courseId, chapterIndex, and lessonIndex in the request body
 */
router.delete(
  '/deleteLectureVideo',
  courseController.deleteLectureVideo
);

/**
 * @route   DELETE /courses/:courseId
 * @desc    Delete a course by id along with its associated files
 */
router.delete('/:courseId', courseController.deleteCourse);

router.get('/getallCourse', courseController.getAllCourse);

module.exports = router;
