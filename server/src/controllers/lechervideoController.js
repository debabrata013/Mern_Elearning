const Course = require('../models/Course');
const { Upload } = require('@aws-sdk/lib-storage');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/s3');

/**
 * Upload Video Endpoint
 * This endpoint uploads a video to S3 and then saves the returned URL
 * into the corresponding chapter's lessons array.
 */
exports.uploadVideo = async (req, res) => {
  const { courseId, chapterId } = req.params;

  try {
    // Create an upload instance to stream the file to S3
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `videos/${Date.now()}-${req.file.originalname}`, // Creates a unique filename
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      },
    });

    // Wait until the file is fully uploaded to S3
    const result = await upload.done();
    console.log('Upload successful:', result);

    // Find the course and the specific chapter
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    // Save the video URL in the lessons array (each lesson is an object with videoUrl)
    const videoUrl = result.Location;
    chapter.lessons.push({ videoUrl });
    await course.save();

    res.status(200).json({ message: 'Video uploaded successfully', videoUrl });
  } catch (err) {
    console.error('Error uploading video:', err);
    res.status(500).json({ message: 'Error uploading video', error: err.message });
  }
};

/**
 * Upload Resource Endpoint
 * This endpoint uploads a resource (PDF, document, etc.) to S3 and then saves the URL
 * into the chapter's resourceUrl array. We store just the URL string.
 */
exports.uploadResource = async (req, res) => {
  const { courseId, chapterId } = req.params;

  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `resources/${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      },
    });

    const result = await upload.done();
    console.log('Upload successful:', result);

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    // Optional cleanup of broken entries
    chapter.resourceUrl = chapter.resourceUrl.filter(r => r.url);

    // Get type
    const type = req.body.type || req.file.mimetype.split('/')[1].toUpperCase();

    chapter.resourceUrl.push({
      url: result.Location,
      type
    });

    await course.save();

    res.status(200).json({
      message: 'Resource uploaded successfully',
      resource: { url: result.Location, type }
    });

  } catch (err) {
    res.status(500).json({ message: 'Error uploading resource', error: err.message });
  }
};



/**
 * Delete Video Endpoint
 * This endpoint finds a specific lesson (by lessonId) within a chapter,
 * removes its file from S3 and then deletes the lesson from the course document.
 */
exports.deleteVideo = async (req, res) => {
  const { courseId, chapterId, lessonId } = req.params;

  try {
    const course = await Course.findById(courseId);
  
    
    if (!course) return res.status(404).json({ message: 'Course not found' });


    
    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });


    const lesson = chapter.lessons.id(lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
 
    // Validate and extract S3 key
    const urlParts = lesson.videoUrl.split('.amazonaws.com/');
    console.log("URL Parts:", urlParts);
    if (urlParts.length < 2) {
      return res.status(400).json({ message: 'Invalid S3 URL format' });
    }



    const key = urlParts[1];
console.log("deletion suru hoga ");

    // // Delete from S3
    // await s3.deleteObject({
    //   Bucket: process.env.S3_BUCKET_NAME,
    //   Key: key,
    // }).promise();
    await s3.send(new DeleteObjectCommand({ Bucket:process.env.S3_BUCKET_NAME,Key: key }));
 
    console.log("delete ho gaya cloud se ");

    // Remove the lesson from lessons array
    chapter.lessons.pull(lessonId); // cleaner than lesson.remove()
    await course.save();

    console.log("Lesson deleted from course:");
    res.status(200).json({ message: 'Video deleted successfully' });

  } catch (err) {
    res.status(500).json({
      message: 'Error deleting video',
      error: err.message,
    });
  }
};

/**
 * Delete Resource Endpoint
 * This endpoint deletes a resource from S3 and then from the chapter's resourceUrl array.
 * Since the resource is stored as a URL string, we use the string (passed as a parameter)
 * to identify and remove it.
 *
 * Route Example: DELETE /courses/:courseId/chapters/:chapterId/resources/:resourceUrl
 * Ensure that the resourceUrl parameter is URL-encoded.
 */
exports.deleteResource = async (req, res) => {
  const { courseId, chapterId, resourceId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    // Find the resource by _id
    const resource = chapter.resourceUrl.id(resourceId);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });

    // Extract the S3 key from the URL
    const urlParts = resource.url.split('.amazonaws.com/');
    if (urlParts.length < 2) {
      return res.status(400).json({ message: 'Invalid S3 URL format' });
    }

    const key = urlParts[1];

   

    await s3.send(new DeleteObjectCommand({ Bucket:process.env.S3_BUCKET_NAME,Key: key }));

    // Remove the resource from the array
    chapter.resourceUrl.pull(resourceId);
    await course.save();

    res.status(200).json({ message: 'Resource deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error deleting resource', error: err.message });
  }
};


