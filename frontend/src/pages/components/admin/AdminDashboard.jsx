import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import axiosClient from '../../../utils/axiosClient';
import DashboardProfile from '../DashboardProfile';
import { FaUsers, FaUserCheck, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

const AdminDashboard = () => {
  const { colors } = useContext(ThemeContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    employeeCount: 0,
    pendingIssues: 0,
    recentActivities: []
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await axiosClient.get('/admin/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };
    fetchAdminStats();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
      <div className="flex items-center gap-3 mb-2">
        <Icon size={20} style={{ color }} />
        <h3 style={{ color: colors.text + '80' }}>{title}</h3>
      </div>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <DashboardProfile />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={FaUsers}
          title="Total Users"
          value={stats.totalUsers}
          color={colors.primary}
        />
        <StatCard
          icon={FaUserCheck}
          title="Active Users"
          value={stats.activeUsers}
          color={colors.success}
        />
        <StatCard
          icon={FaChartLine}
          title="Employees"
          value={stats.employeeCount}
          color={colors.warning}
        />
        <StatCard
          icon={FaExclamationTriangle}
          title="Pending Issues"
          value={stats.pendingIssues}
          color={colors.danger}
        />
      </div>

      {/* Recent Activities */}
      <div className="rounded-lg p-4" style={{ backgroundColor: colors.card }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primaryDark }}>
          Recent Activities
        </h3>
        <div className="space-y-2">
          {stats.recentActivities.map((activity, index) => (
            <div key={index} className="p-3 rounded-lg flex items-center justify-between"
                 style={{ backgroundColor: colors.background }}>
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm" style={{ color: colors.text + '80' }}>
                  by {activity.performedBy}
                </p>
              </div>
              <p className="text-sm" style={{ color: colors.text + '60' }}>
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
