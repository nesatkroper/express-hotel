const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const {
    order = "desc",
    status = "active",
    employee = false,
    sale = false,
    reservation = false,
  } = req.query;
  try {
    const select = id
      ? await prisma.payment.findUnique({
          where: { payment_id: parseInt(id), status },
          include: {
            employee: employee === "true",
            sale: sale === "true",
            reservation: reservation === "true",
          },
        })
      : await prisma.payment.findMany({
          where: { status },
          include: {
            employee: employee === "true",
            sale: sale === "true",
            reservation: reservation === "true",
          },
          orderBy: { payment_id: order },
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
      sale_id,
      reservation_id,
      hash,
      fromAccountId,
      toAccountId,
      currency,
      amount,
      externalRef,
    } = req.body;

    const last = await prisma.payment.findFirst({
      orderBy: { payment_id: "desc" },
    });

    const create = await prisma.payment.create({
      data: {
        sale_id: parseInt(sale_id, 10) || null,
        reservation_id: parseInt(reservation_id, 10) || null,
        employee_id: parseInt(employee_id, 10) || null,
        invoice: `SR-INV-${(last ? last.payment_id + 1 : 1)
          .toString()
          .padStart(7, "0")}`,
        hash: hash || "",
        fromAccountId: fromAccountId || "",
        toAccountId: toAccountId || "",
        currency: currency || "USD",
        amount: amount || 0,
        externalRef: externalRef || "",
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
      sale_id,
      reservation_id,
      hash,
      fromAccountId,
      toAccountId,
      currency,
      amount,
      externalRef,
    } = req.body;

    await prisma.payment.update({
      where: { payment_id: parseInt(id) },
      data: {
        sale_id: parseInt(sale_id, 10) || null,
        reservation_id: parseInt(reservation_id, 10) || null,
        employee_id: parseInt(employee_id, 10) || null,
        invoice: `SR-INV-${(last ? last.payment_id + 1 : 1)
          .toString()
          .padStart(7, "0")}`,
        hash: hash || "",
        fromAccountId: fromAccountId || "",
        toAccountId: toAccountId || "",
        currency: currency || "USD",
        amount: amount || 0,
        externalRef: externalRef || "",
      },
    });

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
          ? await prisma.payment.update({
              where: {
                payment_id: parseInt(id, 10),
              },
              data: { status: "disactive" },
            })
          : type == "restore"
          ? await prisma.payment.update({
              where: {
                payment_id: parseInt(id, 10),
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

    const destroy = await prisma.payment.delete({
      where: { payment_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, patch, destroy };
