const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const isAuth = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) return res.status(403).json({ message: "Please login" });

    const decoded = jwt.verify(token, process.env.JWTPK);
    req.user = await User.findById(decoded._id);
    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (error) {
    res.status(500).json({ message: "Login First" });
  }
};

module.exports = { isAuth };
