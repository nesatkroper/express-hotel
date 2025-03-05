const express = require("express");
const router = express.Router();
const {
  sendNotification,
} = require("@/controllers/notification/telegram-notification-controller");

router.post("/", sendNotification);
module.exports = router;
