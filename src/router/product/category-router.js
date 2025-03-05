const { upload } = require("@/middleware/storage-middleware");
const express = require("express");
const router = express.Router();

const {
  select,
  create,
  update,
  patch,
  destroy,
} = require("@/controllers/product/category-controller");

router.get("/:id?", select);
router.post("/", upload.single("picture"), create);
router.put("/:id", update);
router.patch("/:id", patch);
router.delete("/:id", destroy);

module.exports = router;
