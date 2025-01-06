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

// Create a new student
const createStudent = async (req, res) => {
    try {
        const student = new User({ ...req.body, role: 'student' });
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Read student information
const getStudent = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student || student.role !== 'student') {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read student information by name
const getStudentByName = async (req, res) => {
    try {
        const student = await User.findOne({ userName: req.params.userName, role: 'student' });
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update student information
const updateStudent = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).send(err);
            }

            const student = await User.findById(req.params.id);
            if (!student || student.role !== 'student') {
                return res.status(404).send();
            }

            // If a new profile image is uploaded, delete the old one from S3
            if (req.file && student.profileImage) {
                const oldImageKey = student.profileImage.split('/').slice(-2).join('/');
                s3.deleteObject({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: oldImageKey
                }, (err, data) => {
                    if (err) console.error('Error deleting old image:', err);
                });

                // Update the profile image URL
                req.body.profileImage = req.file.location;
            }

            // Update student details
            const updatedStudent = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            res.send(updatedStudent);
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    try {
        const student = await User.findByIdAndDelete(req.params.id);
        if (!student || student.role !== 'student') {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {createStudent, getStudent, getAllStudents, getStudentByName, updateStudent, deleteStudent};
