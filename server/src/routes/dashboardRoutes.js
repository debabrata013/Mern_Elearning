const express = require('express');
const router = express.Router();
const { getLoginHistory, getCourseStats } = require('../controllers/dashboardController');

// Student Dashboard APIs
router.get('/login-history/:userId', getLoginHistory);
router.get('/course-stats/:userId', getCourseStats);

module.exports = router;
