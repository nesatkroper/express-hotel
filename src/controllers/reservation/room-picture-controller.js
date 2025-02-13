const prisma = require("@/provider/client");
const path = require("path");
const fs = require("fs");

const select = async (req, res) => {
  try {
    const select = await prisma.roomPicture.findMany({
      include: {
        room: true,
      },
    });
    if (!select || (Array.isArray(select) && !select.length))
      return res.status(400).json({ msg: "no data" });
    return res.status(200).json(select);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const selectID = async (req, res) => {
  const { id } = req.params;
  try {
    const selectID = await prisma.roomPicture.findUnique({
      where: { room_picture_id: parseInt(id) },
      include: {
        room: true,
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
    const { room_id, picture_name } = req.body;
    const picture = req.file ? path.basename(req.file.path) : null;

    const create = await prisma.roomPicture.create({
      data: {
        picture,
        room_id: parseInt(room_id, 10),
        picture_name,
      },
    });

    return res.status(200).json(create);
  } catch (err) {
    console.error("Error creating roomPicture:", err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { room_id, picture_name } = req.body;

    const picture = req.file ? path.basename(req.file.path) : null;

    const roomPicture = await prisma.roomPicture.findUnique({
      where: { room_picture_id: parseInt(id, 10) },
    });

    if (picture !== null) {
      const imagePath = path.join(
        __dirname,
        "../../public/uploads/room-picture",
        roomPicture.picture
      );

      fs.unlink(imagePath, (err) => {
        if (err) console.log(`Error deleting file: ${err}`);
        else console.log(`Removed image file: ${imagePath}`);
      });

      await prisma.roomPicture.update({
        where: { room_picture_id: parseInt(id) },
        data: {
          picture,
          room_id: parseInt(room_id, 10),
          picture_name,
        },
      });
    } else {
      await prisma.roomPicture.update({
        where: { room_picture_id: parseInt(id) },
        data: {
          room_id: parseInt(room_id, 10),
          picture_name,
        },
      });
    }
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

    const roompicture = await prisma.roomPicture.findUnique({
      where: { room_picture_id: parseInt(id, 10) },
    });

    if (!roompicture) return res.status(404).json({ error: " not found" });

    const destroy = await prisma.roomPicture.delete({
      where: { room_picture_id: parseInt(id) },
    });

    const imagePath = path.join(
      __dirname,
      "../../public/uploads/room-picture",
      roomPicture.picture
    );

    fs.unlink(imagePath, (err) => {
      if (err) console.log(`Error deleting file: ${err}`);
      else console.log(`Removed image file: ${imagePath}`);
    });

    return res.status(200).json(destroy);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

module.exports = { select, selectID, create, update, destroy };
