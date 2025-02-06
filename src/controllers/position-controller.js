const prisma = require("@/provider/client");
const path = require("path");

const select = async (req, res) => {
  try {
    const select = await prisma.position.findMany({
      include: { department: true, employees: true },
      orderBy: { created_at: "desc" },
    });

    if (!select.length) return res.status(400).json({ msg: "no data" });
    return res.status(200).json(select);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const selectID = async (req, res) => {
  const { id } = req.params;
  try {
    const selectID = await prisma.position.findUnique({
      where: { position_id: parseInt(id) },
      include: { department: true, employees: true },
    });

    if (!selectID) return res.status(400).json({ msg: "no data" });
    return res.status(200).json(selectID);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (req, res) => {
  try {
    const { department_id, position_name, position_code, memo } = req.body;

    const code = `POS-${position_code.toString().padStart(3, "0")}`;

    const newPosition = await prisma.position.create({
      data: {
        department_id: parseInt(department_id, 10),
        position_name,
        position_code: code,
        memo,
      },
    });

    console.log(newPosition);
    return res.status(200).json(newPosition);
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

module.exports = { select, selectID, create, update, destroy };
