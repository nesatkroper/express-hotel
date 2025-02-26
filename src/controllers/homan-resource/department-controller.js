const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    status = "active",
    positions = false,
    employees = false,
  } = req.query;
  try {
    const select = id
      ? await prisma.department.findUnique({
          where: { department_id: parseInt(id), status },
          include: {
            positions: positions === "true",
            employees: employees === "true",
          },
        })
      : await prisma.department.findMany({
          where: { status },
          include: {
            positions: positions === "true",
            employees: employees === "true",
          },
          orderBy: { department_id: order },
        });

    if (!select || (Array.isArray(select) && !select.length))
      return res.status(400).json({ msg: "no data" });
    return res.status(200).json(select);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (req, res) => {
  try {
    const { department_name, memo } = req.body;

    const last = await prisma.department.findFirst({
      orderBy: { department_id: "desc" },
    });

    const create = await prisma.department.create({
      data: {
        department_name,
        department_code: `DEP-${(last ? last.department_id + 1 : 1)
          .toString()
          .padStart(3, "0")}`,
        memo,
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { department_name, memo } = req.body;

  try {
    const update = await prisma.department.update({
      where: { department_id: parseInt(id) },
      data: {
        department_name,
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
          ? await prisma.department.update({
              where: {
                department_id: parseInt(id, 10),
              },
              data: { status: "disactive" },
            })
          : type == "restore"
          ? await prisma.department.update({
              where: {
                department_id: parseInt(id, 10),
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
    const destroy = await prisma.department.delete({
      where: { department_id: parseInt(id) },
    });
    console.log(destroy);
    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, patch, destroy };
