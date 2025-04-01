const prisma = require("@/provider/client");

const baseDestroy = async (model, id) => {
  try {
    const record = await prisma[model].findUnique({
      where: { [`${model}Id`]: id },
    });

    if (!record) throw new Error(`${model} not found`);

    return await prisma[model].delete({
      where: { [`${model}Id`]: id },
    });
  } catch (err) {
    console.error(`Error deleting ${model}:`, err);
    throw new Error(err.message);
  }
};

module.exports = { baseDestroy };
