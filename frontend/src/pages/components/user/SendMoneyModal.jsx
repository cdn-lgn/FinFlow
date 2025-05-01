import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaMoneyBill, FaTimes } from 'react-icons/fa';
import LoadingButton from '../LoadingButton';
import axiosClient from '../../../utils/axiosClient';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../../../redux/userSlice';

const SendMoneyModal = ({ isOpen, onClose, onSuccess }) => {
  const { colors } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    remarks: '',
    pin: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axiosClient.post('/users/send', {
        ...formData,
        amount: parseFloat(formData.amount)
      });

      if (response.data.success) {
        dispatch(updateBalance(response.data.newBalance));
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send money');
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
          Send Money
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Recipient Account Number"
              value={formData.accountNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                accountNumber: e.target.value
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

          <div>
            <input
              type="password"
              placeholder="Transaction PIN"
              value={formData.pin}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pin: e.target.value
              }))}
              maxLength="4"
              className="w-full p-3 rounded-lg border"
              style={{ backgroundColor: colors.background, color: colors.text }}
              required
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
            loadingText="Sending..."
          >
            Send Money
          </LoadingButton>
        </form>
      </motion.div>
    </div>
  );
};

export default SendMoneyModal;
