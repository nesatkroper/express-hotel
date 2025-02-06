const prisma = require("@/provider/client");

const select = async (req, res) => {
  try {
    const select = await prisma.department.findMany({
      include: { positions: true, employees: true },
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
    const selectID = await prisma.department.findUnique({
      where: { department_id: parseInt(id) },
      include: { positions: true, employees: true },
    });
    if (!selectID) return res.status(400).json({ msg: "no data" });
    return res.status(200).json(selectID);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (req, res) => {
  try {
    const { department_name, department_code, memo } = req.body;

    const dcode = `DEP-${department_code.toString().padStart(3, "0")}`;

    const create = await prisma.department.create({
      data: { department_name, department_code: dcode, memo },
    });

    console.log(create);
    return res.status(200).json(create);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { department_name, department_code, memo } = req.body;

  try {
    const update = await prisma.department.update({
      where: { department_id: parseInt(id) },
      data: {
        department_name,
        department_code,
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
    const destroy = await prisma.department.delete({
      where: { department_id: parseInt(id) },
    });
    console.log(destroy);
    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, selectID, create, update, destroy };
