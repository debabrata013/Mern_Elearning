const mongoose = require('mongoose');

// Schema to track the progress of a single lecture
const LectureProgressSchema = new mongoose.Schema({
  lectureId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lecture',  // Assuming you have a 'Lecture' model to refer to
    required: true
  },
  viewed: { 
    type: Boolean, 
    default: false 
  },
  dateViewed: { 
    type: Date, 
    default: null 
  },
}, {
  timestamps: true,  // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Schema to track the overall progress of a user in a course
const CourseProgressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Assuming you have a 'User' model to refer to
    required: true 
  },
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',  // Assuming you have a 'Course' model to refer to
    required: true 
  },
  completed: { 
    type: Boolean, 
    default: false  // Default to false, i.e., the course is not completed
  },
  completionDate: { 
    type: Date, 
    default: null 
  },
  lecturesProgress: [LectureProgressSchema],  // Array of lecture progress
}, {
  timestamps: true,  // Automatically adds 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('CourseProgress', CourseProgressSchema);
