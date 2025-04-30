import { Router } from "express";
import { authenticateJWT } from "../middleware/authenticateJWT.js";
import { adminAuth } from "../middleware/adminAuth.js";
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  getSystemStats,
  updateSystemSettings,
  getEmployees,
  addEmployee,
  getEmployeeDetails,
  removeEmployee
} from "../controllers/admin.controllers.js";
import upload from "../config/multer.js";

const adminRouter = Router();

// Admin middleware to check role
adminRouter.use(authenticateJWT, adminAuth);

// Dashboard and stats
adminRouter.get("/dashboard-stats", getDashboardStats);
adminRouter.get("/system-stats", getSystemStats);

// User management
adminRouter.get("/users", getAllUsers);
adminRouter.put("/user/role", updateUserRole);

// Add new route for employees
adminRouter.get("/employees", getEmployees);
adminRouter.post("/employees/add", upload.single("image"), addEmployee);
adminRouter.get("/employees/:employeeId", getEmployeeDetails);
adminRouter.delete("/employees/:employeeId", removeEmployee);

// System settings
adminRouter.put("/settings", updateSystemSettings);

export default adminRouter;
