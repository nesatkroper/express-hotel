const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const include = {
    position: true,
    department: true,
    reservedetails: true,
    sales: true,
    opens: true,
    closes: true,
    info: true,
  };

  try {
    let result;
    if (!id) {
      result = await prisma.employee.findMany({ include });
    } else {
      result = await prisma.employee.findUnique({
        where: { employee_id: parseInt(id) },
        include,
      });
    }

    if (!result || (Array.isArray(result) && !result.length)) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: `Error: ${err.message}` });
  }
};

// const select = async (req, res) => {
//   const { id } = req.params;

//   const include = {
//     position: true,
//     department: true,
//     reservedetails: true,
//     sales: true,
//     opens: true,
//     closes: true,
//     info: true,
//   };

//   try {
//     if (!id) {
//       const select = await prisma.employee.findMany({
//         include: include,
//       });
//       if (!select.length) return res.status(400).json({ msg: "no data" });
//       return res.status(200).json(select);
//     } else {
//       const selectID = await prisma.employee.findUnique({
//         where: { employee_id: parseInt(id) },
//         include: include,
//       });
//       if (!selectID) return res.status(400).json({ msg: "no data" });
//       return res.status(200).json(selectID);
//     }
//   } catch (err) {
//     return res.status(500).json({ error: `Error :${err}` });
//   }
// };

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
        info: true,
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
      status,
      first_name,
      last_name,
      gender,
      dob,
      phone,
      position_id,
      department_id,
      salary,
      hired_date,
    } = req.body;

    const code = `EMP-${employee_code.toString().padStart(4, "0")}`;
    const cleanphone = phone.startsWith("0") ? phone.slice(1) : phone;

    const create = await prisma.employee.create({
      data: {
        employee_code: code,
        status,
        first_name,
        last_name,
        gender,
        dob: new Date(dob),
        phone: `+855${cleanphone}`,
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
      status,
      first_name,
      last_name,
      gender,
      dob,
      phone,
      position_id,
      department_id,
      salary,
      hired_date,
    } = req.body;

    await prisma.employee.update({
      where: { employee_id: parseInt(id) },
      data: {
        employee_code,
        status,
        first_name,
        last_name,
        gender,
        dob: new Date(dob),
        phone,
        position_id: parseInt(position_id, 10),
        department_id: parseInt(department_id, 10),
        salary,
        hired_date: new Date(hired_date),
      },
    });

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

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = {
  select,
  selectID,
  create,
  update,
  destroy,
};
