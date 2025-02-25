const admin=require('../controllers/sta/admin');
const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// router.get('/totalUsers',admin.getTotalUsers);
// router.get('/totalTeachers',admin.getTotalTeachers);
// router.get('/totalStudents',admin.getTotalStudents);
// router.get('/totalCourse',admin.getCourse);

=======
router.get('/totaluser', admin.getTotalUsers);
router.get('/totalstudent', admin.getTotalStudents);
router.get('/totalcourse', admin.getCourse);
router.get('/totalteacher', admin.getTotalTeachers);
>>>>>>> 3d3913e8c29d871b9005f23cc2f012c166fc84e1
module.exports = router;

