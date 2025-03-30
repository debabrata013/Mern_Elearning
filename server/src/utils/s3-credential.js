const { S3Client } = require("@aws-sdk/client-s3");

exports.s3Client = new S3Client({
    region: process.env.AWS_REGION, // Use environment variable for flexibility
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // AWS Secret Key
    }
});
