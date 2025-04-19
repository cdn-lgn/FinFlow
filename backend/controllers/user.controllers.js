import imageKit from "../config/imagekit.js";
import { User } from "../models/user.models.js";
import { comparePassword, hashedPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function userRegistration(req, res) {
  try {
    const {
      fullName,
      fatherName,
      email,
      mobile,
      password,
      confirmPassword,
      dob,
      pan,
      isEmailAndMobileVerified,
      addressLine,
      city,
      country,
      pincode,
      createdLocation,
    } = req.body;

    const isUserDataAvailable = await

    if (!req.file) throw new Error("Profile photo is required.");
    if (password !== confirmPassword)
      throw new Error("Password and Confirm Password do not match.");

    const hsPassword = await hashedPassword(password);

    const uploadPhoto = await imageKit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}_${fullName}`,
      folder: "finflow/userProfile",
    });

    const userData = {
      fullName: fullName.toLowerCase(),
      fatherName: fatherName.toLowerCase(),
      email,
      phoneNumber: mobile,
      password: hsPassword,
      dob,
      pan,
      isEmailAndMobileVerified: isEmailAndMobileVerified === "true",
      address: {
        addressLine: addressLine.toLowerCase(),
        city: city.toLowerCase(),
        country,
        pincode,
      },
      createdLocation: JSON.parse(createdLocation),
      photoUrl: uploadPhoto.url,
    };

    const user = await User.create(userData);
    console.log("✨ User Created:", user);

    res.status(200).json({
      success: true,
      message: "✅ User Registration Successful",
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "User Registration Failed",
    });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, role, password } = req.body;

    if (!email || !password)
      throw new Error("Email and Password are required.");

    const user = await User.findOne({ email, role }).select("+password");
    if (!user) throw new Error("User not found.");

    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) throw new Error("Invalid credentials.");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const {
      password: _,
      __v,
      updatedAt,
      createdAt,
      _id,
      ...safeUserData
    } = user.toObject();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "✅ User login successful",
        userData: safeUserData,
      });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message || "User login failed",
    });
  }
}
