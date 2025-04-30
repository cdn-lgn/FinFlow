import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import LoadingButton from './LoadingButton';
import axiosClient from '../utils/axiosClient';

const RequestActionModal = ({ request, onClose, onSuccess }) => {
  const { colors } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleAction = async (action) => {
    if (!pin) {
      setError('PIN is required');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const response = await axiosClient.post('/users/request-action', {
        transactionId: request.transactionId,
        action,
        pin
      });

      if (response.data.success) {
        // Update local state/redux if needed with new balance
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Action failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-6 rounded-xl relative"
        style={{ backgroundColor: colors.card }}
      >
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>
          Money Request from {request.otherParty}
        </h3>

        <div className="space-y-4 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: colors.primary }}>
              ₹{request.amount.toLocaleString()}
            </p>
            <p className="text-sm mt-1" style={{ color: colors.text + '80' }}>
              {request.remarks || 'No remarks'}
            </p>
          </div>

          <input
            type="password"
            placeholder="Enter Transaction PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength="4"
            className="w-full p-3 rounded-lg border"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />

          {error && (
            <p className="text-sm" style={{ color: colors.danger }}>{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <LoadingButton
            onClick={() => handleAction('reject')}
            isLoading={isLoading}
            className="flex-1 py-3 rounded-lg flex items-center justify-center gap-2"
            style={{ backgroundColor: colors.danger + '20', color: colors.danger }}
          >
            <FaTimesCircle />
            Reject
          </LoadingButton>

          <LoadingButton
            onClick={() => handleAction('accept')}
            isLoading={isLoading}
            className="flex-1 py-3 rounded-lg flex items-center justify-center gap-2"
            style={{ backgroundColor: colors.success + '20', color: colors.success }}
          >
            <FaCheckCircle />
            Accept
          </LoadingButton>
        </div>
      </motion.div>
    </div>
  );
};

export default RequestActionModal;
