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
    // collect the id from url

    const u= req.params.id // Get user ID from request parameters


    console.log(u);
    
    const user = await User.findById(u);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
// user.announcements  gievs the list of announcements id and your task is to find the all the anuncement 
    // Populate the announcements field with the actual announcement data
    const announcements = await Announcement.find({
      _id: { $in: user.announcements.map(announcement => announcement.announcementId) }
    });

    return res.status(200).json({ announcements: announcements });

  } catch (error) {
    console.error("Error fetching announcements:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteUserAnnouncement = async (req, res) => {
  try {
    console.log("Deleting announcement for user...");
    const userId = req.params.id; // Get user ID from request parameters
    const announcementId = req.params.announcementId; // Changed from req.params.i to req.params.announcementId
    
    console.log("User ID:", userId);
    console.log("Announcement ID:", announcementId);
    
    if (!announcementId) {
      return res.status(400).json({ error: "Announcement ID is required." });
    }

    // Remove the announcement only from the specific user's list
    const updateResult = await User.findByIdAndUpdate(
      userId,
      { $pull: { announcements: { announcementId } } },
      { new: true }
    );

    if (!updateResult) {
      return res.status(404).json({ error: "User or announcement not found" });
    }

    return res.status(200).json({ message: "Announcement removed successfully" });

  } catch (error) {
    console.error("Error deleting announcement:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
exports.deleteAnnoucement= async(req,res)=>{
  try {
    const announcementId = req.params.id;

    // Delete the announcement from the Announcement collection
    const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);

    if (!deletedAnnouncement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    // Remove this announcement reference from all users
    await User.updateMany(
      { "announcements.announcementId": announcementId },
      { $pull: { announcements: { announcementId: announcementId } } }
    );

    // Get all remaining announcements
    const remainingAnnouncements = await Announcement.find();

    return res.status(200).json({
      message: "Announcement deleted successfully",
      announcements: remainingAnnouncements
    });

  } catch (error) {
    console.error("Error deleting announcement:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

exports.getallAnnouncement = async (req, res) => {
  try {
    // Get all announcements from the database
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      announcements
    });

  } catch (error) {
    console.error("Error fetching announcements:", error);
    return res.status(500).json({ 
      error: "Internal server error", 
      details: error.message 
    });
  }
}
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