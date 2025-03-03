const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { rooms = false } = req.query;
  try {
    const select = id
      ? await prisma.roomType.findUnique({
          where: { room_type_id: parseInt(id) },
          include: {
            rooms: rooms === "true",
          },
        })
      : await prisma.roomType.findMany({
          include: {
            rooms: rooms === "true",
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
    const { type_name, type_code } = req.body;

    const create = await prisma.roomType.create({
      data: {
        type_name,
        type_code,
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
    const { type_name, type_code } = req.body;

    const update = await prisma.roomType.update({
      where: { room_type_id: parseInt(id) },
      data: {
        type_name,
        type_code,
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

    const destroy = await prisma.roomType.delete({
      where: { roomType_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
