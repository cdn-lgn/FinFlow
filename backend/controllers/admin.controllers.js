import { User } from "../models/user.models.js";
import { Account } from "../models/account.models.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const activeUsers = await Account.countDocuments({ status: "active" });
    const employeeCount = await User.countDocuments({ role: "employee" });

    // Get recent activities (last 5)
    const recentActivities = await User.find({
      $or: [
        { role: { $in: ["employee", "admin"] } },
        { isVerified: true }
      ]
    })
    .select('fullName role createdAt verifiedAt')
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

    res.status(200).json({
      totalUsers,
      activeUsers,
      employeeCount,
      pendingIssues: 0, // Implement based on your needs
      recentActivities: recentActivities.map(activity => ({
        action: activity.verifiedAt ? "User Verified" : "Account Created",
        performedBy: activity.fullName,
        timestamp: activity.verifiedAt || activity.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -createdLocation')
      .lean();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    ).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    // Implement based on your requirements
    res.status(200).json({ message: "Settings updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
