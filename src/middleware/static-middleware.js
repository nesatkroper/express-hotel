// middleware/protectedStatic.js
const express = require("express");
const path = require("path");

module.exports = function protectedStatic(dirPath, authMiddleware) {
  const staticHandler = express.static(dirPath);

  return function (req, res, next) {
    authMiddleware(req, res, (err) => {
      if (err) return next(err);

      staticHandler(req, res, next);
    });
  };
};
