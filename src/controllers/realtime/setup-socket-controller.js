const { create } = require("@/controllers/message/group-message-controller");

const setupSocket = (io, db) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", async (message) => {
      console.log("Received message:", message);
      io.emit("receiveMessage", message);
    });
    socket.on("sendGroup", async (message) => {
      io.emit("receiveGroup", message);

      try {
        await create(message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("sendNotification", async (message) => {
      console.table(message.data);
      io.emit("receiveNotification", message);

      try {
        await create(message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket };
