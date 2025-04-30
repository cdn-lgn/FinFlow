import React, { useContext, useEffect, useState } from 'react';
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
    pendingIssues: 0
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await axiosClient.get('/admin/dashboard-stats');
        setStats({
          ...response.data
        });
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
    </div>
  );
};

export default AdminDashboard;
