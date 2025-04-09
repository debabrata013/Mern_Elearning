const express = require('express');
const router = express.Router();
const Assignment = require("../models/Assignment");
const Submission = require("../models/AssignmentSubmission");

// 📌 Create assignment (Teacher ID from req.body)
router.post("/create", async (req, res) => {
  try {
    const assignment = new Assignment({
      course: req.body.course,
      teacher: req.body.userid, // taking teacher ID from request body
      title: req.body.title,
      questions: req.body.questions,
    });

    await assignment.save();
    console.log("create hogaya assigment " +assignment);
    
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: "Failed to create assignment", error: err.message });
  }
});

// 📌 Get all assignments by teacher (Teacher ID from req.body)
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find({ teacher: req.body.userid }).populate("course");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching assignments", error: err.message });
  }
});

// 📌 Get stats of a specific assignment
router.get("/:id/stats", async (req, res) => {
  try {
    const total = await Submission.countDocuments({ assignment: req.params.id });
    const submissions = await Submission.find({ assignment: req.params.id });

    const average = submissions.reduce((sum, s) => sum + s.score, 0) / (submissions.length || 1);
    res.json({
      totalSubmissions: total,
      averageScore: average.toFixed(2),
      submissions
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
});

module.exports = router;
