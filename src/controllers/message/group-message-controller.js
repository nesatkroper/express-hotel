const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { emp = false, take = 10 } = req.query;

  try {
    let result;
    if (!id) {
      result = await prisma.groupMessage.findMany({
        take: parseInt(take, 10),
        orderBy: {
          group_message_id: "desc",
        },
        include: {
          employee: JSON.parse(emp),
        },
      });
    } else {
      result = await prisma.groupMessage.findUnique({
        where: { group_message_id: parseInt(id) },
        include: { employee: JSON.parse(emp) },
      });
    }

    if (!result || (Array.isArray(result) && !result.length))
      return res.status(400).json({ msg: "no data" });
    return res.status(200).json(result.reverse());
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (message) => {
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

module.exports = { select, create };
