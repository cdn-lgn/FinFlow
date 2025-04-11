import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ek user ka ek account
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    isPinSet: {
      type: Boolean,
      default: false,
    },
    transactionPin: {
      type: String,
      required: function () {
        return this.isPinSet;
      },
      select: false,
    },

    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance can't be negative"],
    },
    status: {
      type: String,
      enum: ["active", "suspended", "closed"],
      default: "active",
    },
    openedAt: {
      type: Date,
      default: Date.now,
    },
    location: locationSchema,

    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true }
);

export const Account = mongoose.model("Account", accountSchema);
