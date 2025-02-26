const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    status = "active",
    auth = false,
    position = false,
    department = false,
    reservedetails = false,
    sales = false,
    shift = false,
    attendances = false,
    groupchat = false,
    payment = false,
  } = req.query;

  try {
    const select = id
      ? await prisma.employee.findUnique({
          where: { employee_id: parseInt(id), status },
          include: {
            info: true,
            auth: auth === "true",
            position: position === "true",
            department: department === "true",
            reservedetails: reservedetails === "true",
            sales: sales === "true",
            shift: shift === "true",
            attendances: attendances === "true",
            groupchat: groupchat === "true",
            payment: payment === "true",
          },
        })
      : await prisma.employee.findMany({
          where: { status },
          include: {
            info: true,
            auth: auth === "true",
            position: position === "true",
            department: department === "true",
            reservedetails: reservedetails === "true",
            sales: sales === "true",
            shift: shift === "true",
            attendances: attendances === "true",
            groupchat: groupchat === "true",
            payment: payment === "true",
          },
          orderBy: { employee_id: order },
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

    const last = await prisma.employee.findFirst({
      orderBy: { employee_id: "desc" },
    });
    const cleanphone = phone.startsWith("0") ? phone.slice(1) : phone;

    const create = await prisma.employee.create({
      data: {
        employee_code: `EMP-${(last ? last.employee_id + 1 : 1)
          .toString()
          .padStart(4, "0")}`,
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

    const update = await prisma.employee.update({
      where: { employee_id: parseInt(id) },
      data: {
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

const patch = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;

  try {
    if (type) {
      const patch =
        type == "remove"
          ? await prisma.employee.update({
              where: {
                employee_id: parseInt(id, 10),
              },
              data: { status: "disactive" },
            })
          : type == "restore"
          ? await prisma.employee.update({
              where: {
                employee_id: parseInt(id, 10),
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
  patch,
  destroy,
};
