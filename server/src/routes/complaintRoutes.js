const express = require('express');
const router = express.Router();

// Import complaint controller functions
const {
  createComplaint,
  getComplaints,
  getAnsweredComplaints,
  getUnansweredComplaints,
  updateComplaint
} = require('../controllers/complaintController');

// 1. Route to create a new complaint
router.post('/complaints', createComplaint);

// 2. Route to get all complaints (answered and unanswered)
router.get('/complaints', getComplaints);

// 3. Route to get all answered complaints
router.get('/complaints/answered', getAnsweredComplaints);

// 4. Route to get all unanswered complaints
router.get('/complaints/unanswered', getUnansweredComplaints);

// 5. Route to update a complaint (add a replay and mark it as answered)
router.put('/complaints/:complaintId', updateComplaint);

module.exports = router;
