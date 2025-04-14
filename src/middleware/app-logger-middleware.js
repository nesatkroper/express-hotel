const { createLogger, format, transports } = require("winston");

/**
 * Creates a logger with the specified configuration.
 * @param {Object} config - The configuration object for the logger.
 * @param {string} config.level - The logging level (e.g., "info", "error").
 * @param {Object} config.format - The format of the log message.
 * @param {Array} config.transports - An array of transports for the logger.
 * @returns A logger instance with the specified configuration.
 */

module.exports = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});
