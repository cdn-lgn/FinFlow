import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaMoneyBillWave, FaTimes, FaDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import dayjs from 'dayjs';

const TransactionModal = ({ transaction, onClose, onAction }) => {
  const { colors } = useContext(ThemeContext);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);

  if (!transaction) {
    return null;
  }

  const handlePrint = () => {
    const printContent = `
      FinFlow Bank Transaction Receipt
      --------------------------------
      Amount: ₹${transaction.amount?.toLocaleString() || 0}
      Type: ${transaction.type === 'credit' ? 'Received' : 'Sent'}
      ${transaction.otherParty ? `Party: ${transaction.otherParty}` : ''}
      Status: ${transaction.status || 'N/A'}
      Transaction ID: ${transaction._id || 'N/A'}
      Date: ${dayjs(transaction.timestamp).format('DD MMM YYYY, HH:mm')}
      ${transaction.remarks ? `Remarks: ${transaction.remarks}` : ''}
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Transaction Receipt</title>
          <style>
            body { font-family: monospace; padding: 20px; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <pre>${printContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleActionWithPin = async (action) => {
    if (!pin) {
      setError('Please enter PIN');
      return;
    }
    try {
      await axiosClient.post('/users/request-action', {
        transactionId: transaction._id,
        action,
        pin
      });
      onAction?.();
      onClose();
    } catch (error) {
      setError(error.response?.data?.error || 'Action failed');
    }
  };

  const handleAction = async (action) => {
    onAction?.(transaction._id, action);
  };

  const txType = transaction?.type || 'debit';
  const txAmount = transaction?.amount?.toLocaleString() || '0';
  const txStatus = transaction?.status || 'pending';
  const txOtherParty = transaction?.otherParty || 'Unknown';

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
          <div className="mb-4">
            <div
              className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
              style={{
                backgroundColor: txType === 'credit' ? colors.success + '20' : colors.danger + '20',
                color: txType === 'credit' ? colors.success : colors.danger
              }}
            >
              <FaMoneyBillWave size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
            ₹{txAmount}
          </h3>
          <p style={{ color: colors.text + '80' }}>
            {txType === 'credit' ? 'Received from' : 'Sent to'} {txOtherParty}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span style={{ color: colors.text + '80' }}>Status</span>
            <span className="px-2 py-1 rounded-full text-sm"
              style={{
                backgroundColor: txStatus === 'approved' ? colors.success + '20' : colors.warning + '20',
                color: txStatus === 'approved' ? colors.success : colors.warning
              }}>
              {txStatus}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: colors.text + '80' }}>Transaction ID</span>
            <span style={{ color: colors.text }}>{transaction._id || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: colors.text + '80' }}>Date & Time</span>
            <span style={{ color: colors.text }}>
              {dayjs(transaction.timestamp).format('DD MMM YYYY, HH:mm')}
            </span>
          </div>
          {transaction.remarks && (
            <div className="flex justify-between">
              <span style={{ color: colors.text + '80' }}>Remarks</span>
              <span style={{ color: colors.text }}>{transaction.remarks}</span>
            </div>
          )}
        </div>

        <div className="space-y-4 mt-6">
          {transaction.type === 'request' && transaction.status === 'pending' && (
            showPinInput ? (
              <div className="space-y-4">
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
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPinInput(false)}
                    className="flex-1 py-3 px-4 rounded-lg"
                    style={{
                      backgroundColor: 'transparent',
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleActionWithPin(transaction.actionType)}
                    className="flex-1 py-3 px-4 rounded-lg"
                    style={{
                      backgroundColor: transaction.actionType === 'accept' ? colors.success : colors.danger,
                      color: 'white'
                    }}
                  >
                    Confirm {transaction.actionType === 'accept' ? 'Accept' : 'Reject'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowPinInput(true);
                    transaction.actionType = 'reject';
                  }}
                  className="flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: colors.danger + '20',
                    color: colors.danger,
                    border: `1px solid ${colors.danger}`
                  }}
                >
                  <FaTimesCircle />
                  Reject
                </button>
                <button
                  onClick={() => {
                    setShowPinInput(true);
                    transaction.actionType = 'accept';
                  }}
                  className="flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: colors.success + '20',
                    color: colors.success,
                    border: `1px solid ${colors.success}`
                  }}
                >
                  <FaCheckCircle />
                  Accept
                </button>
              </div>
            )
          )}

          {transaction.status === 'approved' && (
            <button
              onClick={handlePrint}
              className="w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors hover:opacity-80"
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                border: `1px solid ${colors.primary}`
              }}
            >
              <FaDownload />
              Download Receipt
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 mt-2"
            style={{
              backgroundColor: 'transparent',
              color: colors.text,
              border: `1px solid ${colors.border}`
            }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionModal;
