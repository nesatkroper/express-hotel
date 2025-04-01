const prisma = require("@/provider/client");
const { baseSelect } = require("../base");

const select = async (req, res) => {
  try {
    const result = await baseSelect(
      "groupmessage",
      req.params.id,
      req.query,
      "groupmessageId"
    );

    if (!result || (Array.isArray(result) && !result.length)) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: `Error: ${err.message}` });
  }
};

const create = async (message) => {
  const [fname, lname] = message.sender.split(" ");
  let empId = null;

  try {
    const emp = await prisma.employee.findFirst({
      where: {
        firstName: fname,
        lastName: lname,
      },
    });

    if (emp) empId = emp.employeeId;

    const newChat = await prisma.groupmessage.create({
      data: {
        employeeId: empId || "1",
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
