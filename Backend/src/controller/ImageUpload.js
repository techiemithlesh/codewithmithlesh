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
const upload = multer({ storage }).single("image");

const uploadImage = async (req, folderName) => {
  try {
    const destinationPath = path.join(__dirname, "./public/upload", folderName);

    // Ensure destination directory exists
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Check if file is available in the request
    if (!req.file) {
      throw new Error("No file provided in the request");
    }

    // Set the target file path
    const targetPath = path.join(destinationPath, req.file.originalname);

    // Move file to target path
    fs.renameSync(req.file.path, targetPath);

    // Return the relative path to be saved in the database
    console.log("path", `/upload/${folderName}/${req.file.originalname}`);
    return `/upload/${folderName}/${req.file.originalname}`;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadImage;
