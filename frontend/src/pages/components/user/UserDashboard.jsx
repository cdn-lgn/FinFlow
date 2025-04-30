import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import DashboardProfile from '../DashboardProfile';
import axiosClient from '../../../utils/axiosClient';
import { FaMoneyBillWave, FaExchangeAlt, FaCreditCard, FaArrowRight } from 'react-icons/fa';
import dayjs from 'dayjs';
import SendMoneyModal from '../../../components/SendMoneyModal';
import RequestMoneyModal from '../../../components/RequestMoneyModal';
import CardDepositModal from '../../../components/CardDepositModal';
import { useSelector } from 'react-redux';

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
    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
      Recent Transactions
    </h3>
    {transactions.length === 0 ? (
      <p className="text-center py-4" style={{ color: colors.text }}>
        No recent transactions
      </p>
    ) : (
      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div>
              <p className="font-medium">
                {tx.type === 'credit' ? 'Received' : 'Sent'} ₹{tx.amount.toLocaleString()}
              </p>
              <p className="text-sm">
                {tx.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: tx.type === 'credit' ? colors.success : colors.danger }}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
              </p>
              <p className="text-xs">
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
  const user = useSelector(state => state.user.user);  // Move useSelector here
  const [accountStats, setAccountStats] = useState({
    balance: 0,
    recentTransactions: [],
  });
  const [showSendModal, setShowSendModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCardDeposit, setShowCardDeposit] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '' });

  const fetchAccountStats = async () => {
    try {
      const response = await axiosClient.get('/users/account-stats');  // Changed back to /users/
      setAccountStats(response.data);
    } catch (error) {
      console.error('Error fetching account stats:', error);
    }
  };

  useEffect(() => {
    fetchAccountStats();
  }, []);

  const handleTransactionSuccess = () => {
    fetchAccountStats();
  };

  const handleActionClick = (action) => {
    if (user.status === 'suspended') {
      setAlert({
        show: true,
        message: 'Your account is suspended. Please contact support.'
      });
      return;
    }

    switch(action) {
      case 'send':
        setShowSendModal(true);
        break;
      case 'request':
        setShowRequestModal(true);
        break;
      case 'deposit':
        setShowCardDeposit(true);
        break;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardProfile />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          icon={<FaMoneyBillWave />}
          title="Send Money"
          description="Transfer to another account"
          color={colors.primary}
          onClick={() => handleActionClick('send')}
        />
        <QuickActionCard
          icon={<FaExchangeAlt />}
          title="Request Money"
          description="Request payment from others"
          color={colors.warning}
          onClick={() => handleActionClick('request')}
        />
        <QuickActionCard
          icon={<FaCreditCard />}
          title="Add Money"
          description="Deposit via card"
          color={colors.success}
          onClick={() => handleActionClick('deposit')}
        />
      </div>

      <RecentTransactions
        transactions={accountStats.recentTransactions}
        colors={colors}
      />

      {/* Simple Alert */}
      {alert.show && (
        <div
          className="fixed top-4 right-4 p-4 rounded-lg shadow-lg"
          style={{
            backgroundColor: colors.danger + '20',
            color: colors.danger,
            border: `1px solid ${colors.danger}`
          }}
        >
          <p>{alert.message}</p>
          <button
            onClick={() => setAlert({ show: false, message: '' })}
            className="absolute top-1 right-1 p-1"
          >
            ✕
          </button>
        </div>
      )}

      <SendMoneyModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        onSuccess={handleTransactionSuccess}
      />

      <RequestMoneyModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSuccess={handleTransactionSuccess}
      />

      <CardDepositModal
        isOpen={showCardDeposit}
        onClose={() => setShowCardDeposit(false)}
        onSuccess={handleTransactionSuccess}
      />
    </div>
  );
};

export default UserDashboard;
