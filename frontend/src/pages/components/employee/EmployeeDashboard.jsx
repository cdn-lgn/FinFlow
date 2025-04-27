import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import DashboardProfile from '../DashboardProfile';
import axiosClient from '../../../utils/axiosClient';
import dayjs from 'dayjs';

const EmployeeDashboard = () => {
  const { colors } = useContext(ThemeContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerifications: 0,
    activeAccounts: 0,
    recentVerifications: []
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axiosClient.get('/users/dashboard-stats'); // Updated path
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchDashboardStats();
  }, []);

  const StatCard = ({ title, value, color }) => (
    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
      <h3 className="text-sm mb-2" style={{ color: colors.text + '80' }}>{title}</h3>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <DashboardProfile />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color={colors.primary}
        />
        <StatCard
          title="Pending Verifications"
          value={stats.pendingVerifications}
          color={colors.warning}
        />
        <StatCard
          title="Active Accounts"
          value={stats.activeAccounts}
          color={colors.success}
        />
      </div>

      <div className="rounded-lg p-4" style={{ backgroundColor: colors.card }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primaryDark }}>
          Recent Verifications
        </h3>
        <div className="space-y-2">
          {stats.recentVerifications.map((verification, index) => (
            <div
              key={index}
              className="p-3 rounded-lg flex items-center justify-between"
              style={{ backgroundColor: colors.background }}
            >
              <div>
                <p className="font-medium">{verification.userName}</p>
                <p className="text-sm" style={{ color: colors.text + '80' }}>
                  {verification.email}
                </p>
              </div>
              <p className="text-sm" style={{ color: colors.text + '60' }}>
                {dayjs(verification.verifiedAt).format('DD MMM YYYY, HH:mm')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
