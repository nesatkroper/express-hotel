const prisma = require("@prisma/client");

const saveToDB = async (message) => {
  try {
    const newMessage = await prisma.message.create({
      data: {
        content: message.content,
        sender: message.sender,
        timestamp: new Date(),
      },
    });
    console.log("Message saved to DB:", newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

module.exports = { saveToDB };
