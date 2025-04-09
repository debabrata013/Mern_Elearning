const express = require('express');
const router = express.Router();
router.get("/",  async (req, res) => {
    const userCourses = req.user.courses; // assuming it's an array of enrolled course IDs
    const assignments = await Assignment.find({ course: { $in: userCourses } });
  
    const submissions = await Submission.find({ student: req.user._id });
    const submittedIds = submissions.map(s => s.assignment.toString());
  
    const data = assignments.map(a => {
      const submitted = submittedIds.includes(a._id.toString());
      const score = submissions.find(s => s.assignment.toString() === a._id.toString())?.score;
      return { ...a._doc, submitted, score };
    });
  
    res.json(data);
  });
  router.post("/:id/submit",  async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).send("Assignment not found");
  
    const existing = await Submission.findOne({ student: req.user._id, assignment: assignment._id });
    if (existing) return res.status(400).send("Already submitted");
  
    const { answers } = req.body;
  
    // Calculate score
    let score = 0;
    assignment.questions.forEach((q, i) => {
      if (q.correctAnswerIndex === answers[i]) score++;
    });
  
    const submission = new Submission({
      assignment: assignment._id,
      student: req.user._id,
      answers,
      score,
    });
  
    await submission.save();
    res.status(200).json({ message: "Submitted", score });
  });

  module.exports = router;
  
  