const mongoose = require("mongoose");
const StudentCourses = require("./StudentCourses");  // Import the StudentCourses schema

const UserSchema = new mongoose.Schema({
  courseChats: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "CourseChat"
  }],

  // User common fields
  userName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,  // Ensures unique email addresses
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: false, // Optional, will be used for OTP verification if needed
  },

  // Role-specific fields
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],  // Added 'admin' role
    default: 'student',  // Default to 'student' role
  },
  decription:{
    type:String,
    required: function(){
      return this.role==='teacher';
    }
  },
  // Admin-specific fields
  adminName: {
    type: String,
    required: function() {
      return this.role === 'admin';  // Only required if the user is an admin
    },
  },
  adminProfileImage: {
    type: String,  // URL to the admin's profile image
    required: function() {
      return this.role === 'admin';  // Only required if the user is an admin
    },
  },
  

  // Teacher-specific fields
  teacherName: {
    type: String,
    required: function() {
      return this.role === 'teacher';  // Only required if the user is a teacher
    },
  },
  teacherProfileImage: {
    type: String,  // URL to the teacher's profile image
    required: function() {
      return this.role === 'teacher';  // Only required if the user is a teacher
    },
  },
  subjectKnowledge: [{
    type: String,
    required: function() {
      return this.role === 'teacher';  // Only required if the user is a teacher
    },
  }],
  salary: {
    type: Number,
    required: function() {
      return this.role === 'teacher';  // Only required if the user is a teacher
    },
  },

  // Student-specific fields
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId,  // Reference to the StudentCourses model
    ref: "StudentCourses",
    required: function() {
      return this.role === 'student';  // Only required if the user is a student
    },
  }],
  
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("User", UserSchema);
