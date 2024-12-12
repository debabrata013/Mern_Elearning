const CourseChat = require('../models/CourseChat');
const User = require('../models/User');

// const s3 = require('../config/aws');  // AWS S3 SDK
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  
const s3 = new AWS.S3();
// Get all messages for a specific course chat
exports.getChatMessages = async (req, res) => {
  const { courseId } = req.params;
  
  try {
    const chat = await CourseChat.findOne({ courseId }).populate('messages.sender');
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found for this course.' });
    }
    return res.json({ messages: chat.messages });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Send a text message in a course chat
exports.sendTextMessage = async (req, res) => {
  const { courseId } = req.params;
  const { userId, content } = req.body;

  try {
    // Validate if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const chat = await CourseChat.findOne({ courseId });
    if (!chat) {
      return res.status(404).json({ message: 'Course chat not found.' });
    }

    // Create the message object
    const message = {
      sender: userId,
      content: content,
      timestamp: new Date(),
    };

    chat.messages.push(message);
    await chat.save();

    // Optionally, you can broadcast the message using WebSockets (Socket.io) here
    // io.to(courseId).emit('newMessage', message);

    return res.status(200).json({ message: 'Message sent.', message });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Upload media (image/video) to AWS S3 and get the file URL
exports.uploadMedia = async (req, res) => {
  const { mediaFile } = req.body;  // mediaFile should be sent as base64-encoded or as a URL from frontend

  // Validate if the file is provided
  if (!mediaFile) {
    return res.status(400).json({ message: 'No file provided.' });
  }

  const buffer = Buffer.from(mediaFile, 'base64'); // Assuming mediaFile is base64-encoded

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `chat-media/${Date.now().toString()}.jpg`, // or .mp4 based on the file type
    Body: buffer,
    ACL: 'public-read',
    ContentType: 'image/jpeg',  // Change this dynamically based on file type
  };

  try {
    // Upload the media to S3
    const uploadResult = await s3.upload(params).promise();
    return res.status(200).json({ message: 'File uploaded successfully', mediaUrl: uploadResult.Location });
  } catch (error) {
    return res.status(500).json({ message: 'Error uploading file to S3', error });
  }
};

// Send a media message (with image/video URL from S3)
exports.sendMediaMessage = async (req, res) => {
  const { courseId } = req.params;
  const { userId, content, mediaUrl } = req.body;

  try {
    // Validate if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const chat = await CourseChat.findOne({ courseId });
    if (!chat) {
      return res.status(404).json({ message: 'Course chat not found.' });
    }

    // Create the message object with the media URL from S3
    const message = {
      sender: userId,
      content: content,
      mediaUrl: mediaUrl,  // URL of the media uploaded to S3
      timestamp: new Date(),
    };

    chat.messages.push(message);
    await chat.save();

    // Optionally, you can broadcast the message using WebSockets (Socket.io) here
    // io.to(courseId).emit('newMessage', message);

    return res.status(200).json({ message: 'Message sent with media.', message });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
