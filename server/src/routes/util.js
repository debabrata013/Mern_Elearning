const express = require('express');
const router = express.Router();
const Course = require("../models/Course");

router.get("/:id?", async (req, res) => {
  try {
    // Get course ID from params, query, or body
    const courseId = req.params.id || req.query.id || req.body.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
