const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    status = "active",
    details = false,
    payment = false,
  } = req.query;
  try {
    const select = id
      ? await prisma.reservation.findUnique({
          where: { reservation_id: parseInt(id), status },
          include: { details: details === "true", payment: payment === "true" },
        })
      : await prisma.reservation.findMany({
          where: { status },
          include: { details: details === "true", payment: payment === "true" },
          orderBy: { reservation_id: order },
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
      checkin_date,
      checkout_date,
      is_checkin,
      is_checkout,
      reservation_type,
      adults,
      children,
      payment_status,
      payment_method,
      memo,
      is_hidden,
    } = req.body;

    const create = await prisma.reservation.create({
      data: {
        checkin_date: new Date(checkin_date),
        checkout_date: new Date(checkout_date),
        is_checkin,
        is_checkout,
        reservation_type,
        adults,
        children,
        payment_status,
        payment_method,
        memo,
        is_hidden,
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
      checkin_date,
      checkout_date,
      is_checkin,
      is_checkout,
      reservation_type,
      adults,
      children,
      payment_status,
      payment_method,
      memo,
      is_hidden,
    } = req.body;

    await prisma.reservation.update({
      where: { reservation_id: parseInt(id) },
      data: {
        checkin_date: new Date(checkin_date),
        checkout_date: new Date(checkout_date),
        is_checkin,
        is_checkout,
        reservation_type,
        adults,
        children,
        payment_status,
        payment_method,
        memo,
        is_hidden,
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

    const destroy = await prisma.reservation.delete({
      where: { reservation_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
