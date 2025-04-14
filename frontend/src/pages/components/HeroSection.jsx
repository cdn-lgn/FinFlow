import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: colors.gradient }}
    >
      {/* Blurred Glass Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0" />

      {/* Main Content */}
      <div className="max-w-3xl text-center z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
        >
          Welcome to{" "}
          <span style={{ color: colors.warning }}>
            FinFlow
          </span>
          <motion.span
            className="inline-block text-3xl ml-2"
            initial={{ y: -10 }}
            animate={{ y: [ -10, 0, -10 ] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💸
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-lg sm:text-xl"
          style={{ color: colors.text }}
        >
          Banking made{" "}
          <span style={{ color: colors.success }}>simple</span>,{" "}
          <span style={{ color: colors.danger }}>secure</span> &{" "}
          <span style={{ color: colors.warning }}>swift</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Create Account
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            Go to Bank
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
