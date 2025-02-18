const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    position = false,
    department = false,
    reservedetails = false,
    sales = false,
    opens = false,
    closes = false,
    info = false,
  } = req.query;

  try {
    const select = id
      ? await prisma.employee.findUnique({
          where: { employee_id: parseInt(id) },
          include: {
            position: position === "true",
            department: JSON.parse(department),
            reservedetails: reservedetails === "true",
            sales: sales === "true",
            opens: opens === "true",
            closes: closes === "true",
            info: info === "true",
          },
        })
      : await prisma.employee.findMany({
          include: {
            position: position === "true",
            department: department === "true",
            reservedetails: reservedetails === "true",
            sales: sales === "true",
            opens: opens === "true",
            closes: closes === "true",
            info: info === "true",
          },
          orderBy: { created_at: order },
        });

    if (!select || (Array.isArray(select) && !select.length)) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(select);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: `Error: ${err.message}` });
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

    if (!employee_code) {
      return res.status(400).json({ error: "employee_code is required" });
    }

    const code = `EMP-${employee_code.toString().padStart(4, "0")}`;
    const cleanphone = phone.startsWith("0") ? phone.slice(1) : phone;

    const create = await prisma.employee.create({
      data: {
        employee_code: code,
        status,
        first_name,
        last_name,
        gender,
        dob: dob ? new Date(dob) : null,
        phone: cleanphone ? `+855${cleanphone}` : null,
        position_id: position_id ? parseInt(position_id, 10) : null,
        department_id: department_id ? parseInt(department_id, 10) : null,
        salary: salary ? parseFloat(salary) : null,
        hired_date: hired_date ? new Date(hired_date) : null,
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
        salary: parseFloat(salary),
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
  create,
  update,
  destroy,
};
