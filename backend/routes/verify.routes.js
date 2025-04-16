import { Router } from "express";
import { otpVerificationAtRegisteration, sendOtpForVerification } from "../controllers/verify.controllers.js";

const otpVerifyRouter = Router();
otpVerifyRouter.post("/send-otp", sendOtpForVerification);
otpVerifyRouter.post("/verify-otp", otpVerificationAtRegisteration);


export default otpVerifyRouter;
