const AWS = require('aws-sdk');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set this in your environment variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set this in your environment variables
  region: process.env.AWS_REGION // e.g., 'us-east-1'
});

async function uploadToS3(file) {
  try {
    // Generate a unique file name
    const uniqueFileName = `${uuidv4()}_${path.basename(file.originalname)}`;

    // Prepare the parameters for S3 upload
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Your bucket name
      Key: uniqueFileName, // The key (path + file name) in the bucket
      Body: file.buffer, // The file content (buffer)
      ContentType: file.mimetype, // File MIME type
      ACL: 'public-read' // Optional: Set permissions (e.g., make it publicly readable)
    };

    // Upload the file to S3
    const uploadResult = await s3.upload(params).promise();

    // Return the file URL
    return uploadResult.Location;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
}

module.exports = uploadToS3;