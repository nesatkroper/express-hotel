const express = require("express");
const router = express.Router();

const { select } = require("@/controllers/realtime/notification-controller");

router.get("/:id?", select);

module.exports = router;
