const prisma = require("@/provider/client");
const { baseSelect } = require("../base/base-controller");

const model = "groupmessage";

const select = async (req, res) => {
  try {
    const result = await baseSelect(
      model,
      req.params.id,
      req.query,
      `${model}_id`,
      "state_id"
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
