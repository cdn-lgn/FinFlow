import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaSync } from "react-icons/fa";
import { updateBalance } from "../../redux/userSlice";
import axiosClient from "../../utils/axiosClient";

const DashboardProfile = () => {
  const { colors } = useContext(ThemeContext);
  const user = useSelector((state) => state.user.user);

  if (!user) return <p style={{ color: colors.text }}>Loading...</p>;

  const UserAccountDetails = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dispatch = useDispatch();

    const refreshBalance = async () => {
      setIsRefreshing(true);
      try {
        const response = await axiosClient.get('/users/account-stats');
        if (response.data.success) {
          dispatch(updateBalance(response.data.balance));
        }
      } catch (error) {
        console.error('Error refreshing balance:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    return (
      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.background  , color: colors.text  }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primaryDark }}>
          Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
            <p className="text-sm" style={{ color: colors.primary }}>Account Number</p>
            <p className="text-lg font-semibold">{user.accountNumber || 'N/A'}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
            <div className="flex justify-between items-center">
              <p className="text-sm" style={{ color: colors.primary }}>Balance</p>
              <button
                onClick={refreshBalance}
                className={`p-2 rounded-full transition-all ${isRefreshing ? 'animate-spin' : 'hover:bg-opacity-10'}`}
                style={{ backgroundColor: colors.primary + '10' }}
                disabled={isRefreshing}
              >
                <FaSync size={16} style={{ color: colors.primary }} />
              </button>
            </div>
            <p className="text-lg font-semibold">₹{user.balance?.toLocaleString() || '0'}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
            <p className="text-sm" style={{ color: colors.primary }}>Account Status</p>
            <p className="text-lg font-semibold" style={{ color: user.status === 'active' ? colors.success : colors.warning }}>
              {user.status || 'Inactive'}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
            <p className="text-sm" style={{ color: colors.primary }}>Last Transaction</p>
            <p className="text-lg font-semibold">{user.lastTransaction || 'No transactions'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-xl shadow-lg overflow-hidden"
      style={{ backgroundColor: colors.card }}
    >
      <div className="p-6">
        {user.lastLoginLocation && (
          <div className="mb-4 flex items-center gap-2 text-sm"
               style={{ color: colors.text + '80' }}>
            <FaMapMarkerAlt />
            <span>Last login from: {user.lastLoginLocation.latitude.toFixed(4)},
                  {user.lastLoginLocation.longitude.toFixed(4)}</span>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative">
            <img
              src={user.photoUrl}
              alt={user.fullName}
              className="w-32 h-32 rounded-xl object-cover border-2"
              style={{ borderColor: colors.primary }}
            />
            <div className="absolute -top-2 -right-2 rounded-full p-2"
              style={{ backgroundColor: colors.card }}>
              {user.isVerified ? (
                <FaCheckCircle size={24} style={{ color: colors.success }} />
              ) : (
                <FaTimesCircle size={24} style={{ color: colors.warning }} />
              )}
            </div>
          </div>

          <div className="flex-grow" style={{ color: colors.text }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.primaryDark }}>
                {user.fullName}
              </h2>
              <span className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: colors.primary + '15',
                  color: colors.primary
                }}>
                {user.role.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ color: colors.text }}>
              <div>
                <p className="text-sm" style={{ color: colors.text }}>Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text }}>Phone</p>
                <p className="font-medium">{user.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text }}>Father's Name</p>
                <p className="font-medium">{user.fatherName}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text }}>Date of Birth</p>
                <p className="font-medium">{new Date(user.dob).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {user.role === 'user' && <UserAccountDetails />}
      </div>
    </motion.div>
  );
};

export default DashboardProfile;
