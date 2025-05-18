const User = require('../models/User');
const Course = require('../models/Course');
const moment = require('moment');

// Get login history for last 30 days
const getLoginHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user || !user.loginHistory) return res.status(404).json({ error: 'User not found or no login history.' });

    const loginCounts = {};
    for (let i = 29; i >= 0; i--) {
      const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
      loginCounts[date] = 0;
    }

    user.loginHistory.forEach(date => {
      const formatted = moment(date).format('YYYY-MM-DD');
      if (loginCounts.hasOwnProperty(formatted)) {
        loginCounts[formatted]++;
      }
    });

    res.json(loginCounts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get course stats (count + category-wise)
const getCourseStats = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('purchasedCourses');
    if (!user || !user.purchasedCourses) return res.status(404).json({ error: 'User not found or no courses enrolled.' });

    const totalCourses = user.purchasedCourses.length;

    const categoryCount = {};
    user.purchasedCourses.forEach(course => {
      categoryCount[course.category] = (categoryCount[course.category] || 0) + 1;
    });

    res.json({
      totalCourses,
      categoryDistribution: categoryCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getLoginHistory,
  getCourseStats
};
