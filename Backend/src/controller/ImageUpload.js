const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { folderName } = req.params;
    const uploadPath = path.join(__dirname, "./public/upload", folderName);

    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer middleware for handling single image upload
const upload = multer({ storage }).array[("image", "pdf")];

const uploadImage = async (file, folderName) => {
  try {
    const destinationPath = path.join(__dirname, "./public/upload", folderName);

    // Ensure destination directory exists
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Check if file is available in the request
    if (!file) {
      throw new Error("No file provided in the request");
    }

    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const targetFileName = uniqueSuffix + path.extname(file.originalname);
    const targetPath = path.join(destinationPath, targetFileName);

    // Move file to target path
    fs.renameSync(file.path, targetPath);

    // Return the relative path to be saved in the database
    console.log("path", `/upload/${folderName}/${targetFileName}`);
    return `/upload/${folderName}/${targetFileName}`;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadImage;
