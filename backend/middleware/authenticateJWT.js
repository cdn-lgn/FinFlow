import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateJWT(req, res, next) {
  try {
    const token = req.cookies.token;
    // console.log(req.cookies)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { senderId: decoded.userId, senderRole: decoded.role };
    next();
  } catch (error) {
    console.error("❌ JWT Authentication Error:", error.message);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
}
