const express = require("express");

const router = express.Router();

const {
  select,
  selectID,
  create,
  update,
  destroy,
} = require("@/controllers/sale/sale-detail-controller");

router.get("/", select);
router.get("/:id", selectID);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
