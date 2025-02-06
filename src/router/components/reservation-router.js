const express = require("express");
const authenticateJWT = require("@/middleware/auth-middleware");

const router = express.Router();

const {
  select,
  selectID,
  create,
  update,
  destroy,
} = require("@/controllers/reservation-controller");

router.get("/", authenticateJWT, select);
router.get("/:id", authenticateJWT, selectID);
router.post("/", authenticateJWT, create);
router.put("/:id", authenticateJWT, update);
router.delete("/:id", authenticateJWT, destroy);

module.exports = router;
