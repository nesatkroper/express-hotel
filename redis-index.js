require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const router = require("@router/router.js");
const path = require("path");
const http = require("http");
const rateLimit = require("express-rate-limit");
const prisma = require("@/provider/client");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const redis = require("redis");

const {
  setupSocket,
} = require("@/controllers/realtime/setup-socket-controller");
const dbLogger = require("@/middleware/logger-middleware");
const authLogger = require("@/middleware/auth-logger-middleware");

const app = express();
const server = http.createServer(app);

// Redis Setup
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.on("error", (err) => console.log("Redis Error:", err));
redisClient.connect().then(() => console.log("Redis connected"));

// Cache Middleware
const cacheMiddleware = (ttl = 3600) => {
  return async (req, res, next) => {
    const cacheKey = `cache:${req.originalUrl}:${JSON.stringify(
      req.query
    )}:${JSON.stringify(req.body)}`;
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.json(JSON.parse(cachedData));
      }
      const originalJson = res.json;
      res.json = async (data) => {
        await redisClient.setEx(cacheKey, ttl, JSON.stringify(data));
        console.log(`Cached ${cacheKey} for ${ttl}s`);
        originalJson.call(res, data);
      };
      next();
    } catch (err) {
      console.error("Cache error:", err);
      next();
    }
  };
};

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 500,
  message: "Too many requests from this IP, please try again later.",
  keyGenerator: (req) => req.ip,
});

app.use(limiter);
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next();
});
app.use(dbLogger);
app.use(authLogger);

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://react-hotel-two.vercel.app",
        "https://nun.up.railway.app",
        "http://localhost:5173",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/v1", router);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://react-hotel-two.vercel.app",
        "https://nun.up.railway.app",
        "http://localhost:5173",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

app.use((req, res, next) => {
  console.log(`Request from: ${req.headers.origin}`);
  next();
});

setupSocket(io, prisma);

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/v1`);
});

module.exports = { cacheMiddleware };
