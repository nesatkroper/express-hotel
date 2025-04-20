const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8081",
  "http://81.181.87.112",
  "http://192.168.0.64",
];

const allowedHeaders = [
  "Origin",
  "X-Requested-With",
  "Content-Type",
  "Accept",
  "Authorization",
];

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"];

const transports = ["websocket", "polling"];

module.exports = { allowedOrigins, allowedHeaders, methods, transports };
