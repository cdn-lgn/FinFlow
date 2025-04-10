import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box } from '@mui/material';

const UserDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={600} mb={2}>
          Welcome to your UserDashboard 💼
        </Typography>
        <Typography>
          Yahan se tu apne transactions, profile, aur baaki sab kuch dekh sakta hai... bilkul boss jaisa 😎
        </Typography>
      </Box>
    </motion.div>
  );
};

export default UserDashboard;
