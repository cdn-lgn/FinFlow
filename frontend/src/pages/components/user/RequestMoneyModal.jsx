import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaMoneyBill, FaTimes } from 'react-icons/fa';
import LoadingButton from '../LoadingButton';
import axiosClient from '../../../utils/axiosClient';
import { useSelector } from 'react-redux';

const RequestMoneyModal = ({ isOpen, onClose, onSuccess }) => {
  const { colors } = useContext(ThemeContext);
  const user = useSelector(state => state.user.user);
  const [formData, setFormData] = useState({
    fromAccountNumber: '',
    amount: '',
    remarks: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axiosClient.post('/users/request', {
        ...formData,
        amount: parseFloat(formData.amount),
        requestorAccountNumber: user.accountNumber
      });

      if (response.data.success) {
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send request');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-6 rounded-xl relative"
        style={{ backgroundColor: colors.card }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <FaTimes />
        </button>

        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>
          Request Money
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="From Account Number"
              value={formData.fromAccountNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                fromAccountNumber: e.target.value
              }))}
              className="w-full p-3 rounded-lg border"
              style={{ backgroundColor: colors.background, color: colors.text }}
              required
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Amount (₹)"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                amount: e.target.value
              }))}
              min="1"
              className="w-full p-3 rounded-lg border"
              style={{ backgroundColor: colors.background, color: colors.text }}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Remarks (optional)"
              value={formData.remarks}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                remarks: e.target.value
              }))}
              className="w-full p-3 rounded-lg border"
              style={{ backgroundColor: colors.background, color: colors.text }}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: colors.danger }}>{error}</p>
          )}

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            className="w-full py-3 rounded-lg text-white"
            style={{ backgroundColor: colors.primary }}
            loadingText="Sending request..."
          >
            Request Money
          </LoadingButton>
        </form>
      </motion.div>
    </div>
  );
};

export default RequestMoneyModal;
