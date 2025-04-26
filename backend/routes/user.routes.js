import { Router } from "express";
import { fetchUserList, fetchUsersForVerfication, userLogin, userRegistration, userVerificationAndUpdate } from "../controllers/user.controllers.js";
import upload from "../config/multer.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const userRouter = Router();
userRouter.post("/registration", upload.single("image"), userRegistration);
userRouter.get("/verification",authenticateJWT,fetchUsersForVerfication)
userRouter.put("/verify",authenticateJWT,userVerificationAndUpdate)
userRouter.get("/userList",authenticateJWT,fetchUserList)
userRouter.post("/login",userLogin);

export default userRouter;
