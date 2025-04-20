const express = require("express");
const { upload } = require("@/middleware/storage-middleware");
const authenticateJWT = require("@/middleware/auth-middleware");

const router = express.Router();

const {
  select,
  create,
  update,
  patch,
  destroy,
} = require("@/controllers/human-resource/employee-controller");

const {
  createInfo,
  updateInfo,
} = require("@/controllers/human-resource/employeeinfo-controller");

router.get("/:id?", select);
router.post("/", create);
router.put("/:id", update);
router.patch("/:id", patch);
router.delete("/:id", destroy);
router.post("/info", upload.single("picture"), createInfo);
router.put("/info/:id", upload.single("picture"), updateInfo);

module.exports = router;
