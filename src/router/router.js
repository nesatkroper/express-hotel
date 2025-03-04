const express = require("express");
const expressListEndpoints = require("express-list-endpoints");
const router = express.Router();
const routers = require("@/router/export-router");

Object.entries(routers).forEach(([routeName, routeHandler]) => {
  const path = `/${routeName.replace("Router", "").toLowerCase()}`;
  router.use(path, routeHandler);
});

router.get("/rl", (req, res) => {
  res.json(expressListEndpoints(router));
});

module.exports = router;
