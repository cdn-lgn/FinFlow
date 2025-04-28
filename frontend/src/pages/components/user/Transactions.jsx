import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaMoneyBill, FaArrowRight, FaArrowLeft, FaSearch, FaCreditCard } from 'react-icons/fa';
import { FiCalendar, FiFilter } from 'react-icons/fi';
import axiosClient from '../../../utils/axiosClient';
import dayjs from 'dayjs';
import TransactionModal from '../../../components/TransactionModal';
import CardDepositModal from '../../../components/CardDepositModal';

const Transactions = () => {
  const { colors } = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('send');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  const [showCardDeposit, setShowCardDeposit] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axiosClient.get('/users/transactions');
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAction = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleTransactionClick = (tx) => {
    setSelectedTransaction(tx);
  };

  const handleDepositSuccess = () => {
    fetchTransactions();
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filters.type !== 'all' && tx.type !== filters.type) return false;
    if (filters.search && !tx.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.dateFrom && new Date(tx.timestamp) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(tx.timestamp) > new Date(filters.dateTo)) return false;
    return true;
  });

  return (
    <div className="p-6">
      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
           style={{ backgroundColor: colors.card, padding: '1rem', borderRadius: '0.5rem' }}>
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="p-2 rounded"
          style={{ backgroundColor: colors.background, color: colors.text }}
        />
        <select
          value={filters.type}
          onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
          className="p-2 rounded"
          style={{ backgroundColor: colors.background, color: colors.text }}
        >
          <option value="all">All Types</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
          className="p-2 rounded"
          style={{ backgroundColor: colors.background, color: colors.text }}
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
          className="p-2 rounded"
          style={{ backgroundColor: colors.background, color: colors.text }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg cursor-pointer"
          style={{ backgroundColor: colors.card }}
          onClick={() => handleAction('send')}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: colors.primary + '15' }}>
              <FaArrowRight size={24} style={{ color: colors.primary }} />
            </div>
            <div>
              <h3 className="font-medium" style={{ color: colors.text }}>Send Money</h3>
              <p className="text-sm" style={{ color: colors.text + '80' }}>Transfer to another account</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg cursor-pointer"
          style={{ backgroundColor: colors.card }}
          onClick={() => handleAction('request')}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: colors.warning + '15' }}>
              <FaArrowLeft size={24} style={{ color: colors.warning }} />
            </div>
            <div>
              <h3 className="font-medium" style={{ color: colors.text }}>Request Money</h3>
              <p className="text-sm" style={{ color: colors.text + '80' }}>Request payment from others</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg cursor-pointer"
          style={{ backgroundColor: colors.card }}
          onClick={() => setShowCardDeposit(true)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: colors.success + '15' }}>
              <FaCreditCard size={24} style={{ color: colors.success }} />
            </div>
            <div>
              <h3 className="font-medium" style={{ color: colors.text }}>Add Money</h3>
              <p className="text-sm" style={{ color: colors.text + '80' }}>Deposit via card</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((tx, index) => (
          <motion.div
            key={index}
            onClick={() => handleTransactionClick(tx)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border-b last:border-b-0 flex items-center justify-between"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{
                backgroundColor: tx.type === 'credit' ? colors.success + '15' : colors.danger + '15',
                color: tx.type === 'credit' ? colors.success : colors.danger
              }}>
                {tx.type === 'credit' ? <FaArrowLeft /> : <FaArrowRight />}
              </div>
              <div>
                <p className="font-medium" style={{ color: colors.text }}>{tx.description}</p>
                <p className="text-sm" style={{ color: colors.text + '60' }}>
                  {dayjs(tx.timestamp).format('DD MMM YYYY, HH:mm')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium" style={{
                color: tx.type === 'credit' ? colors.success : colors.danger
              }}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
              </p>
              <p className="text-sm" style={{
                color: colors.text + '60',
                backgroundColor: tx.status === 'pending' ? colors.warning + '20' : colors.success + '20',
                padding: '2px 8px',
                borderRadius: '12px',
                display: 'inline-block'
              }}>
                {tx.status}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      <CardDepositModal
        isOpen={showCardDeposit}
        onClose={() => setShowCardDeposit(false)}
        onSuccess={handleDepositSuccess}
      />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        colors={colors}
      />
    </div>
  );
};

export default Transactions;
