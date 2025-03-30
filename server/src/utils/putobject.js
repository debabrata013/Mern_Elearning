const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3-credential");

exports.putObject = async (file, fileName) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME, // S3 Bucket name
            Key: fileName, // File name in the bucket
            Body: file.buffer, // File content
            ContentType: file.mimetype, // Use the file's MIME type dynamically
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Generate the file's URL (assuming public access is enabled)
        const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        
        return fileUrl;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
};
