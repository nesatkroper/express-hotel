const prisma = require("@/provider/client");
const { upload } = require("@/middleware/storage-middleware");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const images = await prisma.image.findMany();
  res.json(images);
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const image = await prisma.image.create({
      data: { title, imageUrl },
    });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
