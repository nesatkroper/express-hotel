const prisma = require("@/provider/client");

/**
 * @Retrieves records with advanced query capabilities
 * @param {string} model - Prisma model name
 * @param {string|number} [id] - Optional record ID for single record lookup
 * @param {object} [queryParams] - Query parameters
 * @param {string} [queryParams.order] - Sort order ('asc' or 'desc')
 * @param {string} [queryParams.status] - Status filter
 * @param {string} [queryParams.where] - Additional where condition value
 * @param {number} [queryParams.page] - Page number for pagination
 * @param {number} [queryParams.limit] - Items per page
 * @param {object} [queryParams.relations] - Relations to include
 * @param {string} [orderField='id'] - Field to order by
 * @param {string} [whereField] - Field for additional where condition
 * @returns {Promise<object>} Query results with optional pagination metadata
 */

const baseSelect = async (
  model,
  id,
  queryParams = {},
  orderField = "id",
  whereField = null
) => {
  // @Validate model exists
  if (!prisma[model]) {
    throw new Error(`Prisma model "${model}" not found`);
  }

  const {
    order = "desc",
    status = "",
    where,
    page,
    limit,
    ...relations
  } = queryParams;

  try {
    // return await prisma.$transaction(async (tx) => {
    const tx = prisma;
    const whereCondition = {};

    if (id) {
      whereCondition[`${model}Id`] = id;
    }

    if (where && whereField) {
      whereCondition[whereField] = where;
    }

    // @Handle status filtering if the model supports it
    if (status && status !== "all") {
      try {
        // @Check if model has status field
        const modelFields = Object.keys(tx[model].fields);
        if (modelFields.includes("status")) {
          whereCondition.status = status === "" ? "active" : status;
        }
      } catch {
        // @Silently ignore if we can't check fields
      }
    }

    // @Handle pagination
    const pageNumber = page ? parseInt(page, 10) : null;
    const pageSize = limit ? parseInt(limit, 10) : null;
    const skip =
      pageNumber && pageSize ? (pageNumber - 1) * pageSize : undefined;
    const take = pageSize || undefined;

    // @Process relation includes
    const include = {};
    for (const [key, value] of Object.entries(relations)) {
      include[key] = value === "true";
    }

    if (id) {
      // @Single record lookup
      const selectData = await tx[model].findUnique({
        where: whereCondition,
        include: Object.keys(include).length ? include : undefined,
      });

      if (!selectData) {
        throw new Error(`${model} with ID ${id} not found`);
      }

      return { data: selectData };
    } else {
      // @Multiple records with pagination
      const [items, total] = await Promise.all([
        tx[model].findMany({
          where: whereCondition,
          include: Object.keys(include).length ? include : undefined,
          orderBy: {
            [orderField]: order,
          },
          skip,
          take,
        }),
        tx[model].count({ where: whereCondition }),
      ]);

      if (pageNumber && pageSize) {
        return {
          data: items,
          meta: {
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize),
            hasNextPage: pageNumber * pageSize < total,
            hasPreviousPage: pageNumber > 1,
          },
        };
      }

      return { data: items };
    }
    // });
  } catch (err) {
    console.error(`Error in baseSelect for model ${model}:`, {
      error: err.message,
      id,
      queryParams,
    });

    if (err.code === "P2009") {
      throw new Error(
        `Invalid query syntax for model ${model}. Check your parameters.`
      );
    }

    if (err.message.includes("orderBy")) {
      throw new Error(
        `Cannot order by '${orderField}' in model '${model}'. Valid fields are: ${Object.keys(
          prisma[model].fields
        ).join(", ")}`
      );
    }

    if (err.message.includes("include")) {
      throw new Error(
        `Invalid relation included for model ${model}. Valid relations are: ${Object.keys(
          prisma[model].relations
        ).join(", ")}`
      );
    }

    throw err;
  }
};

module.exports = {
  baseSelect,
};

// const prisma = require("@/provider/client");

// const baseSelect = async (
// model,
// id,
// queryParams,
// orderField = "id",
// whereField = null
// ) => {
// const {
//     order = "desc",
//     status = "",
//     where,
//     page,
//     limit,
//     ...relations
// } = queryParams;

// try {
//     let whereCondition = {};
//     if (id) whereCondition[`${model}Id`] = id;
//     if (where && whereField) whereCondition[whereField] = where;

//     if (status && status !== "all")
//       whereCondition.status = status === "" ? "active" : status;

//     const pageNumber = page ? parseInt(page, 10) : null;
//     const pageSize = limit ? parseInt(limit, 10) : null;
//     const skip =
//       pageNumber && pageSize ? (pageNumber - 1) * pageSize : undefined;
//     const take = pageSize || undefined;

//     if (id) {
//       const selectData = await prisma[model].findUnique({
//         where: whereCondition,
//         include: Object.fromEntries(
//           Object.entries(relations).map(([key, value]) => [
//             key,
//             value === "true",
//           ])
//         ),
//       });

//       console.table(selectData);
//       return { data: selectData };
//     } else {
//       const [items, total] = await Promise.all([
//         prisma[model].findMany({
//           where: whereCondition,
//           include: Object.fromEntries(
//             Object.entries(relations).map(([key, value]) => [
//               key,
//               value === "true",
//             ])
//           ),
//           orderBy: { [orderField]: order },
//           skip,
//           take,
//         }),
//         prisma[model].count({ where: whereCondition }),
//       ]);

//       return pageNumber && pageSize
//         ? {
//             data: items,
//             meta: {
//               total,
//               page: pageNumber,
//               limit: pageSize,
//               totalPages: Math.ceil(total / pageSize),
//             },
//           }
//         : { data: items };
//     }
// } catch (err) {
//     console.log("Error in baseSelect:", err);
//     if (
//       err.code === "P2009" ||
//       (typeof err.message === "string" && err.message.includes("status"))
//     )
//       throw new Error(
//         `Model ${model} does not support status filtering. Try again without status parameters`
//       );

//     if (typeof err.message === "string" && err.message.includes("orderBy"))
//       throw new Error(
//         `Invalid orderBy field '${orderField}' for model '${model}'. Check your schema for valid fields.`
//       );

//     throw new Error(err.message);
// }
// };

// module.exports = { baseSelect };
