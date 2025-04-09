
const express = require('express');
const router = express.Router();
const Assignment = require("../models/Assignment");
const Submission = require("../models/AssignmentSubmission");

// 📌 Get all assignments for a specific course for the logged-in student
router.get("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.body.userid; // or use req.user._id if using auth middleware

    // Find all assignments for this course
    const assignments = await Assignment.find({ course: courseId });

    // For each assignment, check if the student has submitted it
    const enrichedAssignments = await Promise.all(assignments.map(async (assignment) => {
      const submission = await Submission.findOne({ assignment: assignment._id, student: studentId });

      return {
        _id: assignment._id,
        title: assignment.title,
        course: assignment.course,
        totalQuestions: assignment.questions.length,
        submitted: !!submission,
        score: submission ? submission.score : null
      };
    }));

    res.json(enrichedAssignments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student assignments", error: err.message });
  }
});
 
router.post("/:assignmentId/submit", async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const { userid, answers } = req.body;

    // Check if already submitted
    const existing = await Submission.findOne({ assignment: assignmentId, student: userid });
    if (existing) {
      return res.status(400).json({ message: "You have already submitted this assignment" });
    }

    // Get assignment
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Score calculation
    let score = 0;
    assignment.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswerIndex) score++;
    });

    // Save submission
    const submission = new Submission({
      assignment: assignmentId,
      student: userid,
      answers,
      score,
    });

    await submission.save();
    res.status(201).json({ message: "Assignment submitted", submission });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit assignment", error: err.message });
  }
});

  module.exports = router;
  
  