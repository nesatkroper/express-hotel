const prisma = require("@/provider/client");

const basePatch = async (model, id, type) => {
  if (type) {
    try {
      let status;
      if (type === "remove") {
        status = "inactive";
      } else if (type === "restore") {
        status = "active";
      } else {
        throw new Error("Invalid 'type' value. Use 'remove' or 'restore'.");
      }

      const updatedRecord = await prisma[model].update({
        where: { [`${model}Id`]: id },
        data: { status },
      });

      return updatedRecord;
    } catch (err) {
      console.error(`Error updating ${model} status:`, err);
      throw new Error(err.message);
    }
  } else return "Type Undefined";
};

module.exports = { basePatch };
