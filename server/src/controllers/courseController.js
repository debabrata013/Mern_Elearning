const Course = require('../models/Course');
const uploadToS3 = require('../utils/uploadToS3');

/**
 * Create a new course.
 * Supports optional file uploads (coverImage, introVideo, material).
 */
exports.createCourse = async (req, res) => {
  try {
    // Copy all course fields from req.body
    const courseData = { ...req.body };

    // If files are provided, upload them concurrently
    if (req.files) {
      const { coverImage, introVideo, material } = req.files;

      // Create an array of promises for file uploads if they exist
      const uploadPromises = [];
      if (coverImage && coverImage[0]) {
        uploadPromises.push(uploadToS3(coverImage[0]));
      } else {
        uploadPromises.push(Promise.resolve(null));
      }
      if (introVideo && introVideo[0]) {
        uploadPromises.push(uploadToS3(introVideo[0]));
      } else {
        uploadPromises.push(Promise.resolve(null));
      }
      if (material && material[0]) {
        uploadPromises.push(uploadToS3(material[0]));
      } else {
        uploadPromises.push(Promise.resolve(null));
      }

      // Destructure the uploaded URLs (they will be null if not uploaded)
      const [coverImageUrl, introVideoUrl, materialUrl] = await Promise.all(uploadPromises);

      // Attach URLs to courseData if they exist
      if (coverImageUrl) courseData.coverImage = coverImageUrl;
      if (introVideoUrl) courseData.introVideo = introVideoUrl;
      if (materialUrl) courseData.material = materialUrl;
    }

    // Create and save the new course document
    const course = new Course(courseData);
    await course.save();

    return res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ message: 'Error creating course', error });
  }
};

/**
 * Add a chapter to a course.
 * Expects courseId in the URL params and chapter details in req.body.
 */
exports.addChapter = async (req, res) => {
  try {
    const { title, description, materialUrl } = req.body;
    const { courseId } = req.params;

    // Validate required chapter fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required for a chapter.' });
    }

    // Use $push to add a new chapter to the chapters array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { chapters: { title, description, material: materialUrl } }
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json({ message: 'Chapter added successfully', course: updatedCourse });
  } catch (error) {
    console.error('Error adding chapter:', error);
    return res.status(500).json({ message: 'Error adding chapter', error });
  }
};

/**
 * Retrieve all courses.
 */
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ message: 'Error fetching courses', error });
  }
};

/**
 * Retrieve a single course by ID.
 */
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return res.status(500).json({ message: 'Error fetching course', error });
  }
};

/**
 * Update a course by ID.
 */
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(id, courseData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    return res.status(500).json({ message: 'Error updating course', error });
  }
};

/**
 * Delete a course by ID.
 */
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ message: 'Error deleting course', error });
  }
};
