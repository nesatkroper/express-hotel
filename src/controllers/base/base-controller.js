const path = require("path");
const fs = require("fs");
const prisma = require("@/provider/client");
const { modelSchemas } = require("./base-schema");

const baseSelect = async (
  model,
  id,
  queryParams,
  orderField = "id",
  whereField = null
) => {
  const {
    order = "desc",
    status = "active",
    where,
    page,
    limit,
    ...relations
  } = queryParams;

  try {
    const whereCondition = status === "all" ? {} : { status };
    if (id) whereCondition[`${model}_id`] = parseInt(id) || undefined;

    if (where && whereField) {
      const whereValue = !isNaN(where) ? parseInt(where) : where;
      whereCondition[whereField] = whereValue;
    }

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
      const generatedCode = `${options.prefix}-${String(
        createdRecord[options.idField].toString().padStart(pad, "0")
      )}`;

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

    const idField = `${model}_id`;
    const recordId = parseInt(id, 10);
    if (isNaN(recordId)) {
      throw new Error("Invalid ID provided");
    }

    let updateData = convertData(data, modelSchemas[model]);

    const existingRecord = await prisma[model].findUnique({
      where: { [idField]: recordId },
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
      where: { [idField]: recordId },
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
      const recordId = parseInt(id, 10);
      if (isNaN(recordId)) throw new Error("Invalid ID provided");

      let status;
      if (type === "remove") {
        status = "disactive";
      } else if (type === "restore") {
        status = "active";
      } else {
        throw new Error("Invalid 'type' value. Use 'remove' or 'restore'.");
      }

      const updatedRecord = await prisma[model].update({
        where: { [`${model}_id`]: recordId },
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
    const recordId = parseInt(id, 10);
    if (isNaN(recordId)) throw new Error("Invalid ID provided");

    const record = await prisma[model].findUnique({
      where: { [`${model}_id`]: recordId },
    });

    if (!record) throw new Error(`${model} not found`);

    return await prisma[model].delete({
      where: { [`${model}_id`]: recordId },
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
