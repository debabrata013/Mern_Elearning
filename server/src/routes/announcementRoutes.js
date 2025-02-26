const express = require('express');
const router = express.Router();

// Import controller methods
const {
  createAnnouncement
} = require('../controllers/announcementController');

// 1. Route to create a new announcement
router.post('/', createAnnouncement);

module.exports = router;
