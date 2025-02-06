const prisma = require("@/provider/client");
const path = require("path");
const fs = require("fs");

const select = async (req, res) => {
  try {
    const select = await prisma.employee.findMany({
      include: {
        position: true,
        department: true,
        reservedetails: true,
        sales: true,
        opens: true,
        closes: true,
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
    const selectID = await prisma.employee.findUnique({
      where: { employee_id: parseInt(id) },
      include: {
        position: true,
        department: true,
        reservedetails: true,
        sales: true,
        opens: true,
        closes: true,
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
      employee_code,
      account_status,
      first_name,
      last_name,
      gender,
      dob,
      email,
      phone,
      address,
      city,
      state,
      position_id,
      department_id,
      salary,
      hired_date,
    } = req.body;
    const picture = req.file ? path.basename(req.file.path) : null;

    const code = `EMP-${employee_code.toString().padStart(4, "0")}`;
    const cleanphone = phone.startsWith("0") ? phone.slice(1) : phone;

    const create = await prisma.employee.create({
      data: {
        picture,
        employee_code: code,
        account_status,
        first_name,
        last_name,
        gender,
        dob: new Date(dob),
        email,
        phone: `+855${cleanphone}`,
        address,
        city,
        state,
        position_id: parseInt(position_id, 10),
        department_id: parseInt(department_id, 10),
        salary,
        hired_date: new Date(hired_date),
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    console.error("Error creating employee:", err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      employee_code,
      account_status,
      first_name,
      last_name,
      gender,
      dob,
      email,
      phone,
      address,
      city,
      state,
      position_id,
      department_id,
      salary,
      hired_date,
    } = req.body;

    const picture = req.file ? path.basename(req.file.path) : null;

    const employee = await prisma.employee.findUnique({
      where: { employee_id: parseInt(id, 10) },
    });

    if (picture !== null) {
      const imagePath = path.join(
        __dirname,
        "../../public/uploads/employee",
        employee.picture
      );

      fs.unlink(imagePath, (err) => {
        if (err) console.log(`Error deleting file: ${err}`);
        else console.log(`Removed image file: ${imagePath}`);
      });

      await prisma.employee.update({
        where: { employee_id: parseInt(id) },
        data: {
          picture,
          employee_code,
          account_status,
          first_name,
          last_name,
          gender,
          dob: new Date(dob),
          email,
          phone,
          address,
          city,
          state,
          position_id,
          department_id,
          salary,
          hired_date: new Date(hired_date),
        },
      });
    } else {
      await prisma.employee.update({
        where: { employee_id: parseInt(id) },
        data: {
          employee_code,
          account_status,
          first_name,
          last_name,
          gender,
          dob: new Date(dob),
          email,
          phone,
          address,
          city,
          state,
          position_id,
          department_id,
          salary,
          hired_date: new Date(hired_date),
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

    const category = await prisma.employee.findUnique({
      where: { employee_id: parseInt(id, 10) },
    });

    if (!category) return res.status(404).json({ error: " not found" });

    const destroy = await prisma.employee.delete({
      where: { employee_id: parseInt(id) },
    });

    const imagePath = path.join(
      __dirname,
      "../../public/uploads/employee",
      employee.picture
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
