const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../../public/uploads/customer");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, "public/uploads/customer");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
      cb(null, true);
    else cb(new Error("Invalid file type"), false);

    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

const {
  select,
  create,
  update,
  patch,
  destroy,
} = require("@/controllers/homan-resource/customer-controller");

router.get("/:id?", select);
router.post("/", upload.single("picture"), create);
router.put("/:id", upload.single("picture"), update);
router.patch("/:id", patch);
router.delete("/:id", destroy);

module.exports = router;
