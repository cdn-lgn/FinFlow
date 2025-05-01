import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaCreditCard, FaTimes } from 'react-icons/fa';
import axiosClient from '../../../utils/axiosClient';
import LoadingButton from '../LoadingButton';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../../../redux/userSlice';

const CardDepositModal = ({ isOpen, onClose, onSuccess }) => {
  const { colors } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    amount: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate card details (basic validation)
      if (!cardDetails.number.match(/^\d{16}$/)) {
        throw new Error('Invalid card number');
      }
      if (!cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
        throw new Error('Invalid expiry date (MM/YY)');
      }
      if (!cardDetails.cvv.match(/^\d{3}$/)) {
        throw new Error('Invalid CVV');
      }
      if (cardDetails.amount < 1) {
        throw new Error('Minimum deposit amount is ₹1');
      }

      const response = await axiosClient.post('/users/deposit', {
        amount: parseFloat(cardDetails.amount),
        cardInfo: {
          lastFourDigits: cardDetails.number.slice(-4)
        }
      });

      if (response.data.success) {
        // Update Redux store with new balance
        dispatch(updateBalance(response.data.newBalance));
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg"
          style={{ color: colors.text }}
        >
          <FaTimes />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
               style={{ backgroundColor: colors.primary + '20' }}>
            <FaCreditCard size={24} style={{ color: colors.primary }} />
          </div>
          <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
            Add Money via Card
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={(e) => setCardDetails(prev => ({
                ...prev,
                number: e.target.value.replace(/\D/g, '').slice(0, 16)
              }))}
              className="w-full p-3 rounded-lg border"
              style={{ backgroundColor: colors.background, color: colors.text }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                setCardDetails(prev => ({ ...prev, expiry: value }));
              }}
              maxLength="5"
              className="p-3 rounded-lg border"
              style={{ backgroundColor: colors.background, color: colors.text }}
            />
            <input
              type="text"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails(prev => ({
                ...prev,
                cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
              }))}
              className="p-3 rounded-lg border"
              style={{ backgroundColor: colors.background, color: colors.text }}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Amount (₹)"
              value={cardDetails.amount}
              onChange={(e) => setCardDetails(prev => ({
                ...prev,
                amount: e.target.value
              }))}
              min="1"
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
            loadingText="Processing..."
          >
            Add Money
          </LoadingButton>
        </form>
      </motion.div>
    </div>
  );
};

export default CardDepositModal;
