import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab
} from "@mui/material";
import { ThemeContext } from "../../../context/ThemeContext";
import { motion } from "framer-motion";

// Dummy Data
const dummyTransactions = [
  { id: 1, date: '2025-04-01', amount: 4500, type: 'Credit', status: 'Success' },
  { id: 2, date: '2025-04-02', amount: 1200, type: 'Debit', status: 'Pending' },
  { id: 3, date: '2025-04-03', amount: 700, type: 'Debit', status: 'Failed' },
];

// Components inside Tabs
const TransactionTable = ({ colors }) => (
  <Paper
    elevation={3}
    sx={{ bgcolor: colors.card, color: colors.text, overflowX: "auto" }}
  >
    <Box p={2}>
      <Typography variant="h6" gutterBottom sx={{color:colors.text}}>
        All Transactions
      </Typography>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="left">Date</th>
            <th align="left">Amount</th>
            <th align="left">Type</th>
            <th align="left">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyTransactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.date}</td>
              <td>₹{txn.amount}</td>
              <td>{txn.type}</td>
              <td style={{
                color:
                  txn.status === "Success"
                    ? colors.success
                    : txn.status === "Pending"
                    ? colors.warning
                    : colors.danger,
                fontWeight: 600,
              }}>
                {txn.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  </Paper>
);

const SendMoney = ({ colors }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}
  >
    <Box
      p={3}
      bgcolor={colors.card}
      color={colors.text}
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h6" sx={{color:colors.text}}>Send Money 🤑</Typography>
      <Typography mt={1} fontSize={14}>
        (Form coming soon...)
      </Typography>
    </Box>
  </motion.div>
);

const RaiseFund = ({ colors }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
  >
    <Box
      p={3}
      bgcolor={colors.card}
      color={colors.text}
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h6">Raise Fund 🙌</Typography>
      <Typography mt={1} fontSize={14}>
        (Raise funds feature coming soon...)
      </Typography>
    </Box>
  </motion.div>
);

const Transactions = () => {
  const { colors } = useContext(ThemeContext);
  const [tab, setTab] = useState(0);

  const handleTabChange = (_, newTab) => setTab(newTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <Box p={4} width="100%">
        <Typography variant="h4" fontWeight={600} color={colors.text} mb={2}>
          Transactions Section 💸
        </Typography>

        {/* Tabs */}
        <Tabs value={tab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="View Transactions" sx={{color:colors.text}} />
          <Tab label="Send Money" sx={{color:colors.text}} />
          <Tab label="Raise Fund" sx={{color:colors.text}} />
        </Tabs>

        <Box mt={3}>
          {tab === 0 && <TransactionTable colors={colors} />}
          {tab === 1 && <SendMoney colors={colors} />}
          {tab === 2 && <RaiseFund colors={colors} />}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Transactions;
