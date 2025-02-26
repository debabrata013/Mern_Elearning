// courseController.js

const AWS = require('aws-sdk');
const Course = require('../models/Course'); // your mongoose model
// Configure AWS S3 using environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Helper function to upload a single file buffer to S3
const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`, // you can change the folder/key as needed
    Body: file.buffer,
  };
  const data = await s3.upload(params).promise();
  return data.Location; // returns the file URL
};

// Helper function to delete a file from S3 given its URL.
// This function extracts the S3 object key from the URL.
const deleteFileFromS3 = async (fileUrl) => {
  if (!fileUrl) return;
  const urlParts = fileUrl.split('.com/');
  if (urlParts.length < 2) return;
  const key = urlParts[1];
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };
  await s3.deleteObject(params).promise();
};

/**
 * Create Course Controller
 * Expects course details in req.body and file uploads in req.files:
 * - coverImage, introVideo, syllabusPDF
 */
exports.createCourse = async (req, res) => {
  try {
    // Destructure fields from req.body (they might be strings)
    let {
      title,
      courseCode,
      category,
      description,
      startDate,
      endDate,
      duration,
      teacher,       // maps to instructor
      contact,       // maps to contactEmail
      maxStudents,
      enrollmentDeadline,
      courseFee,     // maps to price
      discount,
      chapters,
      level,         // now required
      // other fields as needed
    } = req.body;

    // Parse chapters if it's a JSON string
    if (typeof chapters === "string") {
      try {
        chapters = JSON.parse(chapters);
      } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid chapters format" });
      }
    }

    // Upload files if provided
    let coverImageUrl, introVideoUrl, syllabusUrl;
    if (req.files && req.files.coverImage) {
      coverImageUrl = await uploadFileToS3(req.files.coverImage[0]);
    }
    if (req.files && req.files.introVideo) {
      introVideoUrl = await uploadFileToS3(req.files.introVideo[0]);
    }
    if (req.files && req.files.syllabusPDF) {
      syllabusUrl = await uploadFileToS3(req.files.syllabusPDF[0]);
    }

    // Build the course data object
    const courseData = {
      title,
      coverImage: coverImageUrl,
      introVideo: introVideoUrl,
      courseCode,
      category,
      description,
      startDate,
      endDate,
      duration,
      chapters: chapters || [],
      instructor: teacher,    // teacher field maps to instructor (_id expected)
      contactEmail: contact,
      maxStudents,
      enrollmentDeadline,
      price: courseFee,
      discount,
      level,                  // required field now provided
      // Add any additional mappings (e.g., prerequisites, language, etc.)
    };

    const newCourse = new Course(courseData);
    await newCourse.save();

    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


/**
 * Update Course Controller
 * Expects course id in req.params and updated fields in req.body.
 * Also processes new file uploads if provided.
 */
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Create an update object from req.body
    const updateFields = { ...req.body };

    // Handle file updates if new files are provided
    if (req.files) {
      if (req.files.coverImage) {
        if (course.coverImage) await deleteFileFromS3(course.coverImage);
        const coverImageUrl = await uploadFileToS3(req.files.coverImage[0]);
        updateFields.coverImage = coverImageUrl;
      }
      if (req.files.introVideo) {
        if (course.introVideo) await deleteFileFromS3(course.introVideo);
        const introVideoUrl = await uploadFileToS3(req.files.introVideo[0]);
        updateFields.introVideo = introVideoUrl;
      }
      if (req.files.syllabusPDF) {
        if (course.syllabus) await deleteFileFromS3(course.syllabus);
        const syllabusUrl = await uploadFileToS3(req.files.syllabusPDF[0]);
        updateFields.syllabus = syllabusUrl;
      }
    }

    // Map fields: teacher -> instructor, contact -> contactEmail, courseFee -> price
    if (updateFields.teacher) {
      updateFields.instructor = updateFields.teacher;
      delete updateFields.teacher;
    }
    if (updateFields.contact) {
      updateFields.contactEmail = updateFields.contact;
      delete updateFields.contact;
    }
    if (updateFields.courseFee) {
      updateFields.price = updateFields.courseFee;
      delete updateFields.courseFee;
    }

    course = await Course.findByIdAndUpdate(courseId, updateFields, { new: true });
    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Upload Lecture Controller
 * This endpoint handles uploading a lecture video file to S3 and updates the course.
 * Expected parameters:
 * - req.body.courseId: the course id
 * - req.body.chapterIndex: index (number) of the chapter in the course.chapters array
 * - req.body.lessonIndex (optional): index (number) of the lesson within the chapter to update.
 *   If not provided, a new lesson will be added.
 * Additional lesson details can be provided in req.body (lessonTitle, lessonContent, duration)
 * The lecture video file is expected as a single file in req.file (using multer.single('lectureVideo')).
 */
exports.uploadLecture = async (req, res) => {
  try {
    const { courseId, chapterIndex, lessonIndex, lessonTitle, lessonContent, duration } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const videoUrl = await uploadFileToS3(req.file);

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const chapIdx = parseInt(chapterIndex);
    if (chapIdx >= course.chapters.length) {
      return res.status(400).json({ success: false, message: "Invalid chapter index" });
    }

    // If lessonIndex is provided, update the existing lesson's videoUrl
    if (lessonIndex !== undefined && lessonIndex !== null) {
      const lesIdx = parseInt(lessonIndex);
      if (lesIdx >= course.chapters[chapIdx].lessons.length) {
        return res.status(400).json({ success: false, message: "Invalid lesson index" });
      }
      course.chapters[chapIdx].lessons[lesIdx].videoUrl = videoUrl;
    } else {
      // Otherwise, create a new lesson with the uploaded video
      const newLesson = {
        title: lessonTitle || "New Lesson",
        content: lessonContent || "",
        videoUrl,
        duration: duration ? parseInt(duration) : 0,
      };
      course.chapters[chapIdx].lessons.push(newLesson);
    }

    await course.save();
    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error uploading lecture video:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Delete Lecture Video Controller
 * Expects the following in req.body:
 * - courseId: the id of the course
 * - chapterIndex: index (number) of the chapter
 * - lessonIndex: index (number) of the lesson whose video is to be deleted
 */
exports.deleteLectureVideo = async (req, res) => {
  try {
    const { courseId, chapterIndex, lessonIndex } = req.body;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const chapIdx = parseInt(chapterIndex);
    const lesIdx = parseInt(lessonIndex);

    if (chapIdx >= course.chapters.length || lesIdx >= course.chapters[chapIdx].lessons.length) {
      return res.status(400).json({ success: false, message: "Invalid chapter or lesson index" });
    }

    const videoUrl = course.chapters[chapIdx].lessons[lesIdx].videoUrl;
    if (videoUrl) {
      await deleteFileFromS3(videoUrl);
      // Remove the video URL from the lesson
      course.chapters[chapIdx].lessons[lesIdx].videoUrl = "";
      await course.save();
      res.status(200).json({ success: true, message: "Lecture video deleted", course });
    } else {
      res.status(400).json({ success: false, message: "No video found for this lesson" });
    }
  } catch (error) {
    console.error("Error deleting lecture video:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Delete Course Controller
 * Deletes a course by id (from req.params) and optionally removes all associated files from S3.
 */
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Delete files associated with the course
    if (course.coverImage) await deleteFileFromS3(course.coverImage);
    if (course.introVideo) await deleteFileFromS3(course.introVideo);
    if (course.syllabus) await deleteFileFromS3(course.syllabus);

    // Delete any lecture videos in the chapters
    for (let i = 0; i < course.chapters.length; i++) {
      for (let j = 0; j < course.chapters[i].lessons.length; j++) {
        const lesson = course.chapters[i].lessons[j];
        if (lesson.videoUrl) {
          await deleteFileFromS3(lesson.videoUrl);
        }
      }
    }

    await Course.findByIdAndDelete(courseId);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
