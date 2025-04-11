import mongoose from "mongoose";

const fundRequestSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ya "Employee", depends on role
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [1, "Amount must be greater than 0"],
  },
  reason: {
    type: String,
    required: [true, "Reason is required"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  responseBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // jisne approve/reject kiya
  },
  respondedAt: {
    type: Date,
  },
  createdAtLocation: {
    latitude: Number,
    longitude: Number,
  }
}, { timestamps: true });

export const FundRequest = mongoose.model("FundRequest", fundRequestSchema);
