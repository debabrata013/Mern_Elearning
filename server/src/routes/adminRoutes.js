const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create a new admin
router.post('/', adminController.createAdmin);

// Read admin information
router.get('/:id', adminController.getAdmin);

// Update admin information
router.put('/:id', adminController.updateAdmin);

// Delete an admin
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
