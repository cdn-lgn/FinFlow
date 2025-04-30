import { Router } from "express";
import {
  fetchUserList,
  fetchUsersForVerfication,
  userLogin,
  userRegistration,
  userVerificationAndUpdate,
  fetchUserDetails,
  fetchAccountHolders,
  getDashboardStats,
  getAccountStats,
  sendMoney,
  requestMoney,
  getTransactions,
  setTransactionPin,
  changeTransactionPin,
  changePassword,
  depositMoney,
  handleRequestAction,
  updateAccountStatus
} from "../controllers/user.controllers.js";
import upload from "../config/multer.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const userRouter = Router();
userRouter.get("/account-stats", authenticateJWT, getAccountStats); // Keep at top and ensure correct path

userRouter.post("/registration", upload.single("image"), userRegistration);
userRouter.get("/verification",authenticateJWT,fetchUsersForVerfication)
userRouter.put("/verify",authenticateJWT,userVerificationAndUpdate)
userRouter.get("/userList", authenticateJWT, fetchAccountHolders);
userRouter.get("/details/:email", authenticateJWT, fetchUserDetails); // New consolidated route
userRouter.post("/login",userLogin);
userRouter.get("/user/:email", authenticateJWT, fetchUserDetails); // Changed from userId to email
userRouter.get("/dashboard-stats", authenticateJWT, getDashboardStats);

// User specific routes
userRouter.post("/send", authenticateJWT, sendMoney);
userRouter.post("/request", authenticateJWT, requestMoney);
userRouter.post("/send-money", authenticateJWT, sendMoney);
userRouter.post("/request-money", authenticateJWT, requestMoney);
userRouter.get('/transactions', authenticateJWT, getTransactions);
userRouter.post("/deposit", authenticateJWT, depositMoney);

// Security routes
userRouter.post("/set-pin", authenticateJWT, setTransactionPin);
userRouter.post("/change-pin", authenticateJWT, changeTransactionPin);
userRouter.post("/change-password", authenticateJWT, changePassword);

// New route
userRouter.post("/request-action", authenticateJWT, handleRequestAction);

userRouter.put("/account-status", authenticateJWT, updateAccountStatus);

export default userRouter;
