const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  chapterTitle: {
    type: String
  },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  directedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Teacher (optional)
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  upvotes: {
    type: Number,
    default: 0
  },
  viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, { timestamps: true });

module.exports = mongoose.model("Doubt", doubtSchema);
