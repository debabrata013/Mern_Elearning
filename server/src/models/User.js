const mongoose = require("mongoose");
const StudentCourses = require("./StudentCourses");  // Import the StudentCourses schema
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {  
    type: String,
    required: true,  
    trim: true,
    validate: {
      validator(value) {
        return value === null || /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: 'Please provide a valid email address'
    }
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

  // Role-specific fields
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
  mobile:{
    type:Number

  },

  // Student-specific fields
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "StudentCourses",
    required: function() { return this.role === 'student'; },
  }],

  // Relationship with CourseChat
  courseChats: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "CourseChat"
  }],
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
  toJSON: { virtuals: true },  // Include virtuals in JSON output
  toObject: { virtuals: true },  // Include virtuals in object output
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
