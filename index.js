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

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/api", router);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});
setupSocket(io, prisma);

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api`);
});
