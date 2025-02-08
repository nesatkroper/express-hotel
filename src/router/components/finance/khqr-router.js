const express = require("express");
const { RequestQR } = require("@/controllers/finance/khqr-controller");
const router = express.Router();

router.post("/", RequestQR);

module.exports = router;
