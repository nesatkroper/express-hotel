const prisma = require("@/provider/client");

const select = async (req, res) => {
  const { id } = req.params;
  const { open = false, close = false } = req.query;
  try {
    let select;

    if (!id)
      select = await prisma.bankNote.findMany({
        include: { open: open === "true", close: close === "true" },
      });
    else
      select = await prisma.bankNote.findUnique({
        where: { bank_note_id: parseInt(id) },
        include: { open: open === "true", close: close === "true" },
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
    } = req.body;

    const create = await prisma.bankNote.create({
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

    return res.status(200).json(create);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;

    await prisma.bankNote.update({
      where: { bank_note_id: parseInt(id) },
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

    const destroy = await prisma.bankNote.delete({
      where: { bank_note_id: parseInt(id) },
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, create, update, destroy };
