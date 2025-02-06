const dotenv = require("dotenv");
dotenv.config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("@router/router.js");
const path = require("path");
const http = require("http");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 55,
  message: "Too many requests from this IP, please try again after a minute.",
  keyGenerator: (req) => req.ip,
});

app.use(limiter);
app.use(compression());
app.use(bodyParser.json());

app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api", router);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("sendMessage", (message) => {
    console.log("Received message:", message);
    io.emit("receiveMessage", message); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api`);
});
