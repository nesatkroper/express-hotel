require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
  },
  redis: {
    url: process.env.REDIS_URL,
    ttl: 3600, // 1 hour cache
  },
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [],
  },
};
