// ! Middleware to check role
const authorizeRoles = (roles) => {
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

module.exports = authorizeRoles;
