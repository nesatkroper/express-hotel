// ! Middleware to check role
/**
 * Middleware function that checks if the authenticated user has the required role to access a route.
 * @param {Array} roles - An array of roles that are allowed to access the route.
 * @returns {Function} Middleware function that checks if the authenticated user has the required role.
 */
module.exports = (roles) => {
  return (req, res, next) => {
    console.log(req.auth);
    if (roles.includes(req.auth.role !== "admin")) {
      return res
        .status(403)
        .json({ error: "Access middleware of role denied" });
    }
    next();
  };
};
