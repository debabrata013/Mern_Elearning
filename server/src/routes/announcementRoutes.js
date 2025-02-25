const express = require('express');
const router = express.Router();

// Import controller methods
const {
  createAnnouncement
} = require('../controllers/announcementController');

// 1. Route to create a new announcement
router.post('/', createAnnouncement);

<<<<<<< HEAD
// 2. Route to get announcements (optionally filter by audience)
router.get('/', getAnnouncements);

// 3. Route to update an announcement by ID
router.put('/:id', updateAnnouncement);

// 4. Route to delete an announcement by ID
router.delete('/:id', deleteAnnouncement);
=======
>>>>>>> 3d3913e8c29d871b9005f23cc2f012c166fc84e1

module.exports = router;
