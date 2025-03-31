const path = require("path");
const fs = require("fs");
const prisma = require("@/provider/client");
const { modelSchemas } = require("./base-schema");

const baseSelect = async (
  model,
  id,
  queryParams,
  orderField = "Id",
  whereField = null
) => {
  const {
    order = "desc",
    status = "",
    where,
    page,
    limit,
    ...relations
  } = queryParams;

  try {
    const whereCondition = status === "all" ? {} : { status: "active" };
    if (id) whereCondition[`${model}Id`] = id;

    if (where && whereField) whereCondition[whereField] = where;

    const pageNumber = page ? parseInt(page, 10) : null;
    const pageSize = limit ? parseInt(limit, 10) : null;
    const skip =
      pageNumber && pageSize ? (pageNumber - 1) * pageSize : undefined;
    const take = pageSize || undefined;

    if (id) {
      const selectData = await prisma[model].findUnique({
        where: whereCondition,
        include: Object.fromEntries(
          Object.entries(relations).map(([key, value]) => [
            key,
            value === "true",
          ])
        ),
      });

      console.table(selectData);
      return { data: selectData };
    } else {
      const [items, total] = await Promise.all([
        prisma[model].findMany({
          where: whereCondition,
          include: Object.fromEntries(
            Object.entries(relations).map(([key, value]) => [
              key,
              value === "true",
            ])
          ),
          orderBy: { [orderField]: order },
          skip,
          take,
        }),
        prisma[model].count({ where: whereCondition }),
      ]);

      return pageNumber && pageSize
        ? {
            data: items,
            meta: {
              total,
              page: pageNumber,
              limit: pageSize,
              totalPages: Math.ceil(total / pageSize),
            },
          }
        : { data: items };
    }
  } catch (err) {
    console.log("Error in baseSelect:", err);
    throw new Error(err.message);
  }
};

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

const convertData = (data, modelSchema) => {
  try {
    const convertedData = {};

    for (const key in data) {
      if (!modelSchema[key]) {
        console.warn(
          `Warning: Key "${key}" is not defined in schema for this model.`
        );
        continue;
      }

      if (modelSchema[key] === "Int") {
        convertedData[key] = isNaN(parseInt(data[key]))
          ? null
          : parseInt(data[key]);
      } else if (modelSchema[key] === "Float") {
        convertedData[key] = isNaN(parseFloat(data[key]))
          ? null
          : parseFloat(data[key]);
      } else if (modelSchema[key] === "DateTime") {
        convertedData[key] = data[key] ? new Date(data[key]) : null;
      } else {
        convertedData[key] = data[key];
      }
    }

    return convertedData;
  } catch (err) {
    console.error("Error in convertData:", err.message);
    throw new Error("Failed to convert data due to schema mismatch.");
  }
};

module.exports = { baseSelect, baseCreate, baseUpdate, basePatch, baseDestroy };
