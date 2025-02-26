const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    ordder = "desc",
    status = "active",
    room = false,
    employee = false,
    customer = false,
    saledetails = false,
  } = req.query;
  try {
    const select = id
      ? await prisma.sale.findUnique({
          where: { sale_id: parseInt(id), status },
          include: {
            room: room === "true",
            employee: employee === "true",
            customer: customer === "true",
            saledetails: saledetails === "true",
          },
        })
      : await prisma.sale.findMany({
          where: { status },
          include: {
            room: room === "true",
            employee: employee === "true",
            customer: customer === "true",
            saledetails: saledetails === "true",
          },
          orderBy: { sale_id: ordder },
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
    const { employee_id, room_id, customer_id, amount } = req.body;

    const create = await prisma.sale.create({
      data: {
        employee_id,
        room_id,
        customer_id,
        sale_date: new Date(),
        amount,
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id, room_id, customer_id, sale_date, amount } = req.body;

    await prisma.sale.update({
      where: { sale_id: parseInt(id) },
      data: {
        employee_id,
        room_id,
        customer_id,
        sale_date,
        amount,
      },
    });

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
          ? await prisma.sale.update({
              where: {
                sale_id: parseInt(id, 10),
              },
              data: { status: "disactive" },
            })
          : type == "restore"
          ? await prisma.sale.update({
              where: {
                sale_id: parseInt(id, 10),
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
  try {
    const { id } = req.params;

    const destroy = await prisma.sale.delete({
      where: { sale_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, patch, destroy };
