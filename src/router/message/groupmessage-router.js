const express = require("express");
const router = express.Router();

const { select } = require("@/controllers/message/groupmessage-controller");

router.get("/group/:id?", select);

module.exports = router;
