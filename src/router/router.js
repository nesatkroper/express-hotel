const express = require("express");
const expressListEndpoints = require("express-list-endpoints");
const router = express.Router();
const routers = require("@/router/export-router");
const { baseSelect } = require("@/utils/convert-data");
// const { cacheMiddleware } = require("@/middleware/cach-middleware");

Object.entries(routers).forEach(([routeName, routeHandler]) => {
  const path = `/${routeName.replace("Router", "").toLowerCase()}`;
  router.use(path, routeHandler);
});

router.get("/log/:id?", async (req, res) => {
  try {
    const result = await baseSelect("log", req.params.id, req.query, "id");

    if (!result || (Array.isArray(result) && !result.length)) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: `Error: ${err.message}` });
  }
});

router.get("/routelist", (req, res) => {
  res.json(expressListEndpoints(router));
});

module.exports = router;
