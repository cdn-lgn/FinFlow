import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, "Latitude is required"],
  },
  longitude: {
    type: Number,
    required: [true, "Longitude is required"],
  },
});

const transactionSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Sender (fromUser) is required"],
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      return this.type === "send" || this.type === "receive";
    },
  },
  amount: {
    type: Number,
    required: [true, "Transaction amount is required"],
    min: [1, "Amount must be at least ₹1"],
  },
  type: {
    type: String,
    enum: ["send", "receive", "raiseFund", "deposit", "withdraw"],
    required: [true, "Transaction type is required"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "failed"],
    default: "pending",
  },
  remarks: {
    type: String,
    trim: true,
    maxlength: [200, "Remarks too long, max 200 characters allowed"],
  },
  location: locationSchema, // 👈 User's geo-location during transaction
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);
