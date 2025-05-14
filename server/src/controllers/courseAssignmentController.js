const User = require('../models/User');
const Course = require('../models/Course');

exports.getAssignedCourses = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await User.findById(studentId).populate('purchasedCourses');

    if (!student) return res.status(404).json({ message: 'Student not found' });

    return res.status(200).json({ assignedCourses: student.purchasedCourses });
  } catch (error) {
    console.error('Error getting assigned courses:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all courses not assigned to the student
exports.getUnassignedCourses = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId);

    if (!student || student.role !== 'student') {
      return res.status(404).json({ error: 'Student not found' });
    }

    const assignedIds = student.purchasedCourses.map(id => id.toString());

    const unassignedCourses = await Course.find({
      _id: { $nin: assignedIds }
    });

    res.json(unassignedCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a course to a student
exports.assignCourseToStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || student.role !== 'student') {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (student.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ error: 'Course already assigned' });
    }

    student.purchasedCourses.push(courseId);
    await student.save();

    res.json({ message: 'Course assigned successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a course from a student
exports.removeCourseFromStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await User.findById(studentId);

    if (!student || student.role !== 'student') {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.purchasedCourses = student.purchasedCourses.filter(
      id => id.toString() !== courseId
    );

    await student.save();

    res.json({ message: 'Course removed successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
