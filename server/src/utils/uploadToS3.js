const AWS = require('aws-sdk');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,           // Set in your environment variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,   // Set in your environment variables
  region: process.env.AWS_REGION                        // e.g., 'us-east-1'
});

/**
 * Uploads a single file to AWS S3.
 *
 * @param {Object} file - The file object, which should contain properties like buffer, originalname, and mimetype.
 * @returns {Promise<string>} - Resolves with the URL of the uploaded file.
 */
async function uploadToS3(file) {
  try {
    // Generate a unique file name to avoid overwrites.
    const uniqueFileName = `${uuidv4()}_${path.basename(file.originalname)}`;

    // Prepare S3 upload parameters.
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,  // Your S3 bucket name.
      Key: uniqueFileName,                     // The key in the S3 bucket.
      Body: file.buffer,                       // The file content.
      ContentType: file.mimetype,              // MIME type of the file.
      ACL: 'public-read'                       // Optionally make the file publicly readable.
    };

    // Upload the file to S3 and return the file URL.
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
}

/**
 * Uploads multiple files to AWS S3.
 *
 * This function accepts either:
 *   - an array of file objects, or
 *   - an object where each key maps to an array of file objects (for multiple file types).
 *
 * @param {Array|Object} files - The file(s) to upload.
 * @returns {Promise<Array|string|Object>} - Resolves with:
 *   - an array of URLs (if an array was provided),
 *   - a single URL (if a single file object is provided),
 *   - or an object mapping keys to arrays of URLs (if an object was provided).
 */
async function uploadFilesToS3(files) {
  // If "files" is an array, upload all concurrently.
  if (Array.isArray(files)) {
    return Promise.all(files.map(file => uploadToS3(file)));
  }
  
  // If "files" is an object, assume each key corresponds to an array of file objects.
  else if (typeof files === 'object' && files !== null) {
    const uploadedFiles = {};
    const keys = Object.keys(files);
    
    // Process each file type concurrently.
    await Promise.all(
      keys.map(async (key) => {
        const fileArray = files[key];
        if (Array.isArray(fileArray)) {
          uploadedFiles[key] = await Promise.all(fileArray.map(file => uploadToS3(file)));
        } else if (fileArray) {
          // If it's a single file instead of an array.
          uploadedFiles[key] = await uploadToS3(fileArray);
        }
      })
    );
    return uploadedFiles;
  }
  
  // If the input is neither an array nor an object, throw an error.
  else {
    throw new Error('Invalid files input. Expected an array or an object.');
  }
}

module.exports = { uploadToS3, uploadFilesToS3 };
