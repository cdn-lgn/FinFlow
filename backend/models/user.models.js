import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  addressLine: { type: String, required: [true, "Address Line is required"] },
  city: { type: String, required: [true, "City is required"] },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
    match: [/^\d{6}$/, "Invalid pincode"],
  },
  country: { type: String, required: [true, "Country is required"] },
},{_id: false});

const locationSchema = new mongoose.Schema({
  longitude: { type: Number },
  latitude: { type: Number },
},{ _id: false });

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minLength: [3, "Name must be at least 3 characters"],
    },
    fatherName: {
      type: String,
      required: [true, "Father name is required."],
      minLength: [3, "Father name must be at least 3 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required."],
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
      minLength: [8, "Password must be at least 8 characters."],
      select:false,
    },
    dob: { type: Date, required: [true, "Date of birth is required."] },
    pan: {
      type: String,
      required: [true, "PAN number is required."],
      unique: true,
      // match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"],
    },
    photoUrl: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "employee", "admin"],
      default: "user",
    },
    isVerified: { type: Boolean, default: false },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // null if automated
    },
    verifiedByType: {
      type: String,
      enum: ['user', 'automated'],
      default: 'automated',
    },

    isEmailAndMobileVerified: { type: Boolean, default: false },
    address: addressSchema,
    createdLocation: {
      type: locationSchema,
      select: false,
    },
    lastLoginLocation: {type:locationSchema,select:false},
    otp: {
      code: { type: String },
      expiresAt: { type: Date },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
