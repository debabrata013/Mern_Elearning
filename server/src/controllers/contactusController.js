const Contact = require('../models/contactus'); // Import the schema

// @desc Submit a new contact form
// @route POST /api/contacts
// @access Public
const submitContactForm = async (req, res) => {
  try {
    const { name, contactEmail, phoneNumber, issueRelated, message } = req.body;

    if (!name || !contactEmail || !phoneNumber || !issueRelated || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({ name, contactEmail, phoneNumber, issueRelated, message });
    await newContact.save();

    res.status(201).json({ success: true, message: 'Contact form submitted successfully', data: newContact });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// @desc Get all contact submissions
// @route GET /api/contacts
// @access Private (Admin)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// @desc Get a single contact by ID
// @route GET /api/contacts/:id
// @access Private (Admin)
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// @desc Delete a contact by ID
// @route DELETE /api/contacts/:id
// @access Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// @desc Update a contact by ID
// @route PUT /api/contacts/:id
// @access Private (Admin)
const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });

    res.status(200).json({ success: true, message: 'Contact updated successfully', data: updatedContact });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

module.exports = {
  submitContactForm,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact
};
