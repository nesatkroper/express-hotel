const prisma = require("@/provider/client");
const path = require("path");
const fs = require("fs");

const select = async (req, res) => {
  try {
    const select = await prisma.customer.findMany({
      include: {
        reservedetails: true,
        sales: true,
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
    const selectID = await prisma.customer.findUnique({
      where: { customer_id: parseInt(id) },
      include: {
        reservedetails: true,
        sales: true,
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
    const {
      account_status,
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

    const cleanphone = phone.startsWith("0") ? phone.slice(1) : phone;

    const create = await prisma.customer.create({
      data: {
        picture,
        account_status,
        first_name,
        last_name,
        gender,
        email,
        phone: `+855${cleanphone}`,
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
      account_status,
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
          account_status,
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
          account_status,
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

module.exports = { select, selectID, create, update, destroy };
