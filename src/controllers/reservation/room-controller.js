const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    roomtype = false,
    pictures = false,
    reservedetails = false,
    sales = false,
  } = req.query;
  try {
    let select;

    if (!id)
      select = await prisma.room.findMany({
        include: {
          roomtype: roomtype === "true",
          pictures: pictures === "true",
          reservedetails: reservedetails === "true",
          sales: sales === "true",
        },
      });
    else
      select = await prisma.room.findUnique({
        where: { room_id: parseInt(id) },
        include: {
          roomtype: roomtype === "true",
          pictures: pictures === "true",
          reservedetails: reservedetails === "true",
          sales: sales === "true",
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
      room_type_id,
      room_name,
      price,
      is_ac,
      capacity,
      size,
      discount_rate,
      is_booked,
      status,
    } = req.body;

    const create = await prisma.room.create({
      data: {
        room_type_id,
        room_name,
        price,
        is_ac,
        capacity,
        size,
        discount_rate,
        is_booked,
        status,
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
      room_id,
      employee_id,
      customer_id,
      reservation_id,
      price,
      night,
      amount,
    } = req.body;

    await prisma.room.update({
      where: { room_id: parseInt(id) },
      data: {
        room_id,
        employee_id,
        customer_id,
        reservation_id,
        price,
        night,
        amount,
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

    const destroy = await prisma.room.delete({
      where: { room_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
