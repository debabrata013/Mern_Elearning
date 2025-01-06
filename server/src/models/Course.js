const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseCode: { type: String, required: true },
  category: { type: String, enum: ['Programming', 'Design', 'Business', 'Data Science', 'Marketing'], required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  material: { type: String },  // Store file path or URL
  chapters: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    material: { type: String }  // Material URL from S3
  }],
  instructor: { type: String, required: true },
  contact: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  enrollmentDeadline: { type: Date, required: true },
  courseFee: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  publishStatus: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
