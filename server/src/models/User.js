const mongoose = require("mongoose");
const Course = require('./Course');
const bcrypt = require('bcryptjs');

// Define an embedded Announcement schema
// Define an embedded Announcement schema
const AnnouncementSchema = new mongoose.Schema({
  announcementId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Announcement" 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  }
}, { _id: false });

// Define an embedded To-Do schema
const TodoSchema = new mongoose.Schema({
  
  todo: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const UserSchema = new mongoose.Schema({
  email: {  
    type: String,
    required: true,  
    trim: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  otp: {
    type: String,
    default: null, 
  },
  otpCount: {
    type: Number,
    default: 0
  },
  university: {
    type: String,
    },
    branch:{
      type:String
    },
    Semester:{
      type:String
    },
    rollNumber:{
      type:String
    },
    enrollmentNumber:{
      type:String
    },

    address:{
      type:String

    },
    city:{
      type:String
    },
    country:{
      type:String
    },
    pincode:{
      type:String
      },
    Skills:{
      type:[String]
      },
      Languages:{
        type:[String]
      },
      Dob:{
        type:String
      },
     
  profileImage: {
    type: String,
    default: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" 
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },

  // Embedded announcements array
  announcements: [AnnouncementSchema],

  // Role-specific fields for teachers
  description: {
    type: String,
  },
  subjectKnowledge: [{
    type: String,
    required: function() { return this.role === 'teacher'; },
  }],
  salary: {
    type: Number,
    required: function() { return this.role === 'teacher'; },
  },
  mobile: {
    type: Number
  },

  // Student-specific fields
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course",
    required: function() { return this.role === 'student'; },
  }],
  resumeurl: {
    type: String
  },
  lindeninProfileUrl: {
    type: String
  },
  githubprofileurl: {
    type: String
  },

  // Relationship with CourseChat
  courseChats: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "CourseChat"
  }],

  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"  // Reference to the Course model
  }],

  // To-Do List for each user
  todos: [TodoSchema] // Each user has their own list of todos

}, {
  timestamps: true,  
  toJSON: { virtuals: true },  
  toObject: { virtuals: true },  
});

// Hash the password before saving the user document
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Method to compare provided password with stored hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);