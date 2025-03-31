const mongoose = require('mongoose');
const { Schema } = mongoose;




// Define the Chapter subdocument schema
const chapterSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true, trim: true },
  resourceUrl: [{  _id: { type: Schema.Types.ObjectId, auto: true }, type: String }],
  description: { type: String, required: true },
  lessons: [{id: { type: Schema.Types.ObjectId, auto: true },
 
    videoUrl: { type: String }}] // Each chapter can have multiple lessons
}, { timestamps: true });

// Define the main Professional Course schema
const professionalCourseSchema = new Schema({
  title: { type: String, required: true, trim: true },
  coverImage: { type: String, required: true },
  introVideo: { type: String },
  courseCode: { type: String, required: true,  uppercase: true },
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
  

  
  tags: [{ type: String }]
}, {
  timestamps: true
});

const ProfessionalCourse = mongoose.model('Course', professionalCourseSchema);
module.exports = ProfessionalCourse;
