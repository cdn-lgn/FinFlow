import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  device: {
    type: String, // like "Chrome on Windows", "Safari on iPhone"
  },
  ip: {
    type: String,
  },
  loginAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const LoginHistory = mongoose.model("LoginHistory", loginHistorySchema);
