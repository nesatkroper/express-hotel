const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { sale = false, product = false } = req.query;
  try {
    let select;

    if (!id)
      select = await prisma.saleDetail.findMany({
        include: {
          sale: sale === "true",
          product: product === "true",
        },
      });
    else
      select = await prisma.saleDetail.findUnique({
        where: { sale_detail_id: parseInt(id) },
        include: {
          sale: sale === "true",
          product: product === "true",
        },
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

module.exports = { select, create, update, destroy };
