import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import DashboardProfile from '../DashboardProfile';
import axiosClient from '../../../utils/axiosClient';
import { FaMoneyBillWave, FaExchangeAlt, FaCreditCard, FaArrowRight } from 'react-icons/fa';
import dayjs from 'dayjs';

const QuickActionCard = ({ icon: Icon, title, description, color, onClick }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg cursor-pointer"
      style={{ backgroundColor: colors.card }}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: color + '15', color }}>
          {Icon}
        </div>
        <div>
          <h3 className="font-medium" style={{ color: colors.text }}>{title}</h3>
          <p className="text-sm" style={{ color: colors.text + '80' }}>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const RecentTransactions = ({ transactions = [], colors }) => (
  <div className="rounded-lg p-4" style={{ backgroundColor: colors.card }}>
    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primaryDark }}>
      Recent Transactions
    </h3>
    {transactions.length === 0 ? (
      <p className="text-center py-4" style={{ color: colors.text + '80' }}>
        No recent transactions
      </p>
    ) : (
      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: colors.background }}
          >
            <div>
              <p className="font-medium" style={{ color: colors.text }}>
                {tx.type === 'credit' ? 'Received' : 'Sent'} ₹{tx.amount.toLocaleString()}
              </p>
              <p className="text-sm" style={{ color: colors.text + '80' }}>
                {tx.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: tx.type === 'credit' ? colors.success : colors.danger }}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
              </p>
              <p className="text-xs" style={{ color: colors.text + '60' }}>
                {dayjs(tx.timestamp).format('DD MMM, HH:mm')}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const UserDashboard = () => {
  const { colors } = useContext(ThemeContext);
  const [accountStats, setAccountStats] = useState({
    balance: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchAccountStats = async () => {
      try {
        const response = await axiosClient.get('/users/account-stats'); // Changed back to /users/
        setAccountStats(response.data);
      } catch (error) {
        console.error('Error fetching account stats:', error);
      }
    };
    fetchAccountStats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <DashboardProfile />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          icon={<FaMoneyBillWave />}
          title="Send Money"
          description="Transfer to another account"
          color={colors.primary}
        />
        <QuickActionCard
          icon={<FaExchangeAlt />}
          title="Request Money"
          description="Request payment from others"
          color={colors.warning}
        />
        <QuickActionCard
          icon={<FaCreditCard />}
          title="Cards"
          description="Manage your cards"
          color={colors.success}
        />
      </div>

      <RecentTransactions
        transactions={accountStats.recentTransactions}
        colors={colors}
      />
    </div>
  );
};

export default UserDashboard;
