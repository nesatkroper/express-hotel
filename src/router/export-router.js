const fs = require("fs");
const path = require("path");

const routers = {};

const loadRouters = (folder) => {
  const dirPath = path.join(__dirname, "components", folder);
  fs.readdirSync(dirPath).forEach((file) => {
    if (file.endsWith("-router.js")) {
      const routerName = file.replace("-router.js", "Router");
      routers[routerName] = require(path.join(dirPath, file));
    }
  });
};

[
  "finance",
  "gmail",
  "human-resource",
  "message",
  "notification",
  "product",
  "reservation",
  "sale",
].forEach(loadRouters);

module.exports = routers;
