const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mongoose = require('mongoose');
const ProfessionalCourse = require('../models/Course'); 
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

// Multer S3 setup for file uploads
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, `uploads/${Date.now()}_${file.originalname}`);
        }
    })
});

// Upload video for a lesson
exports.uploadLessonVideo = async (req, res) => {
    try {
        const { courseId, chapterId, lessonId } = req.params;
        const videoUrl = req.file.location;
        
        const course = await ProfessionalCourse.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
        
        const lesson = chapter.lessons.id(lessonId);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
        
        lesson.videoUrl = videoUrl;
        await course.save();
        res.status(200).json({ message: 'Video uploaded successfully', videoUrl });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete lesson video
exports.deleteLessonVideo = async (req, res) => {
    try {
        const { courseId, chapterId, lessonId } = req.params;
        const course = await ProfessionalCourse.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
        
        const lesson = chapter.lessons.id(lessonId);
        if (!lesson || !lesson.videoUrl) return res.status(404).json({ message: 'Video not found' });
        
        const videoKey = lesson.videoUrl.split('/').pop();
        await s3.deleteObject({ Bucket: process.env.S3_BUCKET_NAME, Key: `uploads/${videoKey}` }).promise();
        
        lesson.videoUrl = null;
        await course.save();
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Upload resource file
exports.uploadResource = async (req, res) => {
    try {
        const { courseId, chapterId } = req.params;
        const resourceUrl = req.file.location;
        
        const course = await ProfessionalCourse.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
        
        chapter.resourceUrl.push({ _id: new mongoose.Types.ObjectId(), type: resourceUrl });
        await course.save();
        res.status(200).json({ message: 'Resource uploaded successfully', resourceUrl });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete resource file
exports.deleteResource = async (req, res) => {
    try {
        const { courseId, chapterId, resourceId } = req.params;
        const course = await ProfessionalCourse.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
        
        const resourceIndex = chapter.resourceUrl.findIndex(r => r._id.toString() === resourceId);
        if (resourceIndex === -1) return res.status(404).json({ message: 'Resource not found' });
        
        const resourceKey = chapter.resourceUrl[resourceIndex].type.split('/').pop();
        await s3.deleteObject({ Bucket: process.env.S3_BUCKET_NAME, Key: `uploads/${resourceKey}` }).promise();
        
        chapter.resourceUrl.splice(resourceIndex, 1);
        await course.save();
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
