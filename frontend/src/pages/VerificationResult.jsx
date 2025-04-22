import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const VerificationResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.result) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto mt-24 p-8 rounded-xl bg-white shadow-lg text-center space-y-6"
    >
      <FiCheckCircle className="text-green-500 text-5xl mx-auto" />

      {state.result.account ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800">Registration Complete</h2>
          <p className="text-gray-600">Your bank account was successfully created. You can now log in.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition"
          >
            Login <FiArrowRight className="ml-2" />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800">Registration Successful</h2>
          <p className="text-gray-600">Your bank account will be created within 24 hours after verification.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded-md transition"
          >
            <FiArrowLeft className="mr-2" />
            Go Back
          </button>
        </>
      )}
    </motion.div>
  );
};

export default VerificationResult;
