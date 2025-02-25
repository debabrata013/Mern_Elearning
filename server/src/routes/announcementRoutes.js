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
router.post('/', createAnnouncement);

// 2. Route to get announcements (optionally filter by audience)
router.get('/', getAnnouncements);

// 3. Route to update an announcement by ID
router.put('/:id', updateAnnouncement);

// 4. Route to delete an announcement by ID
router.delete('/:id', deleteAnnouncement);

module.exports = router;
