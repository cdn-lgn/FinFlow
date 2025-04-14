import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-4"
    >
      <div>
        <h2 className="text-4xl font-semibold mb-2 text-gray-800">
          Welcome to your UserDashboard 💼
        </h2>
        <p className="text-lg text-gray-600">
          Yahan se tu apne transactions, profile, aur baaki sab kuch dekh sakta hai... bilkul boss jaisa 😎
        </p>
      </div>
      <div className="flex items-center mt-4">
        <FaUserCircle className="text-gray-500 text-5xl" />
        <span className="ml-2 text-lg text-gray-800">User Profile</span>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
