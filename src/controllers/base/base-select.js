const prisma = require("@/provider/client");

const baseSelect = async (
  model,
  id,
  queryParams,
  orderField = "id",
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
    let whereCondition = {};
    if (id) whereCondition[`${model}Id`] = id;
    if (where && whereField) whereCondition[whereField] = where;

    if (status && status !== "all")
      whereCondition.status = status === "" ? "active" : status;

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
    if (
      err.code === "P2009" ||
      (typeof err.message === "string" && err.message.includes("status"))
    )
      throw new Error(
        `Model ${model} does not support status filtering. Try again without status parameters`
      );

    if (typeof err.message === "string" && err.message.includes("orderBy"))
      throw new Error(
        `Invalid orderBy field '${orderField}' for model '${model}'. Check your schema for valid fields.`
      );

    throw new Error(err.message);
  }
};

module.exports = { baseSelect };
