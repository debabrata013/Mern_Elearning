// controllers/announcementController.js

const User = require("../models/User");
const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description, link, type, targetAudience } = req.body;

    if (!title || !description || !targetAudience) {
      return res.status(400).json({ error: "Title, description, and targetAudience are required." });
    }

    const allowedRoles = ["student", "teacher"];
    const invalidRoles = Array.isArray(targetAudience) 
      ? targetAudience.filter(role => !allowedRoles.includes(role))
      : (allowedRoles.includes(targetAudience) ? [] : [targetAudience]);

    if (invalidRoles.length > 0) {
      return res.status(400).json({ error: `Invalid roles provided: ${invalidRoles.join(", ")}` });
    }

    // Create the announcement in Announcement collection
    const announcement = new Announcement({
      title,
      description,
      link: link || "",
      notificationType: type || "text",
      targetAudience: Array.isArray(targetAudience) ? targetAudience : [targetAudience],
      createdAt: new Date()
    });

    await announcement.save();

    // Add announcement to each user matching the role
    await User.updateMany(
      { role: { $in: targetAudience } },
      { $push: { announcements: { announcementId: announcement._id, isRead: false } } }
    );

    return res.status(201).json({
      message: "Announcement created successfully",
      announcement
    });

  } catch (error) {
    console.error("Error creating announcement:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
exports.getUserAnnouncements = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have authentication middleware

    const user = await User.findById(userId).populate("announcements.announcementId");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ announcements: user.announcements });

  } catch (error) {
    console.error("Error fetching announcements:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteUserAnnouncement = async (req, res) => {
  try {
    const userId = req.user.id; // Get user from authentication
    const { announcementId } = req.params; // Get announcement ID from request

    // Remove the announcement only from the specific user's list
    const updateResult = await User.findByIdAndUpdate(userId, {
      $pull: { announcements: { announcementId } }
    });

    if (!updateResult) {
      return res.status(404).json({ error: "User or announcement not found" });
    }

    return res.status(200).json({ message: "Announcement removed successfully" });

  } catch (error) {
    console.error("Error deleting announcement:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// exports.createAnnouncement = async (req, res) => {
//   try {
//     const { title, description, link, type, targetAudience } = req.body;

//     // Validate required fields first
//     if (!title || !description || !targetAudience) {
//       return res.status(400).json({ error: "Title, description, and targetAudience are required." });
//     }

//     // Validate that the targetAudience only include "student" and/or "teacher"
//     const allowedRoles = ["student", "teacher"];
//     const invalidRoles = Array.isArray(targetAudience) 
//       ? targetAudience.filter(role => !allowedRoles.includes(role))
//       : (allowedRoles.includes(targetAudience) ? [] : [targetAudience]);

//     if (invalidRoles.length > 0) {
//       return res.status(400).json({ error: `Invalid roles provided: ${invalidRoles.join(", ")}` });
//     }

//     // Create the announcement object
//     const announcement = new Announcement({
//       title,
//       description,
//       link: link || "",
//       notificationType: type || "text",
//       targetAudience: Array.isArray(targetAudience) ? targetAudience : [targetAudience],
//       createdAt: new Date()
//     });

//     // Save the announcement
//     await announcement.save();

//     // Update users based on target audience
//     const updateResult = await User.updateMany(
//       { role: { $in: announcement.targetAudience } },
//       { $push: { announcements: announcement._id } }
//     );

//     return res.status(201).json({
//       message: "Announcement created successfully",
//       announcement,
//       updateResult
//     });
//   } catch (error) {
//     console.error("Error creating announcement:", error);
//     return res.status(500).json({ 
//       error: "Internal server error", 
//       details: error.message 
//     });
//   }
// };