const User =require("../models/User")
const putObject = require("../utils/putobject")


const profilepic = async (req, res) => {
    try {
        const { userId,image } = req.body;
        const file = image; // Assuming you're using multer for file uploads

        if (!file) {
            return res.status(400).json({ error: "No image file provided" });
        }

        // Upload image to S3
        const fileName = `profile-pictures/${userId}-${Date.now()}-${file.originalname}`;
        const fileUrl = await putObject(file, fileName);

        // Update user's profile picture in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profileImage: fileUrl },
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

module.exports = profilepic;