const prisma = require("@/provider/client");
const path = require("path");
const fs = require("fs");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    status = "active",
    auth = false,
    reservedetails = false,
    sales = false,
  } = req.query;

  console.log(id);

  try {
    const select = id
      ? await prisma.customer.findUnique({
          where: { customer_id: parseInt(id, 10), status },
          include: {
            auth: auth === "true",
            reservedetails: reservedetails === "true",
            sales: sales === "true",
          },
        })
      : await prisma.customer.findMany({
          where: { status },
          include: {
            auth: auth === "true",
            reservedetails: reservedetails === "true",
            sales: sales === "true",
          },
          orderBy: { customer_id: order },
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
    const {
      first_name,
      last_name,
      gender,
      email,
      phone,
      address,
      city,
      state,
    } = req.body;

    const picture = req.file ? path.basename(req.file.path) : null;

    const create = await prisma.customer.create({
      data: {
        picture,
        first_name,
        last_name,
        gender,
        email,
        phone,
        address,
        city,
        state,
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    console.error("Error creating customer:", err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      gender,
      email,
      phone,
      address,
      city,
      state,
    } = req.body;

    const picture = req.file ? path.basename(req.file.path) : null;

    const customer = await prisma.customer.findUnique({
      where: { customer_id: parseInt(id, 10) },
    });

    if (picture !== null) {
      const imagePath = path.join(
        __dirname,
        "../../public/uploads/customer",
        customer.picture
      );

      fs.unlink(imagePath, (err) => {
        if (err) console.log(`Error deleting file: ${err}`);
        else console.log(`Removed image file: ${imagePath}`);
      });

      await prisma.customer.update({
        where: { customer_id: parseInt(id) },
        data: {
          picture,
          first_name,
          last_name,
          gender,
          email,
          phone,
          address,
          city,
          state,
        },
      });
    } else {
      await prisma.customer.update({
        where: { customer_id: parseInt(id) },
        data: {
          first_name,
          last_name,
          gender,
          email,
          phone,
          address,
          city,
          state,
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

const patch = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;

  try {
    if (type) {
      const patch =
        type == "remove"
          ? await prisma.customer.update({
              where: {
                customer_id: parseInt(id, 10),
              },
              data: { status: "disactive" },
            })
          : type == "restore"
          ? await prisma.customer.update({
              where: {
                customer_id: parseInt(id, 10),
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

    const category = await prisma.customer.findUnique({
      where: { customer_id: parseInt(id, 10) },
    });

    if (!category) return res.status(404).json({ error: " not found" });

    const destroy = await prisma.customer.delete({
      where: { customer_id: parseInt(id) },
    });

    const imagePath = path.join(
      __dirname,
      "../../public/uploads/customer",
      customer.picture
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

module.exports = {
  select,
  create,
  update,
  patch,
  destroy,
};
