const mongoose = require('mongoose');

// Complaint schema
const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  dept: {
    type: String,
    enum: ['teacher', 'student'],
    required: true
  },
  userid: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['answered', 'unanswered'],
    default: 'unanswered'
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  replay: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Complaint model
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
