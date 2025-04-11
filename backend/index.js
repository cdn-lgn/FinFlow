import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const environment = process.env.NODE_ENV || "production";

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
if (environment == "development") {
  app.use((req, res, next) => {
    console.log("Req from frontend for route : ", req.url);
    console.log("Method : ", req.method);
    next();
  });
}

app.get("/", (req, res) => {
  res.send("Welcome to FinFlow Backend Server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ FinFlow Server Started on port ${PORT}`);
  environment === "development" && console.log("✅ Development Mode Enabled 🧪");
});

