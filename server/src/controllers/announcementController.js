// controllers/announcementController.js

const User = require("../models/User");

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, targetRoles } = req.body;

    // Only admins are allowed to create announcements.
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Only admins can create announcements." });
    }

    // Validate required fields
    if (!title || !message || !targetRoles || !Array.isArray(targetRoles)) {
      return res.status(400).json({ error: "Title, message, and targetRoles (as an array) are required." });
    }

    // Validate that the targetRoles only include "student" and/or "teacher"
    const allowedRoles = ["student", "teacher"];
    const invalidRoles = targetRoles.filter(role => !allowedRoles.includes(role));
    if (invalidRoles.length > 0) {
      return res.status(400).json({ error: `Invalid roles provided: ${invalidRoles.join(", ")}` });
    }

    // Create the announcement object.
    // Note: We include `sentBy` from req.user._id (assuming authentication middleware provides it)
    const announcement = {
      title,
      message,
      targetRoles,
      sentBy: req.user._id,
      createdAt: new Date(),
      read: false,
    };

    // Update all users with roles in the targetRoles array,
    // by pushing the announcement into their announcements array.
    const result = await User.updateMany(
      { role: { $in: targetRoles } },
      { $push: { announcements: announcement } }
    );

    return res.status(200).json({
      message: "Announcement added successfully.",
      result, // result contains info about how many documents were modified.
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return res.status(500).json({ error: "Internal server error while creating announcement." });
  }
};






