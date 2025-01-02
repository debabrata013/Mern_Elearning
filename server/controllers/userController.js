const User = require('../models/User');
const StudentCourses = require('../models/StudentCourses');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { log } = require('console');
const mongoose = require('mongoose');

// Configure AWS S3
const s3 = new aws.S3();

const uploadFileToS3 = (filePath, fileName) => {
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
    ACL: 'public-read',
  };

  return s3.upload(uploadParams).promise();
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
};
const createTeacher = async (req, res) => {
  try {
    const { file, body } = req;

    // Log request body to see what's coming in
    console.log("Request body:", body);

    const fileName = `${Date.now()}-${file.originalname}`;
    const tempFilePath = path.join(__dirname, '../uploads', fileName);
    fs.writeFileSync(tempFilePath, file.buffer);

    // Upload the file to S3 and get the URL
    const s3Response = await uploadFileToS3(tempFilePath, fileName);
    fs.unlinkSync(tempFilePath);

    const teacherData = { ...body, profileImage: s3Response.Location };

    // Ensure email is neither null nor empty
    if (!teacherData.email || teacherData.email.trim() === '') {
      console.log('Email is required and cannot be null or empty');
      return res.status(400).json({ message: "Email is required" });
    }

    // Log the teacherData before creating a new user
    console.log("teacherData:", teacherData);

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: teacherData.email });
    console.log("Existing User with email", teacherData.email, existingUser);

    if (existingUser) {
      console.log('Email already exists');
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create and save the new teacher
    const teacher = new User(teacherData);
    await teacher.save();

    console.log("Teacher saved successfully");
    res.status(201).json({ message: "Teacher created successfully", teacher });

  } catch (err) {
    console.error('Error creating teacher:', err);
    res.status(400).json({ message: "Error creating teacher", error: err.message });
  }
};


const createStudent = async (req, res) => {
  try {
    const { file, body } = req;
    console.log('Received body:', body);
    if (!body.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate purchasedCourses
    if (body.purchasedCourses) {
      const isValidObjectIdArray = body.purchasedCourses.every(courseId => 
        mongoose.Types.ObjectId.isValid(courseId)
      );
      if (!isValidObjectIdArray) {
        return res.status(400).json({ message: "Invalid course IDs in purchasedCourses" });
      }
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const tempFilePath = path.join(__dirname, '../uploads', fileName);

    // Save the file temporarily
    fs.writeFileSync(tempFilePath, file.buffer);

    // Upload to S3
    const s3Response = await uploadFileToS3(tempFilePath, fileName);

    // Delete the temporary file after uploading
    fs.unlinkSync(tempFilePath);

    const studentData = { ...body, profileImage: s3Response.Location };
    console.log("studentData", studentData);
    const student = new User(studentData);
    console.log("student", student);
    await student.save();
    console.log("student saved");
    res.status(201).json({ message: "Student created successfully", student });
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(400).json({ message: "Error creating student", error: err.message });
  }
};
const createAdmin = async (req, res) => {
  try {
    const admin = new User(req.body);
    await admin.save();
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    res.status(400).json({ message: "Error creating admin", error: err.message });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachers", error: err });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
};


module.exports = {
  createUser,
  
  getAllTeachers,
  getAllStudents,
createAdmin,
  createTeacher,
  createStudent,
  deleteUser
};
