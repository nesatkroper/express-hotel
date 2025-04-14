/**
 * Middleware function to validate the request body against a given schema.
 * @param {function} schema - The schema function to validate the request body.
 * @returns {function} Middleware function that checks the request body against the schema.
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema(req.body);

    if (!result.ok) return res.status(400).json({ message: result.errors });

    req.body = result.data;
    next();
  };
};

/**
 * Middleware function to validate the query parameters of an HTTP request using a schema.
 * @param {Function} schema - The schema function to validate the query parameters.
 * @returns {Function} Express middleware function that validates the query parameters.
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const result = schema(req.query);

    if (!result.ok) return res.status(400).json({ message: result.errors });

    req.query = result.data;
    next();
  };
};

module.exports = { validateBody, validateQuery };
