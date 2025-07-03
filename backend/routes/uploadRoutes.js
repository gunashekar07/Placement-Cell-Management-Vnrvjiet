const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const path = require("path");

const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

// Create directories if they don't exist
const ensureDirectoriesExist = () => {
  const dirs = [
    path.join(__dirname, "../public"),
    path.join(__dirname, "../public/resume"),
    path.join(__dirname, "../public/profile"),
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
  }
};

// Ensure directories exist
ensureDirectoriesExist();

// Set up multer with file size limits and storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Log the incoming file
    console.log("Incoming file:", {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
    
    // Allow all files, we'll validate specific types in the route handlers
    cb(null, true);
  }
});

// Helper function to save file to disk
const saveFileToDisk = async (buffer, filepath) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Resume upload endpoint
router.post("/resume", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    
    console.log("DEBUG: Received file upload request for resume", {
      mimetype: file.mimetype,
      originalname: file.originalname,
      size: file.size,
    });
    
    // Check mimetype and file extension
    const isValidPdf = 
      file.mimetype === "application/pdf" || 
      file.originalname.toLowerCase().endsWith('.pdf');
      
    if (!isValidPdf) {
      return res.status(400).json({
        message: "Invalid format. Only PDF files are allowed.",
        debug: {
          mimetype: file.mimetype,
          originalname: file.originalname
        }
      });
    }
    
    const fileExt = ".pdf";
    const filename = `${uuidv4()}${fileExt}`;
    const filepath = path.join(__dirname, "../public/resume", filename);

    try {
      await saveFileToDisk(file.buffer, filepath);
      
      res.send({
        message: "Resume uploaded successfully",
        url: `/host/resume/${filename}`,
      });
    } catch (err) {
      console.error("Resume save error:", err);
      res.status(500).json({
        message: "Error saving file to disk",
        error: err.message
      });
    }
  } catch (err) {
    console.error("Resume upload exception:", err);
    res.status(500).json({
      message: "Server error during upload",
      error: err.message
    });
  }
});

// Profile image upload endpoint
router.post("/profile", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    
    console.log("DEBUG: Received file upload request for profile", {
      mimetype: file.mimetype,
      originalname: file.originalname,
      size: file.size,
    });
    
    // Check mimetype and file extension
    const isJpg = 
      file.mimetype === "image/jpeg" || 
      file.originalname.toLowerCase().endsWith('.jpg') ||
      file.originalname.toLowerCase().endsWith('.jpeg');
      
    const isPng = 
      file.mimetype === "image/png" || 
      file.originalname.toLowerCase().endsWith('.png');
    
    if (!isJpg && !isPng) {
      return res.status(400).json({
        message: "Invalid format. Only JPG and PNG files are allowed.",
        debug: {
          mimetype: file.mimetype,
          originalname: file.originalname
        }
      });
    }
    
    // Determine the file extension based on mime type
    let fileExt = ".jpg";
    if (file.mimetype === "image/png" || file.originalname.toLowerCase().endsWith('.png')) {
      fileExt = ".png";
    }
    
    const filename = `${uuidv4()}${fileExt}`;
    const filepath = path.join(__dirname, "../public/profile", filename);

    try {
      await saveFileToDisk(file.buffer, filepath);
      
      res.send({
        message: "Profile image uploaded successfully",
        url: `/host/profile/${filename}`,
      });
    } catch (err) {
      console.error("Profile save error:", err);
      res.status(500).json({
        message: "Error saving file to disk",
        error: err.message
      });
    }
  } catch (err) {
    console.error("Profile upload exception:", err);
    res.status(500).json({
      message: "Server error during upload",
      error: err.message
    });
  }
});

module.exports = router;
