const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [Number], // Selected option index for each question
  score: Number,
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AssignmentSubmission", submissionSchema);
