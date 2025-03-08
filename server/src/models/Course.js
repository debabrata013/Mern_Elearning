const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Lesson subdocument schema
const lessonSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  videoUrl: { type: String },
  resourceUrl: { type: String },
  duration: { type: Number } // duration in minutes
}, { _id: false, timestamps: true });

// Define the Chapter subdocument schema
const chapterSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  lessons: [lessonSchema] // Each chapter can have multiple lessons
}, { _id: false, timestamps: true });

// Define the main Professional Course schema
const professionalCourseSchema = new Schema({
  title: { type: String, required: true, trim: true },
  coverImage: { type: String, required: true },
  introVideo: { type: String },
  courseCode: { type: String, required: true, unique: true, uppercase: true },
  category: { 
    type: String, 
    enum: ['Programming', 'Design', 'Business', 'Data Science', 'Marketing'], 
    required: true 
  },
  description: { type: String, required: true },
  
  // Additional course details
  prerequisites: [{ type: String }],
  targetAudience: { type: String },
  learningOutcomes: [{ type: String }],
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    required: true 
  },
  language: { type: String, default: 'English' },
  syllabus: { type: String },  // URL or file path to detailed syllabus
  
  // Scheduling & Duration
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // total duration (in hours/days as per your design)
  
  // Chapters and course structure
  chapters: [chapterSchema],
  
  // Instructor & contact details
  teacher: { type: String, required: true },

  
  // Enrollment & financial details
  maxStudents: { type: Number, required: true },
  enrollmentDeadline: { type: Date, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  discount: { type: Number, default: 0 },
  
  // Reviews and ratings
  rating: { type: Number, min: 0, max: 5 },
  reviews: [{
    student: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    createdAt: { type: Date, default: Date.now }
  }],
  
  tags: [{ type: String }]
}, {
  timestamps: true
});

const ProfessionalCourse = mongoose.model('Course', professionalCourseSchema);
module.exports = ProfessionalCourse;
