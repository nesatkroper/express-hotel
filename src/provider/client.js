const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Exports the Prisma client instance for interacting with the database.
 */
module.exports = prisma;
