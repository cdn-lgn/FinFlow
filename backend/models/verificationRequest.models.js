import mongoose from "mongoose";

const verificationRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },

  verifiedAt: {
    type: Date,
  },

  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // employee or admin
  },

  rejectionReason: {
    type: String,
  },
}, { timestamps: true });

export const VerificationRequest = mongoose.model("VerificationRequest", verificationRequestSchema);
