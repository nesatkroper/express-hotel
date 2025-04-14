const multer = require("multer");
const path = require("path");

/**
 * Configures the disk storage settings for multer to store uploaded files in the specified destination folder
 * with a unique filename generated based on the original filename, current timestamp, and a random number.
 * @param {Object} storage - The storage configuration object for multer.
 * @param {string} destination - The destination folder where uploaded files will be stored.
 * @param {Function} filename - The function to determine the filename of the uploaded file.
 * @param {Object} req - The request object.
 * @param {Object} file - The uploaded file object.
 * @param {Function} cb - The callback function to call once the filename is determined.
 * @returns None
 */
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

/**
 * Module exports an object with functions and configurations for file upload.
 * @type {Object}
 * @property {Function} upload - Function to handle file upload.
 * @property {Function} fileFilter - Function to filter files based on mimetype.
 * @property {Object} limits - Object containing file size limit configuration.
 */
module.exports = {
  upload,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
      cb(null, true);
    else cb(new Error("Invalid file type"), false);

    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
};
