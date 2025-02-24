const admin=require('../controllers/admin_Landing');
const router = express.Router();

router.get('/totalUsers',admin.getTotalUsers);
router.get('/totalTeachers',admin.getTotalTeachers);
router.get('/totalStudents',admin.getTotalStudents);
router.get('/totalCourse',admin.getCourse);

module.exports = router;

