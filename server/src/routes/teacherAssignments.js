const express = require('express');
const router = express.Router();
router.post("/create", async (req, res) => {
    const assignment = new Assignment({
      course: req.body.course,
      teacher: req.user._id,
      title: req.body.title,
      questions: req.body.questions, // validate format on frontend/backend
    });
    await assignment.save();
    res.status(201).json(assignment);
  });
  
  router.get("/",  async (req, res) => {
    const assignments = await Assignment.find({ teacher: req.user._id }).populate("course");
    res.json(assignments);
  });
  router.get("/:id/stats",  async (req, res) => {
    const total = await Submission.countDocuments({ assignment: req.params.id });
    const submissions = await Submission.find({ assignment: req.params.id });
    const average = submissions.reduce((sum, s) => sum + s.score, 0) / (submissions.length || 1);
    res.json({ totalSubmissions: total, averageScore: average.toFixed(2), submissions });
  });
  module.exports = router;