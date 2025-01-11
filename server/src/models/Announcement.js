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
  notification: {
    type: String,
    required: true, // This can either be a URL or text based on notificationType
    validate: {
      validator: function(v) {
        // If the notificationType is 'link', validate if it's a valid URL
        if (this.notificationType === 'link') {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        }
        // If notificationType is 'text', just allow any string
        return typeof v === 'string';
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  targetAudience: {
    type: [String], // 'student', 'teacher'
    enum: ['student', 'teacher'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create model based on schema
const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
