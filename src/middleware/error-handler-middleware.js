/**
 * Error handling middleware function that logs the error stack and sends an appropriate response based on the error type.
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns None
 */
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (err.message.includes("ECONNREFUSED")) {
    return res.status(503).json({ error: "Service temporarily unavailable" });
  }

  res.status(500).json({ error: "Something went wrong!" });
};
