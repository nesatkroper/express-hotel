const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { auth_id } = req.params;
  try {
    let select;

    if (!auth_id)
      select = await prisma.cart.findMany({
        include: { product: true },
      });
    else
      select = await prisma.cart.findMany({
        where: {
          auth_id: parseInt(auth_id, 10),
        },
        include: { product: true },
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
    const { auth_id, product_id } = req.body;

    const create = await prisma.cart.create({
      data: {
        auth_id: parseInt(auth_id, 10),
        product_id: parseInt(product_id, 10),
        quantity: 1,
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const qtyIncrease = async (req, res) => {
  try {
    const { cart_id } = req.params;

    const findCart = await prisma.cart.findUnique({
      where: {
        cart_id: parseInt(cart_id, 10),
      },
    });

    console.log(findCart.quantity);

    const update = await prisma.cart.update({
      where: {
        cart_id: parseInt(cart_id, 10),
      },
      data: {
        quantity: parseInt(findCart.quantity, 10) + 1,
      },
    });

    return res.status(200).json(update);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};
const qtyDecrease = async (req, res) => {
  try {
    const { cart_id } = req.params;

    const findCart = await prisma.cart.findUnique({
      where: {
        cart_id: parseInt(cart_id, 10),
      },
    });

    console.log(findCart.quantity);

    if (findCart.quantity === 1) {
      const destroy = await prisma.cart.delete({
        where: { cart_id: parseInt(cart_id) },
      });

      return res.status(200).json(destroy);
    } else {
      const update = await prisma.cart.update({
        where: {
          cart_id: parseInt(cart_id, 10),
        },
        data: {
          quantity: parseInt(findCart.quantity, 10) - 1,
        },
      });

      return res.status(200).json(update);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const destroy = async (req, res) => {
  try {
    const { cart_id } = req.params;

    const destroy = await prisma.cart.delete({
      where: { cart_id: parseInt(cart_id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, qtyIncrease, qtyDecrease, destroy };
