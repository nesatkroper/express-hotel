const express = require("express");
const { upload } = require("@/middleware/storage-middleware");

const router = express.Router();

const {
  select,
  create,
  update,
  destroy,
} = require("@/controllers/sale/roompicture-controller");

router.get("/:id?", select);
router.post("/", upload.single("picture"), create);
router.put("/:id", upload.single("picture"), update);
router.delete("/:id", destroy);

module.exports = router;
