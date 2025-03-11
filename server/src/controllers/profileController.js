const User = require("../models/User");
const { URL } = require("url");
const aws = require("aws-sdk");

// Explicitly update the AWS configuration using environment variables.
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create the S3 client instance.
const s3 = new aws.S3();

// You can use process.env.S3_BUCKET_NAME wherever you need the bucket name.
const bucketName = process.env.S3_BUCKET_NAME;



const DEFAULT_PROFILE_IMAGE = "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg";

/**
 * Helper function to extract the S3 object key from a full URL.
 * For example, given: https://bucket-name.s3.amazonaws.com/folder/filename.jpg,
 * it returns: "folder/filename.jpg".
 */
function getS3KeyFromUrl(url) {
  try {
    const urlObj = new URL(url);
    // Remove the leading "/" from pathname.
    return urlObj.pathname.slice(1);
  } catch (error) {
    console.error("Error parsing S3 URL", error);
    return null;
  }
}

/**
 * Controller to update the user profile.
 * It updates allowed fields from req.body, such as email, userName, and mobile.
 * For teachers, it also updates description, subjectKnowledge, and salary.
 * If a new profile image is uploaded via req.file, it deletes the old image from AWS S3 (if not the default)
 * and updates the profileImage field with the new image URL.
 *
 * Assumes:
 * - An authentication middleware populates req.user with the user's data.
 * - A file upload middleware (like multer-s3) sets req.file.location to the URL of the uploaded image.
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Auth middleware should provide req.user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Define allowed fields to update for all users.
    const allowedFields = ["email", "userName", "mobile","resumeurl","lindeninProfileUrl","githubprofileurl","description" ];
    // If the user is a teacher, allow additional fields.
    if (user.role === "teacher") {
      allowedFields.push("subjectKnowledge");
    }
   
    // Iterate over allowed fields and update if provided in req.body.
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Process new profile image if provided.
    if (req.file && req.file.location) {
      const newProfileImage = req.file.location;
      // If the new image is not the default and the current image is also not the default, delete the old one from S3.
      if (newProfileImage !== DEFAULT_PROFILE_IMAGE && user.profileImage !== DEFAULT_PROFILE_IMAGE) {
        const oldImageKey = getS3KeyFromUrl(user.profileImage);
        if (oldImageKey) {
          const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET, // Your S3 bucket name
            Key: oldImageKey,
          };
          try {
            await s3.deleteObject(deleteParams).promise();
            console.log(`Deleted old profile image: ${oldImageKey} from S3`);
          } catch (err) {
            console.error("Error deleting old profile image from S3", err);
            // Optionally, handle error (e.g., continue or return error response).
          }
        }
      }
      // Update the user's profile image.
      user.profileImage = newProfileImage;
    }

    // Save the updated user document.
    await user.save();

    return res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Controller to update the user password.
 * Expects currentPassword and newPassword in req.body.
 * Checks if the current password matches, and if so, updates the password.
 * The User schema's pre-save middleware will handle password hashing.
 */
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure req.user is populated via auth middleware
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the current password.
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Update password (pre-save middleware will hash the new password).
    user.password = newPassword;
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in updatePassword", error);
    return res.status(500).json({ error: "Server error" });
  }
};
