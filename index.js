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

const {
  setupSocket,
} = require("@/controllers/realtime/setup-socket-controller");
const dbLogger = require("@/middleware/logger-middleware");
const authLogger = require("@/middleware/auth-logger-middleware");

const app = express();
const server = http.createServer(app);

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
      // const allowedOrigins = ["*"];
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
