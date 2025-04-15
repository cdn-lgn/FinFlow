import { Router } from "express";
import { userRegistration } from "../controllers/user.controllers.js";
import upload from "../config/multer.js";

const userRouter = Router();
userRouter.post("/registration", upload.single("image"), userRegistration);

export default userRouter;
