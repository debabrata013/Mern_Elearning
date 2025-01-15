const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  introVideo: { type: String, required: true },
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
    vdourl: { type: String },  // Material URL from S3
    liveclassurl: { type: String }  
  }],
teacher: { type: String, required: true },
  contact: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  enrollmentDeadline: { type: Date, required: true },
  courseFee: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  status:{
    type:String,
    enum:['published','archived'],
    default:'published'
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
