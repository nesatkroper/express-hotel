const prisma = require("@/provider/client");
const morgan = require("morgan");

const logToDB = async (method, url, status, response_time, ip, user_agent) => {
  try {
    await prisma.log.create({
      data: {
        method,
        url,
        status,
        response_time,
        ip,
        user_agent,
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

const dbLogger = morgan((tokens, req, res) => {
  const logData = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: parseInt(tokens.status(req, res), 10),
    response_time: parseFloat(tokens["response-time-ms"](req, res)),
    ip: req.ip,
    user_agent: req.headers["user-agent"] || "",
  };

  logToDB(
    logData.method,
    logData.url,
    logData.status,
    logData.response_time,
    logData.ip,
    logData.user_agent
  );

  return null;
});

module.exports = dbLogger;
