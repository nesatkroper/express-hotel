const express = require("express");
const router = express.Router();
const {
  sendAttendance,
} = require("@/controllers/notification/telegram-attendance-controller");

router.get("/", sendAttendance);
module.exports = router;
