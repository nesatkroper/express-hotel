const prisma = require("@/provider/client");
const {modelSchemas} = require("./base-schema");
const {convertData} = require("./convert-data");

/**
 * Creates a new record with transaction support and optional auto-generated code
 * @param {string} model - Prisma model name
 * @param {object} data - Data to create
 * @param {object} [options] - Configuration options
 * @param {string} [options.field] - Field to store generated code
 * @param {string} [options.idField] - Field to use for numeric portion
 * @param {string} [options.prefix] - Code prefix
 * @param {number} [pad=4] - Zero padding length
 * @param {boolean} [verbose=false] - Whether to log results
 * @returns {Promise<object>} Created/updated record
 */
const baseCreate = async (model, data, options = {}, pad = 4, verbose = false) => { // Validate model exists before starting transaction
    if (! prisma[model]) {
        throw new Error(`Prisma model "${model}" not found`);
    }
    if (!modelSchemas[model]) {
        throw new Error(`Model schema for "${model}" not found`);
    }

    return await prisma.$transaction(async (tx) => {
        try { // Convert data within transaction
            const formattedData = convertData(data, modelSchemas[model]);

            // Create record
            const createdRecord = await tx[model].create({data: formattedData});

            // Early return if no code generation needed
            if (!options.field || !options.idField || !options.prefix) {
                if (verbose) 
                    console.table(createdRecord);
                
                return createdRecord;
            }

            // Validate ID field exists
            if (! createdRecord[options.idField]) {
                throw new Error(`ID field "${
                    options.idField
                }" not found in created record`);
            }

            // Generate secure code
            const safePrefix = options.prefix.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            const numericPart = createdRecord[options.idField].toString().padStart(pad, '0');
            const generatedCode = `${safePrefix}-${numericPart}`;

            // Update record with generated code
            const updatedRecord = await tx[model].update({
                where: {
                    [options.idField]: createdRecord[options.idField]
                },
                data: {
                    [options.field]: generatedCode
                }
            });

            if (verbose) 
                console.table(updatedRecord);
            
            return updatedRecord;

        } catch (err) {
            console.error(`Transaction failed for model ${model}:`, {
                error: err.message,
                data,
                options
            });
            throw err; // This will automatically rollback the transaction
        }
    });
};

module.exports = {
    baseCreate
};


// const prisma = require("@/provider/client");
// const {modelSchemas} = require("./base-schema");
// const {convertData} = require("./convert-data");

// /**
// * Creates a new record with optional auto-generated code
// * @param {string} model - Prisma model name
// * @param {object} data - Data to create
// * @param {object} [options] - Configuration options
// * @param {string} [options.field] - Field to store generated code
// * @param {string} [options.idField] - Field to use for numeric portion
// * @param {string} [options.prefix] - Code prefix
// * @param {number} [pad=4] - Zero padding length
// * @param {boolean} [verbose=false] - Whether to log results
// * @returns {Promise<object>} Created/updated record
// */

// const baseCreate = async (model, data, options = {}, pad = 4, verbose = false) => {
//     try {
//         // Validate model exists before starting transaction
//         if (! prisma[model])
//             throw new Error(`Prisma model "${model}" not found`);

//         if (!modelSchemas[model])
//             throw new Error(`Model schema for "${model}" not found`);

//         const formattedData = convertData(data, modelSchemas[model]);
//         // if (! formattedData || typeof formattedData !== 'object')
//         //     throw new Error('Data conversion failed - invalid result');


//         const createdRecord = await prisma[model].create({data: formattedData});

//         // ! Early return if no code generation needed
//         if (!options.field || !options.idField || !options.prefix) {
//             if (verbose)
//                 console.table(createdRecord);

//             return createdRecord;
//         }

//         // Validate fields exist in model
//         if (! createdRecord[options.idField]) {
//             throw new Error(`ID field "${
//                 options.idField
//             }" not found in created record`);
//         }

//         if (options.field && options.idField) {
//             const code = `${
//                 options.prefix
//             }-${
//                 String(createdRecord[options.idField].toString().padStart(pad, "0"))
//             }`;

//             const generatedCode = code.split("-").slice(0, 2).join("-");

//             const updatedRecord = await prisma[model].update({
//                 where: {
//                     [options.idField]: createdRecord[options.idField]
//                 },
//                 data: {
//                     [options.field]: generatedCode
//                 }
//             });

//             console.table(updatedRecord);
//             return updatedRecord;
//         }

//         console.table(createdRecord);
//         return createdRecord;
//     } catch (err) {
//         console.error(`Error creating ${model}:`, err);
//         throw new Error(err.message);
//     }
// };

// module.exports = {
//     baseCreate
// };
