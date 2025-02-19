const prisma = require("@/provider/client");

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
        })
      : await prisma.shift.findMany({
          include: {
            banknotes: banknotes === "true",
            employee: employee === "true",
          },
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
      shift_code,
      open_khmer_riel,
      open_us_dollar,
      close_khmer_riel,
      close_us_dollar,
    } = req.body;

    const code = `SHIFT-${shift_code.toString().padStart(7, "0")}`;

    const create = await prisma.openShift.create({
      data: {
        employee_id,
        bank_note_id,
        shift_code: code,
        open_khmer_riel,
        open_us_dollar,
        close_khmer_riel,
        close_us_dollar,
        open_time: new Date(),
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
    const {
      employee_id,
      bank_note_id,
      shift_code,
      open_khmer_riel,
      open_us_dollar,
    } = req.body;

    await prisma.openShift.update({
      where: { open_shift_id: parseInt(id) },
      data: {
        employee_id,
        bank_note_id,
        shift_code,
        open_khmer_riel,
        open_us_dollar,
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
