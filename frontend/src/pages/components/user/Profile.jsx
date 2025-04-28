import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { useSelector } from "react-redux";
import axiosClient from "../../../utils/axiosClient";
import LoadingButton from '../../../components/LoadingButton';

const Profile = () => {
  const { colors } = useContext(ThemeContext);
  const user = useSelector((state) => state.user.user);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  if (!user) return <div style={{ color: colors.text }}>Loading...</div>;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <h2 className="text-3xl font-semibold mb-6" style={{ color: colors.primaryDark }}>
        Profile Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Photo and Quick Actions */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: colors.card }}>
            <div className="relative inline-block">
              <img
                src={user.photoUrl}
                alt={user.fullName}
                className="w-32 h-32 rounded-xl object-cover border-2 mx-auto"
                style={{ borderColor: colors.primary }}
              />
              {user.isVerified && (
                <div
                  className="absolute -bottom-2 right-0 text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: colors.card,
                    border: `2px solid ${colors.success}`,
                    color: colors.success
                  }}
                >
                  Verified
                </div>
              )}
            </div>
            <h3 className="mt-4 text-xl font-semibold" style={{ color: colors.text }}>
              {user.fullName}
            </h3>
            <p className="text-sm" style={{ color: colors.text + '80' }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>

          {user.role === 'user' && (
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.card }}>
              <h4 className="font-medium mb-3" style={{ color: colors.text }}>Account Details</h4>
              <div className="space-y-2">
                <p style={{ color: colors.text + '90' }}>
                  <span className="text-sm">Account Number:</span>
                  <br />
                  <span className="font-medium">{user.accountNumber}</span>
                </p>
                <p style={{ color: colors.text + '90' }}>
                  <span className="text-sm">Balance:</span>
                  <br />
                  <span className="font-medium">₹{user.balance?.toLocaleString()}</span>
                </p>
                <p style={{ color: colors.text + '90' }}>
                  <span className="text-sm">Status:</span>
                  <br />
                  <span
                    className="font-medium"
                    style={{ color: user.status === 'active' ? colors.success : colors.warning }}
                  >
                    {user.status || 'Inactive'}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Personal Information */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-4 rounded-xl" style={{ backgroundColor: colors.card }}>
            <h4 className="font-medium mb-4" style={{ color: colors.text }}>Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Full Name</p>
                <p className="font-medium" style={{ color: colors.text }}>{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Father's Name</p>
                <p className="font-medium" style={{ color: colors.text }}>{user.fatherName}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Email</p>
                <p className="font-medium" style={{ color: colors.text }}>{user.email}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Phone Number</p>
                <p className="font-medium" style={{ color: colors.text }}>{user.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Date of Birth</p>
                <p className="font-medium" style={{ color: colors.text }}>
                  {formatDate(user.dob)}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text + '80' }}>PAN</p>
                <p className="font-medium" style={{ color: colors.text }}>{user.pan}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ backgroundColor: colors.card }}>
            <h4 className="font-medium mb-4" style={{ color: colors.text }}>Account Security</h4>
            <div className="space-y-3">
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="w-full p-3 rounded-lg text-center font-medium"
                style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
              >
                Change Password
              </button>
              <button
                onClick={() => setShowPinModal(true)}
                className="w-full p-3 rounded-lg text-center font-medium"
                style={{ backgroundColor: colors.warning + '20', color: colors.warning }}
              >
                {user.isPinSet ? 'Change Transaction PIN' : 'Set Transaction PIN'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        isPinSet={user.isPinSet}
        colors={colors}
      />
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        colors={colors}
      />
    </motion.div>
  );
};

const PinModal = ({ isOpen, onClose, isPinSet, colors }) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const endpoint = isPinSet ? '/users/change-pin' : '/users/set-pin';
      const payload = isPinSet
        ? { currentPin, newPin, confirmPin }
        : { pin: newPin, confirmPin };

      const response = await axiosClient.post(endpoint, payload);
      console.log('PIN update response:', response.data);
      onClose();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update PIN');
      console.error('PIN update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg w-full max-w-md" style={{ backgroundColor: colors.card }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
          {isPinSet ? 'Change Transaction PIN' : 'Set Transaction PIN'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isPinSet && (
            <input
              type="password"
              placeholder="Current PIN"
              maxLength={4}
              value={currentPin}
              onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ''))}
              className="w-full p-3 rounded-md border"
              style={{ backgroundColor: colors.background, color: colors.text }}
            />
          )}
          <input
            type="password"
            placeholder="New PIN"
            maxLength={4}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
            className="w-full p-3 rounded-md border"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            type="password"
            placeholder="Confirm PIN"
            maxLength={4}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
            className="w-full p-3 rounded-md border"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          {error && (
            <p className="text-sm" style={{ color: colors.danger }}>{error}</p>
          )}
          <div className="flex gap-4">
            <LoadingButton
              isLoading={isLoading}
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-md text-white"
              style={{ backgroundColor: colors.primary }}
              loadingText="Setting PIN..."
            >
              Confirm
            </LoadingButton>
            <LoadingButton
              isLoading={isLoading}
              onClick={onClose}
              className="flex-1 py-3 rounded-md"
              style={{ backgroundColor: colors.danger + '20', color: colors.danger }}
              disabled={isLoading}
            >
              Cancel
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChangePasswordModal = ({ isOpen, onClose, colors }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axiosClient.post('/users/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      });
      console.log('Password update response:', response.data);
      onClose();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update password');
      console.error('Password update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg w-full max-w-md" style={{ backgroundColor: colors.card }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
          Change Password
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-3 rounded-md border"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-md border"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-md border"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          {error && (
            <p className="text-sm" style={{ color: colors.danger }}>{error}</p>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-md text-white flex items-center justify-center"
              style={{
                backgroundColor: colors.primary,
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <FiLoader className="animate-spin mr-2" />
              ) : null}
              {isLoading ? 'Processing...' : 'Update Password'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 rounded-md"
              style={{
                backgroundColor: colors.danger + '20',
                color: colors.danger,
                opacity: isLoading ? 0.7 : 1
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
