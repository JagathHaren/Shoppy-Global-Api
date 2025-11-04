const jwt = require("jsonwebtoken");
require("dotenv").config()
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = decoded; // user info(id, email) from token
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
