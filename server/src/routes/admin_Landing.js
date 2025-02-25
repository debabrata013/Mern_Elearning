const admin=require('../controllers/sta/admin');
const express = require('express');
const router = express.Router();

router.get('/totaluser', admin.getTotalUsers);
router.get('/totalstudent', admin.getTotalStudents);
router.get('/totalcourse', admin.getCourse);
router.get('/totalteacher', admin.getTotalTeachers);
module.exports = router;

