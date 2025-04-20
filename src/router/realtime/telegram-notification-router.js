const express = require("express");
const router = express.Router();
const {
  sendNotification,
} = require("@/controllers/realtime/telegram-notification-controller");

router.post("/", sendNotification);
module.exports = router;
