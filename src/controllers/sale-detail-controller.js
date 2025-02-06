const prisma = require("@/provider/client");

const select = async (req, res) => {
  try {
    const select = await prisma.saleDetail.findMany({
      include: {
        sale: true,
        product: true,
      },
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
    const selectID = await prisma.saleDetail.findUnique({
      where: { sale_detail_id: parseInt(id) },
      include: {
        sale: true,
        product: true,
      },
    });
    if (!selectID) return res.status(400).json({ msg: "no data" });
    return res.status(200).json(selectID);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (req, res) => {
  try {
    const { sale_id, product_id, quantity, amount } = req.body;

    const create = await prisma.saleDetail.create({
      data: {
        sale_id,
        product_id,
        quantity,
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
    const { sale_id, product_id, quantity, amount } = req.body;

    await prisma.saleDetail.update({
      where: { sale_detail_id: parseInt(id) },
      data: {
        sale_id,
        product_id,
        quantity,
        amount,
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

    const destroy = await prisma.saleDetail.delete({
      where: { sale_detail_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, selectID, create, update, destroy };
