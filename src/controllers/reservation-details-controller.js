const prisma = require("@/provider/client");

const select = async (req, res) => {
  try {
    const select = await prisma.reservationDetail.findMany({
      include: {
        room: true,
        employee: true,
        customer: true,
        reservation: true,
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
    const selectID = await prisma.reservationDetail.findUnique({
      where: { reserve_detail_id: parseInt(id) },
      include: {
        room: true,
        employee: true,
        customer: true,
        reservation: true,
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
      room_id,
      employee_id,
      customer_id,
      reservation_id,
      price,
      night,
      amount,
    } = req.body;

    // const code = `INV-SR-${employee_code.toString().padStart(4, "0")}`;

    const create = await prisma.reservationDetail.create({
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

    await prisma.reservationDetail.update({
      where: { reserve_detail_id: parseInt(id) },
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

    const destroy = await prisma.reservationDetail.delete({
      where: { reserve_detail_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, selectID, create, update, destroy };
