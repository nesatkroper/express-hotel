const prisma = require("@/provider/client");
const path = require("path");
const fs = require("fs");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    status = "active",
    category = false,
    stocks = false,
    saledetails = false,
  } = req.query;

  try {
    const result = id
      ? await prisma.product.findUnique({
          where: { product_id: parseInt(id), status },
          include: {
            category: category === "true",
            stocks: stocks === "true",
            saledetails: saledetails === "true",
          },
        })
      : await prisma.product.findMany({
          where: { status },
          include: {
            category: category === "true",
            stocks: stocks === "true",
            saledetails: saledetails === "true",
          },
          orderBy: { product_id: order },
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
    const { product_name, product_category_id, price, discount_rate } =
      req.body;

    const picture = req.file ? path.basename(req.file.path) : null;
    const last = await prisma.product.findFirst({
      orderBy: { product_id: "desc" },
    });

    const create = await prisma.product.create({
      data: {
        picture,
        product_code: `PRO-${(last ? last.product_id + 1 : 1)
          .toString()
          .padStart(5, "0")}`,
        product_name,
        product_category_id: parseInt(product_category_id, 10),
        price,
        discount_rate: parseInt(discount_rate, 10),
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
    const { product_name, product_category_id, price, discount_rate } =
      req.body;

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
          product_name,
          product_category_id,
          price,
          discount_rate,
        },
      });
    } else {
      await prisma.product.update({
        where: { product_id: parseInt(id) },
        data: {
          product_name,
          product_category_id,
          price,
          discount_rate,
        },
      });
    }

    return res.status(200).json({ msg: "Update Successfully." });
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
          ? await prisma.product.update({
              where: {
                product_id: parseInt(id, 10),
              },
              data: { status: "disactive" },
            })
          : type == "restore"
          ? await prisma.product.update({
              where: {
                product_id: parseInt(id, 10),
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

module.exports = { select, create, update, patch, destroy };
