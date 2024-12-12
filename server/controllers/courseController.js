const Course = require('../models/Course');

// Controller to create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, courseCode, category, description, startDate, endDate, duration, material, chapters, instructor, contact, maxStudents, enrollmentDeadline, courseFee, discount, publishStatus } = req.body;

    const course = new Course({
      title,
      courseCode,
      category,
      description,
      startDate,
      endDate,
      duration,
      material,
      chapters,
      instructor,
      contact,
      maxStudents,
      enrollmentDeadline,
      courseFee,
      discount,
      publishStatus
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
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
