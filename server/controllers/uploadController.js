const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS S3
const s3 = new aws.S3();

const uploadFileToS3 = (filePath, fileName) => {
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
    ACL: 'public-read'
  };

  return s3.upload(uploadParams).promise();
};

// Controller to upload a file
exports.uploadFile = async (req, res) => {
  try {
    const file = req.body.file; // Base64 file
    const fileType = req.body.fileType; // 'video', 'pdf', 'image', etc.
    const buffer = Buffer.from(file, 'base64');
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileType}`;

    // Save the file temporarily
    const tempFilePath = path.join(__dirname, '../uploads', fileName);
    fs.writeFileSync(tempFilePath, buffer);

    // Upload to S3
    const s3Response = await uploadFileToS3(tempFilePath, fileName);

    // Delete the temporary file after uploading
    fs.unlinkSync(tempFilePath);

    res.status(200).json({ message: 'File uploaded successfully', fileUrl: s3Response.Location });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};
