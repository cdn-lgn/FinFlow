import { Router } from "express";
import { fetchUserList, fetchUsersForVerfication, userLogin, userRegistration, userVerificationAndUpdate, fetchUserDetails, fetchAccountHolders, getDashboardStats, getAccountStats, sendMoney, requestMoney } from "../controllers/user.controllers.js";
import upload from "../config/multer.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const userRouter = Router();
userRouter.post("/registration", upload.single("image"), userRegistration);
userRouter.get("/verification",authenticateJWT,fetchUsersForVerfication)
userRouter.put("/verify",authenticateJWT,userVerificationAndUpdate)
userRouter.get("/userList", authenticateJWT, fetchAccountHolders);
userRouter.get("/details/:email", authenticateJWT, fetchUserDetails); // New consolidated route
userRouter.post("/login",userLogin);
userRouter.get("/user/:email", authenticateJWT, fetchUserDetails); // Changed from userId to email
userRouter.get("/dashboard-stats", authenticateJWT, getDashboardStats);

// User specific routes
userRouter.post("/send-money", authenticateJWT, sendMoney);
userRouter.post("/request-money", authenticateJWT, requestMoney);

// Keep this route under /users/
userRouter.get("/account-stats", authenticateJWT, getAccountStats);

export default userRouter;
