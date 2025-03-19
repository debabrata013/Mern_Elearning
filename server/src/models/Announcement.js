const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  notificationType: {
    type: String,
    enum: ['link', 'text'], // Can be 'link' or 'text'
    required: true
  },
  link: {
    type: String,
    trim: true
  },
  targetAudience: {
    type: [String], // 'student', 'teacher'
    enum: ['student', 'teacher'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model based on schema
const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
