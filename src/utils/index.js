const { baseCreate } = require("./base-create");
const { baseDestroy } = require("./base-destroy");
const { basePatch } = require("./base-patch");
const { baseSelect } = require("./base-select");
const { baseUpdate } = require("./base-update");

/**
 * Module exports an object containing base functions for select, create, update, patch, and destroy operations.
 * @module
 * @exports {Object} - An object containing base functions for select, create, update, patch, and destroy operations.
 */
module.exports = { baseSelect, baseCreate, baseUpdate, basePatch, baseDestroy };
