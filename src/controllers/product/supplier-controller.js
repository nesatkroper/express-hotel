const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { stocks = false } = req.query;

  try {
    const select = id
      ? await prisma.supplier.findUnique({
          where: { supplier_id: parseInt(id) },
          include: { stocks: stocks === "true" },
        })
      : await prisma.supplier.findMany({
          include: { stocks: stocks === "true" },
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
    const { supplier_name, company_name, phone, email, address } = req.body;

    const create = await prisma.supplier.create({
      data: {
        supplier_name,
        company_name,
        phone,
        email,
        address,
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
    const { supplier_name, company_name, phone, email, address } = req.body;

    await prisma.supplier.update({
      where: { supplier_id: parseInt(id) },
      data: {
        supplier_name,
        company_name,
        phone,
        email,
        address,
      },
    });

    return res.status(200).json(update);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const destroy = await prisma.supplier.delete({
      where: { supplier_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
