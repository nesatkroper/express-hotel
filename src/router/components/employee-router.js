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
  selectInfo,
  selectReserve,
  selectSale,
  create,
  update,
  destroy,
} = require("@/controllers/employee-controller");

const {
  createInfo,
  updateInfo,
} = require("@/controllers/employee-info-controller");

router.get("/", authenticateJWT, select);
router.get("/info", authenticateJWT, selectInfo);
router.post("/info", authenticateJWT, upload.single("picture"), createInfo);
router.put("/info/:id", authenticateJWT, upload.single("picture"), updateInfo);
router.get("/reserve", authenticateJWT, selectReserve);
router.get("/sale", authenticateJWT, selectSale);
router.get("/:id", authenticateJWT, selectID);
router.post("/", authenticateJWT, create);
router.put("/:id", authenticateJWT, update);
router.delete("/:id", authenticateJWT, destroy);

module.exports = router;
