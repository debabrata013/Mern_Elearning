const User = require("../models/User");
const { putObject } = require("../utils/putobject");

const profilepic = async (req, res) => {
    try {
        const { userId } = req.body;
        const file = req.files?.profileImage?.[0]; // Extract file from multer's storage

        if (!file) {
            return res.status(400).json({ error: "No image file provided" });
        }

        // Generate file name and upload to S3
        const fileName = `profile-pictures/${userId}-${Date.now()}-${file.originalname}`;
        const fileUrl = await putObject(file, fileName); // Now returns the file URL

        // Update user's profile picture in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profileImage: fileUrl }, // Store the URL instead of an object
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Profile picture updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { profilepic };
