const User = require('../models/User');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Configure multer-s3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            const fileName = `profileImages/${req.params.id}${path.extname(file.originalname)}`;
            cb(null, fileName);
        }
    })
}).single('profileImage');

// Create a new teacher
exports.createTeacher = async (req, res) => {
    try {
        const teacher = new User({ ...req.body, role: 'teacher' });
        await teacher.save();
        res.status(201).send(teacher);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Read teacher information
exports.getTeacher = async (req, res) => {
    try {
        console.log("getTeacher");
        
        const teacher = await User.findById(req.params.id);
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).send();
        }
        res.send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Read teacher information by name
exports.getTeacherByName = async (req, res) => {
    try {
        const teacher = await User.findOne({ userName: req.params.userName, role: 'teacher' });
        if (!teacher) {
            return res.status(404).send();
        }
        res.send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' });
        res.send(teachers);
    } catch (error) {
        res.status(500).send(error);
    }
};


// Update teacher information
exports.updateTeacher = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).send(err);
            }

            const teacher = await User.findById(req.params.id);
            if (!teacher || teacher.role !== 'teacher') {
                return res.status(404).send();
            }

            // If a new profile image is uploaded, delete the old one from S3
            if (req.file && teacher.profileImage) {
                const oldImageKey = teacher.profileImage.split('/').slice(-2).join('/');
                s3.deleteObject({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: oldImageKey
                }, (err, data) => {
                    if (err) console.error('Error deleting old image:', err);
                });

                // Update the profile image URL
                req.body.profileImage = req.file.location;
            }

            // Update teacher details
            const updatedTeacher = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            res.send(updatedTeacher);
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await User.findByIdAndDelete(req.params.id);
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).send();
        }
        res.send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};
