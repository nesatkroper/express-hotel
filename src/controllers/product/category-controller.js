const prisma = require("@/provider/client");
const path = require("path");
const fs = require("fs");

const select = async (req, res) => {
  const { id } = req.params;
  const { order = "desc", products = false } = req.query;
  try {
    const select = id
      ? (select = await prisma.productCategory.findUnique({
          where: { product_category_id: parseInt(id) },
          include: { products: products === "true" },
        }))
      : (select = await prisma.productCategory.findMany({
          include: { products: products === "true" },
          orderBy: { created_at: order },
        }));

    if (!select || (Array.isArray(select) && !select.length))
      return res.status(400).json({ msg: "no data" });
    return res.status(200).json(select);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const create = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    const { category_name, category_code, memo } = req.body;
    const picture = req.file ? path.basename(req.file.path) : null;

    const code = `CAT-${category_code.toString().padStart(3, "0")}`;

    const create = await prisma.productCategory.create({
      data: {
        picture,
        category_name,
        category_code: code,
        memo,
      },
    });
    console.log(create);
    return res.status(200).json(create);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Error :${err}`, response: req });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, category_code, memo } = req.body;
    const picture = req.file ? path.basename(req.file.path) : null;

    const category = await prisma.productCategory.findUnique({
      where: { product_category_id: parseInt(id, 10) },
    });

    if (picture !== null) {
      const imagePath = path.join(
        __dirname,
        "../../public/uploads/category",
        category.picture
      );

      fs.unlink(imagePath, (err) => {
        if (err) console.log(`Error deleting file: ${err}`);
        else console.log(`Removed image file: ${imagePath}`);
      });

      await prisma.productCategory.update({
        where: { product_category_id: parseInt(id) },
        data: {
          category_name,
          category_code,
          memo,
          picture,
        },
      });
    } else {
      await prisma.productCategory.update({
        where: { product_category_id: parseInt(id) },
        data: {
          category_name,
          category_code,
          memo,
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

    const category = await prisma.productCategory.findUnique({
      where: { product_category_id: parseInt(id, 10) },
    });

    if (!category) return res.status(404).json({ error: "Category not found" });

    const destroy = await prisma.productCategory.delete({
      where: { product_category_id: parseInt(id) },
    });

    const imagePath = path.join(
      __dirname,
      "../../public/uploads/category",
      category.picture
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
