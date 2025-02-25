const mongoose = require("mongoose");
const StudentCourses = require("./StudentCourses");  // Import the StudentCourses schema
const bcrypt = require('bcryptjs');

// Define an embedded Announcement schema
const AnnouncementSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  // Specify which roles should receive this announcement.
  targetRoles: [{
    type: String,
    enum: ['student', 'teacher'],  // You can add 'admin' if needed.
    required: true
  }],
  // The admin who sent the announcement.
  sentBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  // You can mark the announcement as read or not.
  read: { 
    type: Boolean, 
    default: false 
  }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: {  
    type: String,
    required: true,  
    trim: true
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    default: null, 
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
  // Embedded announcements array.
  announcements: [AnnouncementSchema],

  // Role-specific fields for teachers.
  description: {
    type: String,
    required: function() { return this.role === 'teacher'; },
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
  // Student-specific fields.
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "StudentCourses",
    required: function() { return this.role === 'student'; },
  }],
  // Relationship with CourseChat.
  courseChats: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "CourseChat"
  }],
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields.
  toJSON: { virtuals: true },  // Include virtuals in JSON output.
  toObject: { virtuals: true },  // Include virtuals in object output.
});

// Hash the password before saving the user document.
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Method to compare provided password with stored hashed password.
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
