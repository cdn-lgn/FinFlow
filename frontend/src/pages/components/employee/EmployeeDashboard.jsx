import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import DashboardProfile from '../DashboardProfile';

const EmployeeDashboard = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow p-4 w-full"
    >
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: colors.text }}
      >
        Welcome
      </h2>

      <DashboardProfile />
    </motion.div>
  );
};

export default EmployeeDashboard;
