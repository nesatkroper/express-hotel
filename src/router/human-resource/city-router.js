const express = require("express");

const router = express.Router();

const {
  select,
  create,
  update,
  destroy,
} = require("@/controllers/human-resource/city-controller");

router.get("/:id?", select);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
