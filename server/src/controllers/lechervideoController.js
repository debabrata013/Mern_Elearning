const Course = require('../models/Course');
const s3 = require('../config/s3');

// Upload video
exports.uploadVideo = async (req, res) => {
  const { courseId, chapterId } = req.params;
console.log("Hello dosto");

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    const videoUrl = req.file.location;
    chapter.lessons.push({ videoUrl });
    await course.save();

    res.status(200).json({ message: 'Video uploaded successfully', videoUrl });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading video', error: err.message });
  }
};

// Upload resource
exports.uploadResource = async (req, res) => {
  const { courseId, chapterId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    const resourceUrl = req.file.location;
    chapter.resourceUrl.push(resourceUrl);
    await course.save();

    res.status(200).json({ message: 'Resource uploaded successfully', resourceUrl });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading resource', error: err.message });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  const { courseId, chapterId, lessonId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    const lesson = chapter.lessons.id(lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    const key = lesson.videoUrl.split('.amazonaws.com/')[1];
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key
    }).promise();

    lesson.remove();
    await course.save();

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting video', error: err.message });
  }
};

// Delete resource
exports.deleteResource = async (req, res) => {
  const { courseId, chapterId, resourceId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    const resourceIndex = chapter.resourceUrl.findIndex(r => r._id.toString() === resourceId);
    if (resourceIndex === -1) return res.status(404).json({ message: 'Resource not found' });

    const key = chapter.resourceUrl[resourceIndex].type.split('.amazonaws.com/')[1];
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key
    }).promise();

    chapter.resourceUrl.splice(resourceIndex, 1);
    await course.save();

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting resource', error: err.message });
  }
};
