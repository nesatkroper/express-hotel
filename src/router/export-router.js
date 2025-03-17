const fs = require("fs");
const path = require("path");

const endpoints = {};

const loadRouters = (folder) => {
  const dirPath = path.join(__dirname, folder);
  fs.readdirSync(dirPath).forEach((file) => {
    if (file.endsWith("-router.js")) {
      const routerName = file.replace("-router.js", "Router");
      endpoints[routerName] = require(path.join(dirPath, file));
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
  "address",
].forEach(loadRouters);

module.exports = endpoints;
