const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact
} = require('../controllers/contactusController');

router.post('/', submitContactForm);

// Admin routes (require authentication middleware if needed)
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);
router.put('/:id', updateContact);

module.exports = router;
