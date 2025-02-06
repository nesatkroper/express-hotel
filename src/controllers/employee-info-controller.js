const prisma = require("@/provider/client");
const path = require("path");
const fs = require("fs");

const createInfo = async (req, res) => {
  try {
    const { employee_id, region, email, address, city, state, country, note } =
      req.body;
    const picture = req.file ? path.basename(req.file.path) : null;

    const create = await prisma.employeeInfo.create({
      data: {
        picture,
        employee_id: parseInt(employee_id, 10),
        region,
        email,
        address,
        city,
        state,
        country,
        note,
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    console.error("Error creating customer:", err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id, region, email, address, city, state, country, note } =
      req.body;

    const picture = req.file ? path.basename(req.file.path) : null;

    const info = await prisma.employeeInfo.findUnique({
      where: { customer_id: parseInt(id, 10) },
    });

    if (picture !== null) {
      const imagePath = path.join(
        __dirname,
        "../../public/uploads/employee",
        info.picture
      );

      fs.unlink(imagePath, (err) => {
        if (err) console.log(`Error deleting file: ${err}`);
        else console.log(`Removed image file: ${imagePath}`);
      });

      await prisma.employeeInfo.update({
        where: { customer_id: parseInt(id) },
        data: {
          picture,
          employee_id,
          region,
          email,
          address,
          city,
          state,
          country,
          note,
        },
      });
    } else {
      await prisma.employeeInfo.update({
        where: { customer_id: parseInt(id) },
        data: {
          employee_id,
          region,
          email,
          address,
          city,
          state,
          country,
          note,
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

module.exports = { createInfo, updateInfo };
