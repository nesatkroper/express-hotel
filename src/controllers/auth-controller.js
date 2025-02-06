const prismaClient = require("@/provider/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (auth) => {
  if (!auth.role || !auth.role.name)
    throw new Error("Role information is missing");

  return jwt.sign(
    { auth_id: auth.auth_id, role: auth.role.name },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
};

const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    //! Role check
    if (typeof role !== "string")
      return res.status(400).json({ err: "Role must be a String." });

    // ! Check if the user already exists
    const existingAuth = await prismaClient.auth.findUnique({
      where: { email },
    });
    if (existingAuth) {
      return res.status(400).json({ error: "auth already exists" });
    }
    // ! Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // ! Find role in the database
    const authRole = await prismaClient.role.findUnique({
      where: { name: String(role) },
    });

    if (!authRole)
      return res.status(400).json({ error: "Role does not exist" });

    // ! Create new auth
    const newAuth = await prismaClient.auth.create({
      data: {
        email,
        password: hashedPass,
        role_id: authRole.role_id,
      },
      include: { role: true },
    });

    // ! Return JWT token
    const token = generateToken(newAuth);

    // ! return the response with token and user information
    res.status(201).json({
      token,
      auth: {
        auth_id: newAuth.auth_id,
        email: newAuth.email,
        role: newAuth.role.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registering user" });
  }
};

// ! Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // ! Find user by email
    const auth = await prismaClient.auth.findUnique({
      where: { email },
      include: { role: true },
    });

    //  ! check if auth found
    if (!auth) return res.status(404).json({ error: "auth not found" });

    // ! Check if auth credentials
    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // ! Return response with token and auth info
    const token = generateToken(auth);
    res.json({
      token,
      auth: {
        auth_id: auth.auth_id,
        email: auth.email,
        role: auth.role.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Logout failed." });
  }
};

// ! Get all Users (Admin-only route)
const getAllAuth = async (req, res) => {
  console.log(req.auth);
  try {
    const auths = await prismaClient.auth.findMany({
      include: { role: true, employee: true, customer: true },
    });
    res.json(auths);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch auths" });
  }
};

// ! Get current auth info
const getAuth = async (req, res) => {
  try {
    const auth = await prismaClient.auth.findUnique({
      where: { auth_id: req.auth.auth_id },
      include: { role: true, employee: true, customer: true },
    });

    if (!auth) return res.status(404).json({ error: "auth not found" });

    res.json(auth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch auth" });
  }
};

module.exports = { register, login, getAllAuth, getAuth, logout };
