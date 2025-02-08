const prisma = require("@/provider/client");

const select = async (req, res) => {
  try {
    const select = await prisma.productStock.findMany({
      include: { product: true, supplier: true },
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
    const selectID = await prisma.productStock.findUnique({
      where: { product_stock_id: parseInt(id) },
      include: { product: true, supplier: true },
    });
    if (!selectID) return res.status(400).json({ msg: "no data" });
    return res.status(200).json(selectID);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (req, res) => {
  try {
    const {
      product_id,
      supplier_id,
      inv_number,
      product_add,
      add_price,
      add_date,
      memo,
    } = req.body;

    // const code = `INV-SR-${employee_code.toString().padStart(4, "0")}`;

    const create = await prisma.productStock.create({
      data: {
        product_id,
        supplier_id,
        inv_number,
        product_add,
        add_price,
        add_date: new Date(add_date),
        memo,
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
    const {
      product_id,
      supplier_id,
      inv_number,
      product_add,
      add_price,
      add_date,
      memo,
    } = req.body;

    await prisma.productStock.update({
      where: { product_stock_id: parseInt(id) },
      data: {
        product_id,
        supplier_id,
        inv_number,
        product_add,
        add_price,
        add_date,
        memo,
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

    const destroy = await prisma.productStock.delete({
      where: { product_stock_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, selectID, create, update, destroy };
