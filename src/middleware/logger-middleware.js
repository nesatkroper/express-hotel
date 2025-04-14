/**
 * Error handling middleware function that logs the error stack and sends an appropriate response based on the error type.
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns None
 */
const prisma = require("@/provider/client");
const morgan = require("morgan");

const logToDB = async (method, url, status, responseTime, ip, userAgent) => {
  try {
    await prisma.log.create({
      data: {
        method,
        url,
        status,
        responseTime,
        ip,
        userAgent,
      },
    });
  } catch (error) {
    console.error("Error saving log:", error);
  }
};

morgan.token(
  "response-time-ms",
  (req, res) => res.get("X-Response-Time") || "0"
);

/**
 * Middleware function that logs request data to a database using the morgan library.
 * @param {Object} tokens - Object containing functions to extract data from request and response objects.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns null
 */
module.exports = morgan((tokens, req, res) => {
  const logData = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: parseInt(tokens.status(req, res), 10),
    responseTime: parseFloat(tokens["response-time-ms"](req, res)),
    ip: req.ip,
    userAgent: req.headers["user-agent"] || "",
  };

  logToDB(
    logData.method,
    logData.url,
    logData.status,
    logData.responseTime,
    logData.ip,
    logData.userAgent
  );

  return null;
});
