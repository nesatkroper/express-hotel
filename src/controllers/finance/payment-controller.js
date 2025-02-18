const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { sale = false, reservation = false } = req.query;
  try {
    const select = id
      ? await prisma.payment.findUnique({
          where: { payment_id: parseInt(id) },
          include: {
            employee: true,
            sale: sale === "true",
            reservation: reservation === "true",
          },
        })
      : await prisma.payment.findMany({
          include: {
            employee: true,
            sale: sale === "true",
            reservation: reservation === "true",
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
      sale_id,
      reservation_id,
      employee_id,
      invoice,
      hash,
      fromAccountId,
      toAccountId,
      currency,
      amount,
      externalRef,
    } = req.body;

    console.log("Request Body:", req.body);

    const create = await prisma.payment.create({
      data: {
        sale_id: parseInt(sale_id, 10) || null, // Ensure sale_id is either a number or null
        reservation_id: parseInt(reservation_id, 10) || null,
        employee_id: parseInt(employee_id, 10) || null,
        invoice: invoice || "", // Ensure invoice is not undefined
        hash: hash || "", // Ensure hash is not undefined
        fromAccountId: fromAccountId || "",
        toAccountId: toAccountId || "",
        currency: currency || "USD", // Default to USD if currency is undefined
        amount: amount || 0, // Default to 0 if amount is undefined
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
      sale_id,
      reservation_id,
      employee_id,
      invoice,
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
        khmer_100,
        khmer_500,
        khmer_1K,
        khmer_2K,
        khmer_5K,
        khmer_10K,
        khmer_15K,
        khmer_20K,
        khmer_30K,
        khmer_50K,
        khmer_100K,
        khmer_200K,
        us_1,
        us_5,
        us_10,
        us_20,
        us_50,
        us_100,
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

    const destroy = await prisma.payment.delete({
      where: { payment_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
