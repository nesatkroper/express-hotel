const express = require("express");
const router = express.Router();

const {
  select,
  patch,
} = require("@/controllers/message/groupmessage-controller");

router.get("/group/:id?", select);
router.patch("/group/:id", patch);

module.exports = router;
