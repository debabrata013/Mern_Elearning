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
  // Validate input
  if (!file || !file.buffer || !file.originalname) {
    throw new Error('Invalid file object: Missing buffer or originalname');
  }

  // Validate file size (optional: adjust max size as needed)
  const MAX_FILE_SIZE = 5000 * 1024 * 1024; // 50MB
  if (file.buffer.length > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }

  // Validate file type (optional: add more allowed types as needed)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'application/pdf'];
  if (file.mimetype && !allowedTypes.includes(file.mimetype)) {
    throw new Error(`Unsupported file type: ${file.mimetype}`);
  }

  // Prepare S3 upload parameters
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    // Optional: Add content type for better S3 handling
    ContentType: file.mimetype || 'application/octet-stream'
  };

  try {
    // Attempt S3 upload with additional error handling
    const data = await s3.upload(params).promise();
    
    // Verify upload success
    if (!data || !data.Location) {
      throw new Error('S3 upload failed: No location returned');
    }

    return data.Location;
  } catch (error) {
    // Log detailed error for server-side tracking
    console.error('S3 Upload Error:', {
      message: error.message,
      code: error.code,
      originalFileName: file.originalname
    });

    // Throw a more user-friendly error
    if (error.code === 'AccessDenied') {
      throw new Error('Unable to upload file: Access denied to S3 bucket');
    } else if (error.code === 'NoSuchBucket') {
      throw new Error('S3 bucket does not exist');
    } else if (error.code === 'NetworkingError') {
      throw new Error('Network error occurred during file upload');
    } else {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
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
    console.log('Received course creation request');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Request files:', req.files ? Object.keys(req.files) : 'No files');

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

    // Validate required fields
    // const requiredFields = ['title', 'courseCode', 'category', 'level'];
    // const missingFields = requiredFields.filter(field => !req.body[field]);
    // if (missingFields.length > 0) {
    //   return res.status(400).json({ 
    //     success: false, 
    //     message: `Missing required fields: ${missingFields.join(', ')}` 
    //   });
    // }

    // Parse chapters if it's a JSON string
    if (typeof chapters === "string") {
      try {
        chapters = JSON.parse(chapters);
      } catch (err) {
        console.error('Error parsing chapters:', err);
        return res.status(400).json({ success: false, message: "Invalid chapters format" });
      }
    }

    // Upload files if provided
    let coverImageUrl, introVideoUrl, syllabusUrl;
    try {
      if (req.files && req.files.coverImage) {
        console.log('Uploading cover image');
        coverImageUrl = await uploadFileToS3(req.files.coverImage[0]);
      }
      if (req.files && req.files.introVideo) {
        console.log('Uploading intro video');
        introVideoUrl = await uploadFileToS3(req.files.introVideo[0]);
      }
      if (req.files && req.files.syllabusPDF) {
        console.log('Uploading syllabus PDF');
        syllabusUrl = await uploadFileToS3(req.files.syllabusPDF[0]);
      }
    } catch (uploadError) {
      console.error('File upload error:', uploadError);
      return res.status(500).json({ 
        success: false, 
        message: `File upload failed: ${uploadError.message}` 
      });
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
    };

    console.log('Course data to be saved:', JSON.stringify(courseData, null, 2));

    const newCourse = new Course(courseData);
    
    try {
      await newCourse.save();
      console.log('Course saved successfully');
      
      res.status(201).json({ success: true, course: newCourse });
    } catch (saveError) {
      console.error('Error saving course:', saveError);
      res.status(500).json({ 
        success: false, 
        message: `Failed to save course: ${saveError.message}`,
        errors: saveError.errors 
      });
    }
  } catch (error) {
    console.error("Unexpected error creating course:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: error.stack 
    });
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
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: error.stack 
    });
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
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: error.stack 
    });
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
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: error.stack 
    });
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
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: error.stack 
    });
  }
};
