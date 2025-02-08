const express = require("express");
const router = express.Router();

const {
  select,
  selectById,
  create,
  update,
  destroy,
} = require("@/controllers/homan-resource/users-controller");

router.get("/", select);
router.get("/:id", selectById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
