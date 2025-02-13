const express = require("express");
const router = express.Router();

const { select } = require("@/controllers/message/group-message-controller");

router.get("/group/:id?", select);

module.exports = router;
