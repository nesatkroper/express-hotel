const fs = require("fs");
const path = require("path");

const endpoints = {};

/**
 * Loads router files from a specified folder and adds them to the endpoints object.
 * @param {string} folder - The folder containing the router files.
 * @returns None
 */
const loadRouters = (folder) => {
  const dirPath = path.join(__dirname, folder);
  fs.readdirSync(dirPath).forEach((file) => {
    if (file.endsWith("-router.js")) {
      const routerName = file.replace("-router.js", "Router");
      endpoints[routerName] = require(path.join(dirPath, file));
    }
  });
};

["finance", "human-resource", "product", "realtime", "sale"].forEach(
  loadRouters
);

module.exports = endpoints;
