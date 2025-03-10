const express = require('express');
const router = express.Router();
const landing=require('../controllers/Landingpage/homecontroller');

router.get('/teacher', landing.getAllteacherData);
router.get('/course', landing.getAllCourseData);
router.post('/subscribe', landing.storeScbscriber);

module.exports = router;



