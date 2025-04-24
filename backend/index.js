import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import otpVerifyRouter from "./routes/verify.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const environment = process.env.NODE_ENV || "development";

connectDB();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


if (environment == "development") {
  app.use((req, res, next) => {
    console.log("✅ Req from frontend for route : ", req.url);
    console.log("✅ Method : ", req.method);
    next();
  });
}

const API_PREFIX = "/api/v1";
app.use(`${API_PREFIX}/user`, userRouter);
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/verify`, otpVerifyRouter);


app.get("/", (req, res) => {
  res.send("Welcome to FinFlow Backend Server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ FinFlow Server Started on port ${PORT}`);
  environment === "development" &&
    console.log("✅ Development Mode Enabled 🧪");
});
