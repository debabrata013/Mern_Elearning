const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  issueRelated: {
    type: String,
    required: true,
    enum: ['Billing', 'Technical Support', 'General Inquiry', 'Other'], // Modify options as needed
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isreplayed: {
    type: Boolean,
    default: false
  },

});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
