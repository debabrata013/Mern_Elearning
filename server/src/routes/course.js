const express = require('express');
const upload = require('../middlewares/multer');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post(
  '/create-course',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'introVideo', maxCount: 1 },
    { name: 'syllabusPDF', maxCount: 1 },
  ]),
  courseController.createCourse
);

module.exports = router;