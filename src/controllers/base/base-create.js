const prisma = require("@/provider/client");
const { modelSchemas } = require("./base-schema");
const { convertData } = require("./convert-data");

const baseCreate = async (model, data, options = {}, pad = 4) => {
  try {
    if (!modelSchemas[model]) {
      throw new Error(`Model schema for "${model}" not found`);
    }

    const formattedData = convertData(data, modelSchemas[model]);

    const createdRecord = await prisma[model].create({
      data: formattedData,
    });

    if (options.field && options.idField) {
      const code = `${options.prefix}-${String(
        createdRecord[options.idField].toString().padStart(pad, "0")
      )}`;

      const generatedCode = code.split("-").slice(0, 2).join("-");

      const updatedRecord = await prisma[model].update({
        where: { [options.idField]: createdRecord[options.idField] },
        data: { [options.field]: generatedCode },
      });

      console.table(updatedRecord);
      return updatedRecord;
    }

    console.table(createdRecord);
    return createdRecord;
  } catch (err) {
    console.error(`Error creating ${model}:`, err);
    throw new Error(err.message);
  }
};

module.exports = { baseCreate };
