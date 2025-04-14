import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaMoneyBillWave, FaRegArrowAltCircleUp } from "react-icons/fa";

// Dummy Data
const dummyTransactions = [
  { id: 1, date: '2025-04-01', amount: 4500, type: 'Credit', status: 'Success' },
  { id: 2, date: '2025-04-02', amount: 1200, type: 'Debit', status: 'Pending' },
  { id: 3, date: '2025-04-03', amount: 700, type: 'Debit', status: 'Failed' },
];

// Components inside Tabs
const TransactionTable = ({ colors }) => (
  <div className={`bg-${colors.card} text-${colors.text} overflow-x-auto p-4 rounded-xl`}>
    <h2 className={`text-xl font-semibold text-${colors.text} mb-4`}>All Transactions</h2>
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="text-left px-4 py-2">ID</th>
          <th className="text-left px-4 py-2">Date</th>
          <th className="text-left px-4 py-2">Amount</th>
          <th className="text-left px-4 py-2">Type</th>
          <th className="text-left px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {dummyTransactions.map((txn) => (
          <tr key={txn.id}>
            <td className="px-4 py-2">{txn.id}</td>
            <td className="px-4 py-2">{txn.date}</td>
            <td className="px-4 py-2">₹{txn.amount}</td>
            <td className="px-4 py-2">{txn.type}</td>
            <td
              className={`px-4 py-2 font-semibold ${
                txn.status === "Success"
                  ? `text-${colors.success}`
                  : txn.status === "Pending"
                  ? `text-${colors.warning}`
                  : `text-${colors.danger}`
              }`}
            >
              {txn.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SendMoney = ({ colors }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}
  >
    <div
      className={`bg-${colors.card} text-${colors.text} p-4 rounded-xl shadow-lg`}
    >
      <h3 className={`text-xl font-semibold text-${colors.text}`}>Send Money 🤑</h3>
      <p className="mt-1 text-sm">(Form coming soon...)</p>
    </div>
  </motion.div>
);

const RaiseFund = ({ colors }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
  >
    <div
      className={`bg-${colors.card} text-${colors.text} p-4 rounded-xl shadow-lg`}
    >
      <h3 className="text-xl font-semibold">Raise Fund 🙌</h3>
      <p className="mt-1 text-sm">(Raise funds feature coming soon...)</p>
    </div>
  </motion.div>
);

const Transactions = () => {
  const { colors } = useContext(ThemeContext);
  const [tab, setTab] = useState(0);

  const handleTabChange = (newTab) => setTab(newTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="p-4 w-full"
    >
      <h2 className={`text-3xl font-semibold text-${colors.text} mb-4`}>
        Transactions Section 💸
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange(0)}
          className={`${
            tab === 0 ? "text-primary border-b-2 border-primary" : "text-gray-500"
          } text-lg font-medium py-2 px-4`}
        >
          View Transactions
        </button>
        <button
          onClick={() => handleTabChange(1)}
          className={`${
            tab === 1 ? "text-primary border-b-2 border-primary" : "text-gray-500"
          } text-lg font-medium py-2 px-4`}
        >
          Send Money <FaMoneyBillWave className="inline-block ml-1" />
        </button>
        <button
          onClick={() => handleTabChange(2)}
          className={`${
            tab === 2 ? "text-primary border-b-2 border-primary" : "text-gray-500"
          } text-lg font-medium py-2 px-4`}
        >
          Raise Fund <FaRegArrowAltCircleUp className="inline-block ml-1" />
        </button>
      </div>

      <div>
        {tab === 0 && <TransactionTable colors={colors} />}
        {tab === 1 && <SendMoney colors={colors} />}
        {tab === 2 && <RaiseFund colors={colors} />}
      </div>
    </motion.div>
  );
};

export default Transactions;
