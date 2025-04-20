const rateLimit = require("express-rate-limit");

/**
 * Creates a rate limiter with the specified configuration options.
 * @param {Object} options - The configuration options for the rate limiter.
 * @param {number} options.windowMs - The time window in milliseconds for rate limiting.
 * @param {number} options.max - The maximum number of requests allowed within the windowMs time window.
 * @param {boolean} options.standardHeaders - Whether to include standard rate limit headers in the response.
 * @param {boolean} options.legacyHeaders - Whether to include legacy rate limit headers in the response.
 * @param {string} options.message - The message to send when the rate limit is exceeded.
 * @param {Function} options.keyGenerator - The function to generate a key
 */
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
  keyGenerator: (req) => req.ip,
});

module.exports = { limiter };
