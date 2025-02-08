const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { banknote = false, employee = true } = req.query;
  try {
    let select;

    if (!id)
      select = await prisma.closeShift.findMany({
        include: {
          banknote: JSON.parse(banknote),
          employee: JSON.parse(employee),
        },
      });
    else
      select = await prisma.closeShift.findUnique({
        where: { close_shift_id: parseInt(id) },
        include: {
          banknote: JSON.parse(banknote),
          employee: JSON.parse(employee),
        },
      });

    if (!select || (!select && !select.length))
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
      bank_note_id,
      shift_code,
      close_khmer_riel,
      close_us_dollar,
    } = req.body;

    const code = `SHIFT-${shift_code.toString().padStart(7, "0")}`;

    const create = await prisma.closeShift.create({
      data: {
        employee_id,
        bank_note_id,
        shift_code: code,
        close_khmer_riel,
        close_us_dollar,
        close_date: new Date(),
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
      close_khmer_riel,
      close_us_dollar,
    } = req.body;

    await prisma.closeShift.update({
      where: { close_shift_id: parseInt(id) },
      data: {
        employee_id,
        bank_note_id,
        shift_code,
        close_khmer_riel,
        close_us_dollar,
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

    const destroy = await prisma.closeShift.delete({
      where: { close_shift_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
