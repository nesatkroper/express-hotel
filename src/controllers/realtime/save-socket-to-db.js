const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const saveMessageToDB = async (message) => {
  const [fname, lname] = message.sender.split(" ");
  let emp_id = null;

  try {
    const emp = await prisma.employee.findFirst({
      where: {
        first_name: fname,
        last_name: lname,
      },
    });

    if (emp) emp_id = emp.employee_id;

    const newChat = await prisma.groupMessage.create({
      data: {
        employee_id: emp_id,
        content: message.content,
        time: message.time,
      },
    });

    console.log("new chat: ", newChat);
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

module.exports = { saveMessageToDB };
