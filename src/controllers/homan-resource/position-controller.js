const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { order = "desc", department = false, employees = false } = req.query;

  try {
    const result = id
      ? await prisma.position.findUnique({
          where: { position_id: parseInt(id) },
          include: {
            department: department === "true",
            employees: employees === "true",
          },
        })
      : await prisma.position.findMany({
          include: {
            department: department === "true",
            employees: employees === "true",
          },
          orderBy: { created_at: order },
        });

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

    const last = prisma.position.findFirst({
      orderBy: {
        position_id: "desc",
      },
    });

    const create = await prisma.position.create({
      data: {
        department_id: parseInt(department_id, 10),
        position_name,
        position_code: `POS-${(last ? last.position_id + 1 : 1)
          .toString()
          .padStart(3, "0")}`,
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

const patch = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;

  try {
    if (type) {
      const patch =
        type == "remove"
          ? await prisma.position.update({
              where: {
                position_id: parseInt(id, 10),
              },
              data: { status: "disactive" },
            })
          : type == "restore"
          ? await prisma.position.update({
              where: {
                position_id: parseInt(id, 10),
              },
              data: { status: "active" },
            })
          : "Type Invalided.";

      return res.status(200).json(patch);
    }
    return res.status(400).json({ msg: "Type Undefined." });
  } catch (err) {
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

module.exports = { select, create, update, patch, destroy };
