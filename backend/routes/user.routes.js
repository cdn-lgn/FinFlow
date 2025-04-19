import { Router } from "express";
import { userLogin, userRegistration } from "../controllers/user.controllers.js";
import upload from "../config/multer.js";

const userRouter = Router();
userRouter.post("/registration", upload.single("image"), userRegistration);
userRouter.post("/login",userLogin);

export default userRouter;
