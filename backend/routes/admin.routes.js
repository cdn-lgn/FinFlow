import { Router } from "express";
import { authenticateJWT } from "../middleware/authenticateJWT.js";
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  updateSettings
} from "../controllers/admin.controllers.js";

const adminRouter = Router();

adminRouter.get("/dashboard-stats", authenticateJWT, getDashboardStats);
adminRouter.get("/users", authenticateJWT, getAllUsers);
adminRouter.put("/user/role", authenticateJWT, updateUserRole);
adminRouter.put("/settings", authenticateJWT, updateSettings);

export default adminRouter;
