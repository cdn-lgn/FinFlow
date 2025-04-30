import imageKit from "../config/imagekit.js";
import { User } from "../models/user.models.js";
import { comparePassword, hashedPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PanCard } from "../models/pan_card.models.js";
import { Account } from "../models/account.models.js";
import { Transaction } from "../models/transaction.models.js";
import sendMail from "../utils/sendEmail.js";
import sendSMS from "../utils/sendSMS.js";
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

    // Check PAN verification first
    const panMatch = await PanCard.findOne({ pan_card_id: pan });

    let isPanVerified = false;
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
        fatherName: panMatch.fathers_name?.toLowerCase() === fatherName.toLowerCase(),
      };

      isPanVerified = Object.values(matches).every(Boolean);
    }

    // Hash password and upload photo
    const hsPassword = await hashedPassword(password);
    const uploadPhoto = await imageKit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}_${fullName}`,
      folder: "finflow/userProfile",
    });

    // Create user object with verification status
    const userData = {
      fullName: fullName.toLowerCase(),
      fatherName: fatherName.toLowerCase(),
      email,
      phoneNumber: mobile,
      password: hsPassword,
      dob,
      pan,
      isEmailAndMobileVerified: isEmailAndMobileVerified === "true",
      isVerified: isPanVerified, // Set verification status based on PAN check
      verifiedByType: isPanVerified ? 'automated' : null,
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

    // If PAN verified, create bank account automatically
    if (isPanVerified) {
      const userBankAccount = {
        user: user._id,
        accountNumber: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        openedAt: new Date(),
        location: user.createdLocation,
      };

      await Account.create(userBankAccount);
    }

    res.status(200).json({
      success: true,
      message: isPanVerified
        ? "✅ User Verified and Bank Account Created"
        : "✅ User Registered (Verification Pending)",
      account: isPanVerified
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
    const { email, role, password, location } = req.body;

    if (!email || !password)
      throw new Error("Email and Password are required.");

    const user = await User.findOne({ email, role }).select("+password");
    if (!user) throw new Error("User not found.");

    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) throw new Error("Invalid credentials.");

    // Update last login location
    user.lastLoginLocation = location || { latitude: 0, longitude: 0 };
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Get account details if role is user
    let accountDetails = null;
    if (role === "user") {
      accountDetails = await Account.findOne({ user: user._id })
        .select('balance status accountNumber isPinSet')
        .lean();
    }

    const safeUserData = {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoUrl,
      role: user.role,
      isVerified: user.isVerified,
      fatherName: user.fatherName,
      dob: user.dob,
      lastLoginLocation: user.lastLoginLocation,
      ...(accountDetails && {
        balance: accountDetails.balance,
        accountNumber: accountDetails.accountNumber,
        status: accountDetails.status,
        isPinSet: accountDetails.isPinSet
      })
    };

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
    const userId = req.user.senderId;
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

export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.senderId;
    const transactions = await Transaction.find({
      $or: [{ fromUser: userId }, { toUser: userId }]
    })
    .sort({ createdAt: -1 })
    .limit(20)
    .populate('fromUser toUser', 'fullName')
    .lean();

    const formattedTransactions = transactions.map(tx => {
      const fromUserName = tx.fromUser?.fullName || 'Unknown User';
      const toUserName = tx.toUser?.fullName || 'Unknown User';
      const isSender = tx.fromUser?._id?.toString() === userId.toString();

      // Special handling for request type transactions
      if (tx.type === 'request') {
        const isRequestor = tx.toUser?._id?.toString() === userId.toString();
        return {
          type: 'request',
          amount: tx.amount || 0,
          description: isRequestor ?
            `Requested from ${fromUserName}` :
            `Request from ${toUserName}`,
          timestamp: tx.createdAt,
          status: tx.status || 'pending',
          otherParty: isRequestor ? fromUserName : toUserName,
          transactionId: tx._id,
          transactionType: tx.type,
          isRequestor: isRequestor,
          remarks: tx.remarks
        };
      }

      // Normal transactions
      return {
        type: isSender ? 'debit' : 'credit',
        amount: tx.amount || 0,
        description: tx.remarks ||
          (isSender ? `Sent to ${toUserName}` : `Received from ${fromUserName}`),
        timestamp: tx.createdAt,
        status: tx.status || 'pending',
        otherParty: isSender ? toUserName : fromUserName,
        transactionId: tx._id,
        transactionType: tx.type,
        remarks: tx.remarks
      };
    });

    res.status(200).json({
      success: true,
      transactions: formattedTransactions
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch transactions'
    });
  }
};

export const sendMoney = async (req, res) => {
  try {
    const { accountNumber, amount, remarks, pin, location } = req.body;
    const senderId = req.user.senderId;

    // Input validation
    if (!accountNumber || !amount || !pin) {
      throw new Error('Account number, amount and PIN are required');
    }

    const senderAccount = await Account.findOne({ user: senderId })
      .select('+transactionPin');
    const receiverAccount = await Account.findOne({ accountNumber });

    if (!senderAccount || !receiverAccount) {
      throw new Error('Invalid account details');
    }

    // Check if sender account is suspended
    if (senderAccount.status === 'suspended') {
      throw new Error('Your account is suspended. Cannot perform transactions.');
    }

    // Check if receiver account is suspended
    if (receiverAccount.status === 'suspended') {
      throw new Error('Recipient account is suspended. Cannot send money.');
    }

    if (senderAccount.accountNumber === accountNumber) {
      throw new Error('Cannot send money to your own account');
    }

    if (!senderAccount.isPinSet) {
      throw new Error('Please set your transaction PIN first');
    }

    const isPinValid = await comparePassword(pin, senderAccount.transactionPin);
    if (!isPinValid) {
      throw new Error('Invalid transaction PIN');
    }

    if (senderAccount.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const transaction = await Transaction.create({
      fromUser: senderId,
      toUser: receiverAccount.user,
      amount,
      type: 'send',
      status: 'approved',
      remarks,
      location: location || { latitude: 0, longitude: 0 }
    });

    // Update balances
    senderAccount.balance -= parseFloat(amount);
    receiverAccount.balance += parseFloat(amount);

    await Promise.all([
      senderAccount.save(),
      receiverAccount.save()
    ]);

    // Send notifications
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverAccount.user);

    await Promise.all([
      sendMail(
        sender.email,
        "Money Sent Successfully",
        "Transaction Alert",
        `<p>₹${amount} has been sent to account ${accountNumber}</p>`
      ),
      sendMail(
        receiver.email,
        "Money Received",
        "Transaction Alert",
        `<p>₹${amount} has been received from ${sender.fullName}</p>`
      )
    ]);

    res.status(200).json({
      success: true,
      message: 'Money sent successfully',
      transaction,
      newBalance: senderAccount.balance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const requestMoney = async (req, res) => {
  try {
    const { fromAccountNumber, amount, remarks } = req.body;
    const requestorId = req.user.senderId;

    // Input validation
    if (!fromAccountNumber || !amount) {
      throw new Error('Account number and amount are required');
    }

    const requestorAccount = await Account.findOne({ user: requestorId });
    const requestedAccount = await Account.findOne({ accountNumber: fromAccountNumber });

    if (!requestedAccount) {
      throw new Error('Requested account not found');
    }

    if (requestorAccount.accountNumber === fromAccountNumber) {
      throw new Error('Cannot request money from your own account');
    }

    // Create a new pending transaction for the request
    const transaction = await Transaction.create({
      fromUser: requestedAccount.user,  // Person who needs to pay
      toUser: requestorId,              // Person who requested
      amount: parseFloat(amount),
      type: 'request',                  // Using the new transaction type
      status: 'pending',
      remarks: remarks || 'Money request',
      location: req.body.location || { latitude: 0, longitude: 0 }
    });

    // Send notifications
    const requestedUser = await User.findById(requestedAccount.user);
    const requestor = await User.findById(requestorId);

    await Promise.all([
      sendMail(
        requestedUser.email,
        "Money Request Received",
        "Payment Request",
        `<p>${requestor.fullName} has requested ₹${amount} from you.
         Account: ${requestorAccount.accountNumber}</p>`
      ),
      sendSMS(
        requestedUser.phoneNumber,
        `FinFlow: ${requestor.fullName} has requested ₹${amount} from you.`
      )
    ]);

    res.status(200).json({
      success: true,
      message: 'Money request sent successfully',
      transaction,
      requestDetails: {
        requestedFrom: requestedUser.fullName,
        amount,
        status: 'pending'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const setTransactionPin = async (req, res) => {
  try {
    const { pin, confirmPin } = req.body;
    const userId = req.user.senderId;

    // Find user to get contact details
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!pin || !confirmPin) {
      throw new Error('PIN and confirmation PIN are required');
    }

    if (pin !== confirmPin) {
      throw new Error('PINs do not match');
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      throw new Error('PIN must be 4 digits');
    }

    const account = await Account.findOne({ user: userId });
    if (!account) {
      throw new Error('Account not found');
    }

    if (account.isPinSet) {
      throw new Error('PIN is already set');
    }

    const hashedPin = await hashedPassword(pin);
    account.transactionPin = hashedPin;
    account.isPinSet = true;
    await account.save();

    // Send notifications
    await Promise.all([
      sendMail(
        user.email,
        "Transaction PIN Set Successfully",
        "Security Alert",
        `<p>Your transaction PIN has been set successfully. If you didn't perform this action, please contact us immediately.</p>`
      ),
      sendSMS(
        user.phoneNumber,
        `FinFlow Bank: Your transaction PIN has been set successfully. If you didn't perform this action, please contact us immediately.`
      )
    ]);

    res.status(200).json({
      success: true,
      message: 'Transaction PIN set successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const changeTransactionPin = async (req, res) => {
  try {
    const { currentPin, newPin, confirmPin } = req.body;
    const userId = req.user.senderId;

    if (!currentPin || !newPin || !confirmPin) {
      throw new Error('All PIN fields are required');
    }

    if (newPin !== confirmPin) {
      throw new Error('New PINs do not match');
    }

    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      throw new Error('PIN must be 4 digits');
    }

    const user = await User.findById(userId);
    const account = await Account.findOne({ user: userId }).select('+transactionPin');
    if (!account) {
      throw new Error('Account not found');
    }

    const isPinValid = await comparePassword(currentPin, account.transactionPin);
    if (!isPinValid) {
      throw new Error('Current PIN is incorrect');
    }

    const hashedPin = await hashedPassword(newPin);
    account.transactionPin = hashedPin;
    await account.save();

    // Send notifications
    await Promise.all([
      sendMail(
        user.email,
        "Transaction PIN Changed Successfully",
        "Security Alert",
        `<p>Your transaction PIN has been changed successfully. If you didn't perform this action, please contact us immediately.</p>`
      ),
      sendSMS(
        user.phoneNumber,
        `FinFlow Bank: Your transaction PIN has been changed successfully. If you didn't perform this action, please contact us immediately.`
      )
    ]);

    res.status(200).json({
      success: true,
      message: 'Transaction PIN changed successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.senderId;

    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error('All password fields are required');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('New passwords do not match');
    }

    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    user.password = await hashedPassword(newPassword);
    await user.save();

    // Send notifications
    await Promise.all([
      sendMail(
        user.email,
        "Password Changed Successfully",
        "Security Alert",
        `<p>Your account password has been changed successfully. If you didn't perform this action, please contact us immediately.</p>`
      ),
      sendSMS(
        user.phoneNumber,
        `FinFlow Bank: Your account password has been changed successfully. If you didn't perform this action, please contact us immediately.`
      )
    ]);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const depositMoney = async (req, res) => {
  try {
    const { amount, cardInfo } = req.body;
    const userId = req.user.senderId;

    if (amount < 1) {
      throw new Error('Minimum deposit amount is ₹1');
    }

    const account = await Account.findOne({ user: userId });
    if (!account) {
      throw new Error('Account not found');
    }

    // Create transaction record with unique ID
    const transactionId = `DEP${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const transaction = await Transaction.create({
      fromUser: userId,
      amount,
      type: 'deposit',
      status: 'approved',
      remarks: `Card deposit (${cardInfo.lastFourDigits})`,
      location: req.body.location || { latitude: 0, longitude: 0 },
      transactionId
    });

    // Update account balance
    account.balance += amount;
    await account.save();

    // Send notification
    const user = await User.findById(userId);
    await Promise.all([
      sendMail(
        user.email,
        "Money Added Successfully",
        "Transaction Alert",
        `<p>₹${amount} has been added to your account via card (${cardInfo.lastFourDigits})</p>`
      ),
      sendSMS(
        user.phoneNumber,
        `FinFlow: ₹${amount} credited to your account via card (${cardInfo.lastFourDigits}). Balance: ₹${account.balance}`
      )
    ]);

    res.status(200).json({
      success: true,
      message: 'Money added successfully',
      transaction: {
        ...transaction.toObject(),
        transactionId
      },
      newBalance: account.balance // Add this line to return new balance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const handleRequestAction = async (req, res) => {
  try {
    const { transactionId, action, pin } = req.body;
    const userId = req.user.senderId;

    if (!transactionId || !action || !pin) {
      throw new Error('Missing required fields');
    }

    // Get the request transaction
    const transaction = await Transaction.findOne({
      _id: transactionId,
      type: 'request',
      status: 'pending',
      fromUser: userId
    });

    if (!transaction) {
      throw new Error('Invalid or expired request');
    }

    // Verify PIN
    const account = await Account.findOne({ user: userId })
      .select('+transactionPin');

    if (!account.isPinSet) {
      throw new Error('Please set your transaction PIN first');
    }

    const isPinValid = await comparePassword(pin, account.transactionPin);
    if (!isPinValid) {
      throw new Error('Invalid transaction PIN');
    }

    if (action === 'accept') {
      // Check balance
      if (account.balance < transaction.amount) {
        throw new Error('Insufficient balance');
      }

      // Get receiver's account
      const receiverAccount = await Account.findOne({ user: transaction.toUser });
      if (!receiverAccount) {
        throw new Error('Receiver account not found');
      }

      // Update balances
      account.balance -= transaction.amount;
      receiverAccount.balance += transaction.amount;

      // Update transaction status
      transaction.status = 'approved';

      await Promise.all([
        account.save(),
        receiverAccount.save(),
        transaction.save()
      ]);

      // Send notifications
      const sender = await User.findById(userId);
      const receiver = await User.findById(transaction.toUser);

      await Promise.all([
        sendMail(
          sender.email,
          "Payment Request Accepted",
          "Transaction Alert",
          `<p>You have sent ₹${transaction.amount} to ${receiver.fullName}</p>`
        ),
        sendMail(
          receiver.email,
          "Payment Request Completed",
          "Transaction Alert",
          `<p>₹${transaction.amount} received from ${sender.fullName}</p>`
        )
      ]);
    } else {
      // Reject request
      transaction.status = 'rejected';
      await transaction.save();

      // Send notification to requestor
      const receiver = await User.findById(transaction.toUser);
      await sendMail(
        receiver.email,
        "Payment Request Rejected",
        "Transaction Alert",
        `<p>Your payment request for ₹${transaction.amount} has been rejected</p>`
      );
    }

    res.status(200).json({
      success: true,
      message: `Request ${action}ed successfully`,
      newBalance: account?.balance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const updateAccountStatus = async (req, res) => {
  try {
    const { accountNumber, status } = req.body;
    const updatedAccount = await Account.findOneAndUpdate(
      { accountNumber },
      { status },
      { new: true }
    ).populate('user', 'email phoneNumber fullName');

    if (!updatedAccount) {
      throw new Error('Account not found');
    }

    // Send notifications
    await Promise.all([
      sendMail(
        updatedAccount.user.email,
        "Account Status Updated",
        "Account Alert",
        `<p>Your account status has been changed to ${status}. ${
          status === 'suspended'
            ? 'You cannot perform any transactions until your account is activated.'
            : 'Your account is now active and you can perform transactions.'
        }</p>`
      ),
      sendSMS(
        updatedAccount.user.phoneNumber,
        `FinFlow: Your account is now ${status}. ${
          status === 'suspended' ? 'Transactions disabled.' : 'Transactions enabled.'
        }`
      )
    ]);

    res.status(200).json({
      success: true,
      message: `Account ${status} successfully`,
      account: updatedAccount
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
