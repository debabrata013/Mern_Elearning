const express = require('express');
const router = express.Router();

// Import controller methods
const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcementController');

// 1. Route to create a new announcement
router.post('/announcements', createAnnouncement);

// 2. Route to get announcements (optionally filter by audience)
router.get('/announcements', getAnnouncements);

// 3. Route to update an announcement by ID
router.put('/announcements/:id', updateAnnouncement);

// 4. Route to delete an announcement by ID
router.delete('/announcements/:id', deleteAnnouncement);

module.exports = router;
