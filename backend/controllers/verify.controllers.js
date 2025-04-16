import { OtpVerification } from "../models/otpVerification.models.js";
import sendOTP from "../utils/sendOTP.js";

export async function sendOtpForVerification(req, res) {
  try {
    const { email, mobile} = req.body.sendTo;
    console.log(email, mobile);
    const SendingResult = await sendOTP(email,mobile);
    const otpDocument = new OtpVerification({otp: Number(SendingResult.otp)})
    const responseFromDB = await otpDocument.save();
    console.log(SendingResult);
    res.send({
      success: true,
      message: "OTP sent to mobile",
      id: responseFromDB._id,
    });
  } catch (error) {
    console.log(error);
  }
}



export async function otpVerificationAtRegisteration(req, res) {
  try {
    const { otp,id } = req.body;
    const otpDocument = await OtpVerification.findById(id);
    if (!otpDocument) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }
    if (otpDocument.otp === otp) {
      await OtpVerification.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
