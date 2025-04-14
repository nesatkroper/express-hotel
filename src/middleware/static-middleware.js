// middleware/protectedStatic.js
const express = require("express");
const path = require("path");

/**
 * Creates a middleware function that serves static files from the specified directory
 * only if the request passes the authentication middleware.
 * @param {string} dirPath - The directory path from which to serve static files.
 * @param {function} authMiddleware - The authentication middleware function.
 * @returns {function} A middleware function that serves static files if authenticated.
 */
module.exports = function protectedStatic(dirPath, authMiddleware) {
  const staticHandler = express.static(dirPath);

  return function (req, res, next) {
    authMiddleware(req, res, (err) => {
      if (err) return next(err);

      staticHandler(req, res, next);
    });
  };
};
