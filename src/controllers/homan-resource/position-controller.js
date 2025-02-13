const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { order = "desc", dep = false, emp = false } = req.query;

  try {
    let result;
    if (!id) {
      result = await prisma.position.findMany({
        include: { department: JSON.parse(dep), employees: JSON.parse(emp) },
        orderBy: { created_at: order },
      });
    } else {
      result = await prisma.position.findUnique({
        where: { position_id: parseInt(id) },
        include: { department: JSON.parse(dep), employees: JSON.parse(emp) },
      });
    }

    if (!result || (Array.isArray(result) && !result.length))
      return res.status(400).json({ msg: "no data" });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (req, res) => {
  try {
    const { department_id, position_name, position_code, memo } = req.body;

    const code = `POS-${position_code.toString().padStart(3, "0")}`;

    const create = await prisma.position.create({
      data: {
        department_id: parseInt(department_id, 10),
        position_name,
        position_code: code,
        memo,
      },
    });

    console.log(create);
    return res.status(200).json(create);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { department_id, position_name, position_code, memo } = req.body;

  try {
    const update = await prisma.position.update({
      where: { position_id: parseInt(id) },
      data: {
        department_id: parseInt(department_id, 10),
        position_name,
        position_code,
        memo,
      },
    });
    console.log(update);
    return res.status(200).json(update);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const destroy = await prisma.position.delete({
      where: { position_id: parseInt(id) },
    });
    console.log(destroy);
    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
