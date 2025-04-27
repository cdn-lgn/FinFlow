import { Router } from "express";
import { fetchUserList, fetchUsersForVerfication, userLogin, userRegistration, userVerificationAndUpdate, fetchUserDetails, fetchAccountHolders } from "../controllers/user.controllers.js";
import upload from "../config/multer.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const userRouter = Router();
userRouter.post("/registration", upload.single("image"), userRegistration);
userRouter.get("/verification",authenticateJWT,fetchUsersForVerfication)
userRouter.put("/verify",authenticateJWT,userVerificationAndUpdate)
userRouter.get("/userList", authenticateJWT, fetchAccountHolders); // Modified to fetch users with accounts
userRouter.post("/login",userLogin);
userRouter.get("/user/:email", authenticateJWT, fetchUserDetails); // Changed from userId to email

export default userRouter;
