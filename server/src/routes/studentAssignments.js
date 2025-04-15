
const express = require('express');
const router = express.Router();
const Assignment = require("../models/Assignment");
const Submission = require("../models/AssignmentSubmission");

// 📌 Get all assignments for a specific course for the logged-in student
router.get("/:courseId/:id", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.params.id; // or use req.user._id if using auth middleware

    // Find all assignments for this course
    const assignments = await Assignment.find({ course: courseId });

    // Enrich assignments with submission status
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

    // Separate into submitted and unsolved (not submitted)
    const submitted = enrichedAssignments.filter(assignment => assignment.submitted);
    const unsolved = enrichedAssignments.filter(assignment => !assignment.submitted);

    res.json({ submitted, unsolved });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student assignments", error: err.message });
  }
});

router.get("/:assignmentId" ,async(req,res)=>{
  const courseId = req.params.assignmentId;
const assignments = await Assignment.find({ _id:courseId});
res.json(assignments)
})
router.post("/a/:assignmentId/submit/op", async (req, res) => {
  const { assignmentId } = req.params;
  const { userid, answers } = req.body;

  console.log("🔁 Submission Request Received");
  console.log("assignmentId:", assignmentId);
  console.log("userid:", userid);
  console.log("answers:", answers);

  if (!userid || !answers) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const alreadySubmitted = await Submission.findOne({ assignment: assignmentId, student: userid });
    if (alreadySubmitted) {
      return res.status(400).json({ message: "You have already submitted this assignment" });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    console.log("✅ Assignment fetched. Calculating score...");

    const score = assignment.questions.reduce((acc, q, i) => {
      return answers[i] === q.correctAnswerIndex ? acc + 1 : acc;
    }, 0);

    console.log("✅ Score calculated:", score);

    const submission = new Submission({
      assignment: assignmentId,
      student: userid,
      answers,
      score,
    });

    await submission.save();

    console.log("✅ Submission saved");

    return res.status(201).json({ message: "Assignment submitted successfully", submission });
  } catch (error) {
    console.error("❌ Error in submission route:", error);
    return res.status(500).json({ message: "Failed to submit assignment", error: error.message });
  }
});

  module.exports = router;
  
  