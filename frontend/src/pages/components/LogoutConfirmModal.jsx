import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

const LogoutConfirmModal = ({ onConfirm, onCancel }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-[90%] max-w-md"
        style={{ backgroundColor: colors.card }}
      >
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primaryDark }}>
          Confirm Logout
        </h3>
        <p className="mb-6" style={{ color: colors.text }}>
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              backgroundColor: colors.card,
              color: colors.text,
              border: `1px solid ${colors.border}`
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: colors.gradient }}
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LogoutConfirmModal;
