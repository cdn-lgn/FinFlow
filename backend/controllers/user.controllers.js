import imageKit from "../config/imagekit.js";
import { User } from "../models/user.models.js";
import { comparePassword, hashedPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PanCard } from "../models/pan_card.models.js";
import { Account } from "../models/account.models.js";
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

    // Validate required fields
    if (!req.file) throw new Error("Profile photo is required.");
    if (password !== confirmPassword)
      throw new Error("Passwords do not match.");

    // Hash password
    const hsPassword = await hashedPassword(password);

    // Upload profile photo
    const uploadPhoto = await imageKit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}_${fullName}`,
      folder: "finflow/userProfile",
    });

    // Create user object
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

    const panMatch = await PanCard.findOne({ pan_card_id: pan });

    if (panMatch) {
      const toIsoDate = (dateStr) => {
        if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
          const [dd, mm, yyyy] = dateStr.split("-");
          return `${yyyy}-${mm}-${dd}`;
        }
        return dateStr;
      };

      const matches = {
        name: panMatch.full_name?.toLowerCase() === fullName.toLowerCase(),
        dob: dob === toIsoDate(panMatch.dob),
        pan: panMatch.pan_card_id === pan,
        fatherName:
          panMatch.fathers_name?.toLowerCase() === fatherName.toLowerCase(),
      };

      const allMatch = Object.values(matches).every(Boolean);
      console.log(Object.values(matches));

      if (allMatch) {
        const userBankAccount = {
          user: user._id,
          accountNumber: `${Math.floor(
            1000000000 + Math.random() * 9000000000
          )}`,
          openedAt: new Date(),
          location: user.createdLocation,
        };

        await Account.create(userBankAccount);
        console.log("✨ User Bank Account Created:", userBankAccount);

        return res.status(200).json({
          success: true,
          message: "✅ User and Bank Account Created",
          account: true,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "✅ User Registered (No matching PAN card found)",
      account: false,
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

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

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

export async function fetchUsersForVerfication(req, res) {
  try {
    const users = await User.find({ isVerified: false })
      .select('fullName email phoneNumber photoUrl isVerified');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function userVerificationAndUpdate(req, res) {
  try {
    if (req.user.senderRole !== "admin" && req.user.senderRole !== "employee") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { email } = req.body;
    if (!email) throw new Error("Email is required.");
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found.");
    if (user.isVerified)
      res
        .status(200)
        .json({
          success: true,
          message: "User already verified",
          isVerified: true,
          email: user.email,
        });
    user.verifiedByType = "user";
    user.verifiedBy = req.user.senderId;
    user.isVerified = true;
    const updatedUser = await user.save();
    const userBankAccount = {
      user: updatedUser._id,
      accountNumber: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      openedAt: new Date(),
      location: user.createdLocation,
    };
    const account = await Account.create(userBankAccount);
    console.log("✨ User Bank Account Created:");

    res
      .status(200)
      .json({
        success: true,
        message: "✅ User verified successfully",
        isVerified: updatedUser.isVerified,
        email: updatedUser.email,
      });
  } catch (error) {
    console.error("❌ Verification Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message || "User verification failed",
    });
  }
}

export async function fetchUserList(req, res) {
  try {
    const users = await User.find({ role: "user" }).select(
      "-password -__v -_id -updatedAt "
    );
    if (!users) throw new Error("No users found.");

    res.status(200).json({
      success: true,
      message: "✅ Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("❌ Fetch Users Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
}

export const fetchAccountHolders = async (req, res) => {
  try {
    const accountHolders = await Account.find()
      .populate({
        path: 'user',
        select: 'fullName email phoneNumber photoUrl isVerified lastLoginLocation -_id'
      })
      .select('balance status accountNumber -_id');

    const users = accountHolders.map(acc => ({
      email: acc.user.email, // Use email as identifier
      fullName: acc.user.fullName,
      phoneNumber: acc.user.phoneNumber,
      photoUrl: acc.user.photoUrl,
      isVerified: acc.user.isVerified,
      accountBalance: acc.balance,
      accountStatus: acc.status,
      accountNumber: acc.accountNumber
    }));

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserDetails = async (req, res) => {
  try {
    const { email } = req.params; // Changed from userId to email
    const user = await User.findOne({ email })
      .select('+createdLocation +lastLoginLocation')
      .select('-_id -__v'); // Explicitly exclude _id

    const account = await Account.findOne({ user: user._id })
      .select('-_id -user -__v'); // Exclude sensitive fields

    res.status(200).json({
      user,
      accountDetails: account
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
