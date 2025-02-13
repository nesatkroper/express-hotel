const { create } = require("@/controllers/message/group-message-controller");

const setupSocket = (io, db) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", async (message) => {
      console.log("Received message:", message);

      // ! wait to move to try if setup finish db
      io.emit("receiveMessage", message);

      // try {
      //   await saveMessageToDB(message);
      // } catch (error) {
      //   console.error("Error saving message:", error);
      // }
    });
    socket.on("sendGroup", async (message) => {
      io.emit("receiveGroup", message);

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
