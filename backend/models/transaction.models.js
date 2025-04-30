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
      return this.type === "send" || this.type === "receive" || this.type === "request";
    },
  },
  amount: {
    type: Number,
    required: [true, "Transaction amount is required"],
    min: [1, "Amount must be at least ₹1"],
  },
  type: {
    type: String,
    enum: ["send", "receive", "request", "deposit", "withdraw"],
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
  location: locationSchema,
  transactionId: {
    type: String,
    unique: true,
    default: () => `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
  },
  isRequestor: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Add this method to help determine if a user is the requestor
transactionSchema.methods.isUserRequestor = function(userId) {
  return this.type === 'request' && this.toUser.toString() === userId.toString();
};

// Ensure transactionId is set
transactionSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
