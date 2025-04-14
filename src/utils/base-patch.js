const prisma = require("@/provider/client");

/**
 * @Updates a record's status with transaction support
 * @param {string} model - Prisma model name
 * @param {string|number} id - Record ID to update
 * @param {string} action - Action to perform ('remove' or 'restore')
 * @param {object} [options] - Configuration options
 * @param {string} [options.idField] - Custom ID field name (defaults to `${model}Id`)
 * @param {string} [options.statusField] - Custom status field name (defaults to 'status')
 * @param {object} [options.additionalData] - Additional fields to update
 * @param {boolean} [options.verbose] - Whether to log operation details
 * @returns {Promise<object>} Updated record
 * @throws {Error} If update fails
 */
const basePatch = async (model, id, action, options = {}) => {
  if (!action) {
    throw new Error("Action parameter is required. Use 'remove' or 'restore'.");
  }

  // @Validate model exists
  if (!prisma[model]) {
    throw new Error(`Prisma model "${model}" not found`);
  }

  // @Configure field names
  const idField = options.idField || `${model}Id`;
  const statusField = options.statusField || "status";
  const additionalData = options.additionalData || {};

  return await prisma.$transaction(async (tx) => {
    try {
      // @Determine new status value
      let statusUpdate;
      switch (action.toLowerCase()) {
        case "remove":
          statusUpdate = "inactive";
          break;
        case "restore":
          statusUpdate = "active";
          break;
        default:
          throw new Error(
            `Invalid action "${action}". Use 'remove' or 'restore'.`
          );
      }

      // @Check if record exists first
      const existingRecord = await tx[model].findUnique({
        where: {
          [idField]: id,
        },
      });

      if (!existingRecord) {
        throw new Error(`${model} with ${idField}=${id} not found`);
      }

      // @Prepare update data
      const updateData = {
        [statusField]: statusUpdate,
        ...additionalData,
      };

      if (options.verbose) {
        console.log(`Updating ${model} ${idField}=${id} with:`, updateData);
      }

      // @Perform update
      const updatedRecord = await tx[model].update({
        where: {
          [idField]: id,
        },
        data: updateData,
      });

      return updatedRecord;
    } catch (err) {
      console.error(`Error updating ${model} ${idField}=${id}:`, {
        error: err.message,
        model,
        id,
        action,
        options,
      });
      throw err; // @This will trigger transaction rollback
    }
  });
};

module.exports = {
  basePatch,
};
