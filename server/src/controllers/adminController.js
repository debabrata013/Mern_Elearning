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

// Create a new admin
exports.createAdmin = async (req, res) => {
    try {
        const admin = new User({ ...req.body, role: 'admin' });
        
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Read admin information
exports.getAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin || admin.role !== 'admin') {
            return res.status(404).send();
        }
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update admin information
exports.updateAdmin = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).send(err);
            }

            const admin = await User.findById(req.params.id);
            if (!admin || admin.role !== 'admin') {
                return res.status(404).send();
            }

            // If a new profile image is uploaded, delete the old one from S3
            if (req.file && admin.profileImage) {
                const oldImageKey = admin.profileImage.split('/').slice(-2).join('/');
                s3.deleteObject({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: oldImageKey
                }, (err, data) => {
                    if (err) console.error('Error deleting old image:', err);
                });

                // Update the profile image URL
                req.body.profileImage = req.file.location;
            }

            // Update admin details
            const updatedAdmin = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            res.send(updatedAdmin);
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await User.findByIdAndDelete(req.params.id);
        if (!admin || admin.role !== 'admin') {
            return res.status(404).send();
        }
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
};
