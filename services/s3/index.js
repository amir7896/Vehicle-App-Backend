const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// Edit image name
const editString = (str) => str.replace(/\..*/, "");

// Create image name
let createImageName = (folder, file) =>
  `${folder}/${Date.now()}-${editString(file.originalname)}`;

// ==================
// Upload image to s3
// ==================
const uploadImage = async (file, folder) => {
  // Calling create image name method
  const imageName = createImageName(folder, file);

  // Put object command instance
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${imageName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  // Sending image to s3 bucket
  await s3.send(command);
  return imageName;
};

// =================
// Get image from s3
// =================
const getImage = async (fileName) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: fileName,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

// ====================
// Delete Image from S3
// ====================

const deleteImage = async (key) => {
  const deleteObjectParams = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new DeleteObjectCommand(deleteObjectParams);
  await s3.send(command);
};

module.exports = {
  uploadImage,
  getImage,
  deleteImage,
};
