const Course = require('../models/Course');
const uploadToS3 = require('../utils/uploadToS3');


// Controller to create a new course
const Course = require('../models/Course');
const uploadToS3 = require('../utils/uploadToS3');

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      courseCode,
      category,
      description,
      startDate,
      endDate,
      duration,
      chapters,
      instructor,
      contact,
      maxStudents,
      enrollmentDeadline,
      courseFee,
      discount,
      publishStatus,
    } = req.body;

    // Assuming files are uploaded via a form and available in req.files
    const { coverImage, introVideo, syllabusPDF } = req.files;

    // Upload files to AWS S3 and get the URLs
    const coverImageUrl = await uploadToS3(coverImage[0]); // Upload the first file in the array
    const introVideoUrl = await uploadToS3(introVideo[0]); // Upload the first file in the array
    const syllabusPDFUrl = await uploadToS3(syllabusPDF[0]); // Upload the first file in the array

    // Create a new Course document
    const course = new Course({
      title,
      courseCode,
      category,
      description,
      startDate,
      endDate,
      duration,
      coverImage: coverImageUrl, // Save the URL in the database
      introVideo: introVideoUrl, // Save the URL in the database
      syllabusPDF: syllabusPDFUrl, // Save the URL in the database
      chapters,
      instructor,
      contact,
      maxStudents,
      enrollmentDeadline,
      courseFee,
      discount,
      publishStatus,
    });

    // Save the course to the database
    await course.save();

    // Respond with the created course
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course', error });
  }
};

// Controller to add a chapter
exports.addChapter = async (req, res) => {
  try {
    const { title, description, materialUrl } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.chapters.push({ title, description, material: materialUrl });
    await course.save();

    res.status(200).json({ message: 'Chapter added successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error adding chapter', error });
  }
};


// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const course = new Course(courseData);
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = req.body;
    const course = await Course.findByIdAndUpdate(id, courseData, { new: true, runValidators: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};
