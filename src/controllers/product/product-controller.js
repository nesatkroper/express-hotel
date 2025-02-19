const prisma = require("@/provider/client");
const path = require("path");
const fs = require("fs");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    category = false,
    stocks = false,
    saledetails = false,
  } = req.query;

  try {
    const result = id
      ? await prisma.product.findUnique({
          where: { product_id: parseInt(id) },
          include: {
            category: category === "true",
            stocks: stocks === "true",
            saledetails: saledetails === "true",
          },
        })
      : await prisma.product.findMany({
          include: {
            category: category === "true",
            stocks: stocks === "true",
            saledetails: saledetails === "true",
          },
          orderBy: { created_at: order },
        });

    if (!result || (Array.isArray(result) && !result.length))
      return res.status(400).json({ msg: "no data" });
    return await res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (req, res) => {
  try {
    const {
      product_code,
      product_name,
      product_category_id,
      price,
      discount_rate,
      status,
    } = req.body;

    const picture = req.file ? path.basename(req.file.path) : null;
    const code = `PRO-${product_code.toString().padStart(5, "0")}`;

    const create = await prisma.product.create({
      data: {
        picture,
        product_code: code,
        product_name,
        product_category_id: parseInt(product_category_id, 10),
        price,
        discount_rate: parseInt(discount_rate, 10),
        status: status === "true",
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    console.error("Error creating product:", err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_code,
      product_name,
      product_category_id,
      price,
      discount_rate,
      status,
    } = req.body;

    const picture = req.file ? path.basename(req.file.path) : null;

    const product = await prisma.product.findUnique({
      where: { product_id: parseInt(id, 10) },
    });

    if (picture !== null) {
      const imagePath = path.join(
        __dirname,
        "../../public/uploads/product",
        product.picture
      );

      fs.unlink(imagePath, (err) => {
        if (err) console.log(`Error deleting file: ${err}`);
        else console.log(`Removed image file: ${imagePath}`);
      });

      await prisma.product.update({
        where: { product_id: parseInt(id) },
        data: {
          picture,
          product_code,
          product_name,
          product_category_id,
          price,
          discount_rate,
          status,
        },
      });
    } else {
      await prisma.product.update({
        where: { product_id: parseInt(id) },
        data: {
          product_code,
          product_name,
          product_category_id,
          price,
          discount_rate,
          status,
        },
      });
    }
    console.log(update);
    return res.status(200).json(update);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { product_id: parseInt(id, 10) },
    });

    if (!product) return res.status(404).json({ error: " not found" });

    const destroy = await prisma.product.delete({
      where: { product_id: parseInt(id) },
    });

    const imagePath = path.join(
      __dirname,
      "../../public/uploads/product",
      product.picture
    );

    fs.unlink(imagePath, (err) => {
      if (err) console.log(`Error deleting file: ${err}`);
      else console.log(`Removed image file: ${imagePath}`);
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
