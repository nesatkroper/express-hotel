const express = require("express");
const router = express.Router();

const {
  select,
  create,
  qtyIncrease,
  qtyDecrease,
  destroy,
} = require("@/controllers/product/cart-controller");

const { exportExcel } = require("@/controllers/export-excel/cart-excel");

router.get("/export", exportExcel);
router.get("/:auth_id?", select);
router.post("/", create);
router.put("/inc/:cart_id", qtyIncrease);
router.put("/dec/:cart_id", qtyDecrease);
router.delete("/:id", destroy);

module.exports = router;
