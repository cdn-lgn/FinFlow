import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateJWT(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error("❌ JWT Authentication Error:", error.message);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
}
