const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    status = "active",
    roomtype = false,
    pictures = false,
    reservedetails = false,
    sales = false,
  } = req.query;
  try {
    const select = id
      ? await prisma.room.findUnique({
          where: { room_id: parseInt(id), status },
          include: {
            roomtype: roomtype === "true",
            pictures: pictures === "true",
            reservedetails: reservedetails === "true",
            sales: sales === "true",
          },
        })
      : await prisma.room.findMany({
          where: { status },
          include: {
            roomtype: roomtype === "true",
            pictures: pictures === "true",
            reservedetails: reservedetails === "true",
            sales: sales === "true",
          },
          orderBy: { room_id: order },
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
      room_type_id,
      room_name,
      price,
      is_ac,
      capacity,
      size,
      discount_rate,
      is_booked,
    } = req.body;

    const create = await prisma.room.create({
      data: {
        room_type_id: parseInt(room_type_id, 10),
        room_name: `ROOM-${room_name}`,
        price,
        is_ac,
        capacity: parseInt(capacity, 10),
        size: parseInt(size, 10),
        discount_rate: parseInt(discount_rate, 10),
        is_booked,
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
      room_type_id,
      room_name,
      price,
      is_ac,
      capacity,
      size,
      discount_rate,
      is_booked,
    } = req.body;

    const update = await prisma.room.update({
      where: { room_id: parseInt(id) },
      data: {
        room_type_id,
        room_name,
        price,
        is_ac,
        capacity,
        size,
        discount_rate,
        is_booked,
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
          ? await prisma.room.update({
              where: {
                room_id: parseInt(id, 10),
              },
              data: { status: "disactive" },
            })
          : type == "restore"
          ? await prisma.room.update({
              where: {
                room_id: parseInt(id, 10),
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

    const destroy = await prisma.room.delete({
      where: { room_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, patch, destroy };
