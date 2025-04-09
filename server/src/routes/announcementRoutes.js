const express = require('express');
const router = express.Router();

// Import controller methods
const {
  createAnnouncement,
  getUserAnnouncements,
  deleteUserAnnouncement,
  getallAnnouncement,
  deleteAnnoucement

} = require('../controllers/announcementController');

// 1. Route to create a new announcement
router.post('/', createAnnouncement);
router.get('/:id',getUserAnnouncements);
router.get("/",getallAnnouncement);
router.delete('/:id/:announcementId', deleteUserAnnouncement);
router.delete("/:id",deleteAnnoucement)
// router.put('/:id', ubdateAnnouncement);




module.exports = router;
