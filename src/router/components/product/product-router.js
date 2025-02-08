const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../../public/uploads/product");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, "public/uploads/product");
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
} = require("@/controllers/product/product-controller");

router.get("/", select);
router.get("/:id", selectID);
router.post("/", upload.single("picture"), create);
router.put("/:id", upload.single("picture"), update);
router.delete("/:id", destroy);

module.exports = router;
