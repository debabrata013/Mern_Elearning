const User = require('../models/User');
const StudentCourses = require('../models/StudentCourses');

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

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('purchasedCourses');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('purchasedCourses');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Error updating user", error: err });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
};

// Add a course to a student
const addCourseToStudent = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const course = await StudentCourses.findById(req.params.courseId);
    if (!user || !course) {
      return res.status(404).json({ message: "User or Course not found" });
    }
    user.purchasedCourses.push(course._id);
    await user.save();
    res.status(200).json({ message: "Course added to student", user });
  } catch (err) {
    res.status(500).json({ message: "Error adding course to student", error: err });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).populate('purchasedCourses');
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachers", error: err });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).populate('purchasedCourses');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addCourseToStudent,
  getAllTeachers,
  getAllStudents,
  getUserByEmail
};
