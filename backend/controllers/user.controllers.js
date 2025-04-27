import imageKit from "../config/imagekit.js";
import { User } from "../models/user.models.js";
import { comparePassword, hashedPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PanCard } from "../models/pan_card.models.js";
import { Account } from "../models/account.models.js";
import { Transaction } from "../models/transaction.models.js";
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

export const fetchUsersForVerfication = async (req, res) => {
  try {
    const users = await User.find({ isVerified: false })
      .select('fullName email phoneNumber photoUrl isVerified')
      .lean(); // Use lean() for better performance
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
        select: 'fullName email phoneNumber photoUrl isVerified',
        options: { lean: true }
      })
      .select('balance status accountNumber')
      .lean();

    const users = accountHolders.map(acc => ({
      email: acc.user.email,
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
    const { email } = req.params;
    const user = await User.findOne({ email })
      .select('+createdLocation +lastLoginLocation +address'); // Include necessary fields

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user has an account, fetch account details
    const account = user.isVerified ?
      await Account.findOne({ user: user._id })
        .select('balance status accountNumber transactions') : null;

    res.status(200).json({
      user: {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoUrl,
        isVerified: user.isVerified,
        isEmailAndMobileVerified: user.isEmailAndMobileVerified,
        role: user.role,
        dob: user.dob,
        pan: user.pan,
        fatherName: user.fatherName,
        address: user.address,
        createdLocation: user.createdLocation,
        lastLoginLocation: user.lastLoginLocation,
        createdAt: user.createdAt
      },
      accountDetails: account
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Get total users count (only role="user")
    const totalUsers = await User.countDocuments({
      role: "user",
      isVerified: true
    });

    // Get pending verifications count
    const pendingVerifications = await User.countDocuments({
      role: "user",
      isVerified: false
    });

    // Get active accounts count
    const activeAccounts = await Account.countDocuments({ status: 'active' });

    // Get recent verifications with proper date formatting
    const recentVerifications = await User.find({
      role: "user",
      isVerified: true,
      verifiedAt: { $ne: null }
    })
    .select('fullName email verifiedAt')
    .sort({ verifiedAt: -1 })
    .limit(5)
    .lean()
    .then(users => users.map(user => ({
      ...user,
      verifiedAt: user.verifiedAt.toISOString()
    })));

    res.status(200).json({
      totalUsers,
      pendingVerifications,
      activeAccounts,
      recentVerifications
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAccountStats = async (req, res) => {
  try {
    const userId = req.user._id;
    // First find user's account
    const userAccount = await Account.findOne({ user: userId });

    if (!userAccount) {
      return res.status(404).json({
        success: false,
        error: "Account not found"
      });
    }

    // Get recent transactions
    const recentTransactions = await Transaction.find({
      $or: [
        { fromUser: userId },
        { toUser: userId }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

    // Format transactions
    const formattedTransactions = recentTransactions.map(tx => ({
      type: tx.fromUser.equals(userId) ? 'debit' : 'credit',
      amount: tx.amount,
      description: tx.remarks || `${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} transaction`,
      timestamp: tx.createdAt,
      status: tx.status
    }));

    const accountStats = {
      balance: userAccount.balance || 0,
      accountNumber: userAccount.accountNumber,
      status: userAccount.status,
      recentTransactions: formattedTransactions
    };

    res.status(200).json({
      success: true,
      ...accountStats
    });
  } catch (error) {
    console.error('Error fetching account stats:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const sendMoney = async (req, res) => {
  try {
    const { receiverAccountNumber, amount } = req.body;
    // Implement transaction logic
    res.status(200).json({ message: "Money sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const requestMoney = async (req, res) => {
  try {
    const { fromAccountNumber, amount } = req.body;
    // Implement request logic
    res.status(200).json({ message: "Money request sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
