require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const router = require("@router/router.js");
const path = require("path");
const http = require("http");
const prisma = require("@/provider/client");
const bodyParser = require("body-parser");
const protectedStatic = require("./src/middleware/static-middleware");
const authJWT = require("./src/middleware/auth-middleware");
const { limiter } = require("@/middleware/limit-middleware");
const { Server } = require("socket.io");
const {
  setupSocket,
} = require("@/controllers/realtime/setup-socket-controller");
const {
  allowedOrigins,
  allowedHeaders,
  methods,
  transports,
} = require("@/constants/cors");

const dbLogger = require("@/middleware/logger-middleware");
const authLogger = require("@/middleware/auth-logger-middleware");

const app = express();
const server = http.createServer(app);

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
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods,
    allowedHeaders,
    credentials: true,
  })
);

app.use(
  "/uploads",
  protectedStatic(path.join(__dirname, "public/uploads"), authJWT)
);
app.use("/v1", router);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by Socket"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports,
});

app.use((req, res, next) => {
  console.log(`Request from: ${req.headers.origin}`);
  next();
});

setupSocket(io, prisma);

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    await prisma.$connect();
    console.log("✅ Prisma connected to the database");

    server.listen(PORT, () => {
      console.log(`✅ Server running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error :", error);
  }
};

startServer();
