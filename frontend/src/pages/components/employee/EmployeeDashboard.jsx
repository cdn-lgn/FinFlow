import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaUsers, FaCheckCircle, FaTachometerAlt } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const { colors } = useContext(ThemeContext);

  const cards = [
    {
      title: "Total Users",
      value: 128,
      icon: <FaUsers size="2rem" />,
    },
    {
      title: "Pending Verifications",
      value: 12,
      icon: <FaCheckCircle size="2rem" />,
    },
    {
      title: "Total Tasks",
      value: 34,
      icon: <FaTachometerAlt size="2rem" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow p-4 w-full overflow-y-auto"
    >
      <h2 className={`text-4xl font-semibold mb-4 text-${colors.text}`}>
        Welcome, Employee 💼
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col items-start bg-white text-gray-800 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
            <div className={`text-${colors.primary}`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;
