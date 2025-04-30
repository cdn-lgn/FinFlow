import { User } from "../models/user.models.js";
import { Account } from "../models/account.models.js";
import { Transaction } from "../models/transaction.models.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Get active users count
    const activeUsers = await Account.countDocuments({ status: 'active' });

    // Get employee count
    const employeeCount = await User.countDocuments({ role: 'employee' });

    // Get pending issues/requests count
    const pendingIssues = await Transaction.countDocuments({
      type: 'request',
      status: 'pending'
    });

    // Get recent transactions
    const recentTransactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('fromUser toUser', 'fullName')
      .lean()
      .then(transactions => transactions.map(tx => ({
        type: tx.type,
        amount: tx.amount,
        description: tx.remarks || `${tx.type} transaction`,
        timestamp: tx.createdAt,
        performedBy: tx.fromUser?.fullName || 'Unknown',
        recipient: tx.toUser?.fullName || 'Unknown'
      })));

    res.status(200).json({
      totalUsers,
      activeUsers,
      employeeCount,
      pendingIssues,
      recentTransactions // Send transactions as activities
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate({
        path: 'account',
        select: 'balance status accountNumber'
      })
      .lean();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!['user', 'employee'].includes(role)) {
      throw new Error('Invalid role');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSystemStats = async (req, res) => {
  try {
    const stats = {
      transactions: {
        total: await Transaction.countDocuments(),
        pending: await Transaction.countDocuments({ status: 'pending' }),
        completed: await Transaction.countDocuments({ status: 'approved' })
      },
      users: {
        total: await User.countDocuments(),
        verified: await User.countDocuments({ isVerified: true }),
        unverified: await User.countDocuments({ isVerified: false })
      },
      accounts: {
        total: await Account.countDocuments(),
        active: await Account.countDocuments({ status: 'active' }),
        suspended: await Account.countDocuments({ status: 'suspended' })
      }
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSystemSettings = async (req, res) => {
  // For future implementation
  // Things like:
  // - Transaction limits
  // - System maintenance mode
  // - Notification settings
  res.status(501).json({ message: 'Not implemented yet' });
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' })
      .select('fullName email phoneNumber photoUrl isVerified createdAt')
      .lean();

    const employeesWithStats = await Promise.all(employees.map(async (emp) => {
      const verificationCount = await User.countDocuments({
        verifiedBy: emp._id,
        isVerified: true
      });

      return {
        ...emp,
        verificationCount,
        status: 'active'
      };
    }));

    res.status(200).json({
      success: true,
      employees: employeesWithStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const {
      fullName,
      fatherName,
      email,
      mobile,
      password,
      dob,
      pan,
      addressLine,
      city,
      pincode,
    } = req.body;

    if (!req.file) {
      throw new Error("Profile photo is required");
    }

    // Upload profile photo
    const uploadPhoto = await imageKit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}_${fullName}`,
      folder: "finflow/employeeProfile",
    });

    // Create employee with role='employee'
    const employee = await User.create({
      fullName: fullName.toLowerCase(),
      fatherName: fatherName.toLowerCase(),
      email,
      phoneNumber: mobile,
      password: await hashedPassword(password),
      dob,
      pan,
      role: 'employee',
      photoUrl: uploadPhoto.url,
      isVerified: true, // Employees are verified by default
      address: {
        addressLine: addressLine.toLowerCase(),
        city: city.toLowerCase(),
        country: 'India',
        pincode,
      }
    });

    // Send welcome email
    await sendMail(
      email,
      "Welcome to FinFlow Bank",
      "Employee Account Created",
      `<p>Your employee account has been created successfully. Login credentials:<br>
       Email: ${email}<br>
       Password: ${password}</p>`
    );

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      employee: {
        fullName: employee.fullName,
        email: employee.email,
        role: employee.role
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const getEmployeeDetails = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await User.findById(employeeId)
      .select('-password')
      .lean();

    if (!employee) {
      throw new Error('Employee not found');
    }

    // Get verification stats
    const verifiedUsers = await User.find({
      verifiedBy: employeeId,
      isVerified: true
    })
    .select('fullName email createdAt')
    .lean();

    res.status(200).json({
      success: true,
      employee: {
        ...employee,
        stats: {
          totalVerifications: verifiedUsers.length,
          recentVerifications: verifiedUsers.slice(0, 5)
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
