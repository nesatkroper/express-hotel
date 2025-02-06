// ! Middleware to authenticate JWT Token

const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  // const token = req.header("Authorization")?.replace("Bearer ", "");
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.auth = decoded;
    next();
  });
};

module.exports = authenticateJWT;
//
