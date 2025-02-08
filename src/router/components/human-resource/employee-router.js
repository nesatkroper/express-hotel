const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authenticateJWT = require("@/middleware/auth-middleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../../public/uploads/employee");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, "public/uploads/employee");
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
  selectID,
  create,
  update,
  destroy,
} = require("@/controllers/homan-resource/employee-controller");

const {
  createInfo,
  updateInfo,
} = require("@/controllers/homan-resource/employee-info-controller");

router.get("/:id?", select);
router.post("/info", upload.single("picture"), createInfo);
router.put("/info/:id", upload.single("picture"), updateInfo);
// router.get("/:id", selectID);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
