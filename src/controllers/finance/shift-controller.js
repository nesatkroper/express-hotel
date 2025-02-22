const prisma = require("@/provider/client");
const moment = require("moment-timezone");

const select = async (req, res) => {
  const { id } = req.params;
  const { banknotes = false, employee = false } = req.query;
  try {
    const select = id
      ? await prisma.shift.findUnique({
          where: { open_shift_id: parseInt(id) },
          include: {
            banknotes: banknotes === "true",
            employee: employee === "true",
          },
          orderBy: { shift_id: "desc" },
        })
      : await prisma.shift.findMany({
          include: {
            banknotes: banknotes === "true",
            employee: employee === "true",
          },
          orderBy: { shift_id: "desc" },
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
      employee_id,
      open_khmer_riel,
      open_us_dollar,
      close_khmer_riel,
      close_us_dollar,
    } = req.body;

    const lastShift = await prisma.shift.findFirst({
      select: {
        shift_id: true,
      },
      orderBy: {
        shift_id: "desc",
      },
    });

    shift_code = lastShift?.shift_id + 1;
    const code = `SHIFT-${shift_code.toString().padStart(7, "0")}`;

    const create = await prisma.shift.create({
      data: {
        employee_id,
        shift_code: code,
        open_khmer_riel,
        open_us_dollar,
        close_khmer_riel,
        close_us_dollar,
        open_time: moment().tz("Asia/Phnom_Penh").toDate(),
        close_time: new Date(),
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { close_khmer_riel, close_us_dollar, close_time } = req.body;

    await prisma.shift.update({
      where: { shift_id: parseInt(id) },
      data: {
        close_khmer_riel,
        close_us_dollar,
        close_time: moment().tz("Asia/Phnom_Penh").toDate(),
      },
    });

    return res.status(200).json(update);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const destroy = await prisma.openShift.delete({
      where: { open_shift_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
