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

const app = express();
const server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after a minute.",
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// app.use(cors());

app.use(
  cors({
    origin: "https://react-hotel-two.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/api", router);

const io = new Server(server, {
  cors: {
    origin: "https://react-hotel-two.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
});

app.use((req, res, next) => {
  console.log(`Request from: ${req.headers.origin}`);
  next();
});

// const io = new Server(server, {
//   cors: { origin: "https://react-hotel-two.vercel.app" },
// });
setupSocket(io, prisma);

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api`);
});
