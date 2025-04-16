import mongoose from "mongoose";

const otpVerifocationSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" }, // OTP will expire in 5 minutes
  },
});

export const OtpVerification = mongoose.model(
  "OtpVerification",
  otpVerifocationSchema
);
