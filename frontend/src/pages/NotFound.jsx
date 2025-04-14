import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
        >
          <h1 className="text-6xl font-bold text-blue-600">404</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h5 className="mt-2 mb-4 text-xl text-gray-700">Oops! Page not found 😢</h5>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
