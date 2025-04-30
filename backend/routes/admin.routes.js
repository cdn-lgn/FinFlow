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
  getEmployeeDetails
} from "../controllers/admin.controllers.js";

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
adminRouter.post("/employees/add", addEmployee);
adminRouter.get("/employees/:employeeId", getEmployeeDetails);

// System settings
adminRouter.put("/settings", updateSystemSettings);

export default adminRouter;
