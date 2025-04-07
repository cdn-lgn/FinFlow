import React from "react";
import { motion } from "framer-motion";
import COLORS from "../../constatnts/colors";

function HeroSection() {
  const color = COLORS.
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="max-w-3xl text-center">
        
        {/* App Name & Slogan */}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold"
        >
          Welcome to <span className="text-yellow-300">FinFlow</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-lg text-gray-200"
        >
          Banking made <span className="text-green-300">simple</span>, <span className="text-red-300">secure</span> & <span className="text-yellow-300">swift</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 flex justify-center space-x-4"
        >
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
            Create Account
          </button>
          <button className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition">
            Go to Bank
          </button>
        </motion.div>

      </div>
    </section>
  );
}


export default HeroSection;
