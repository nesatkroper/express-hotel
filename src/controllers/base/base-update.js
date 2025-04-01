const fs = require("fs");
const path = require("path");
const prisma = require("@/provider/client");
const { modelSchemas } = require("./base-schema");
const { convertData } = require("./convert-data");

const baseUpdate = async (model, id, data, file, uploadPath) => {
  try {
    if (!modelSchemas[model]) {
      throw new Error(`Model schema for "${model}" not found`);
    }

    const idField = `${model}Id`;
    let updateData = convertData(data, modelSchemas[model]);

    const existingRecord = await prisma[model].findUnique({
      where: { [idField]: id },
    });

    if (!existingRecord) {
      throw new Error(`${model} not found`);
    }

    if (file) {
      const newPicture = file ? path.basename(file.path) : null;

      if (existingRecord.picture) {
        const imagePath = path.join(uploadPath, existingRecord.picture);
        fs.unlink(imagePath, (err) => {
          if (err) console.error(`Error deleting old image: ${err}`);
          else console.log(`Deleted old image: ${imagePath}`);
        });
      }

      updateData.picture = newPicture;
    }

    const updatedRecord = await prisma[model].update({
      where: { [idField]: id },
      data: updateData,
    });

    return updatedRecord;
  } catch (err) {
    console.error(`Error updating ${model}:`, err.message);
    throw new Error(err.message);
  }
};

module.exports = { baseUpdate };
