const express = require('express');
const router = express.Router();

// Import controller methods
const {
  createAnnouncement,
  getUserAnnouncements,
  deleteUserAnnouncement

} = require('../controllers/announcementController');

// 1. Route to create a new announcement
router.post('/', createAnnouncement);
router.get('/:id',getUserAnnouncements);
router.delete('/:id/:i', deleteUserAnnouncement);
// router.put('/:id', ubdateAnnouncement);




module.exports = router;
