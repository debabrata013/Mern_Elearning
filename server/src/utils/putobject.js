const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3-credential"); // Import the S3 client

exports.putObject = async (file, fileName) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME, // S3 Bucket name
            Key: fileName, // File name in the bucket
            Body: file.buffer, // File content
            ContentType: file.mimetype, // File MIME type
            ACL: "public-read" // Optional: Set file as publicly readable
        };

        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);

        console.log("File uploaded successfully:", response);
        return response;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
};
