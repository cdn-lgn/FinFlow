import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate()
  const { theme, colors } = useContext(ThemeContext)
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-white"
      style={{ background: colors.gradient }}
    >
      <div className="max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold"
        >
          Welcome to <span style={{ color: colors.warning }}>FinFlow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-lg"
          style={{ color: colors.text }}
        >
          Banking made <span style={{ color: colors.success }}>simple</span>,{" "}
          <span style={{ color: colors.danger }}>secure</span> &{" "}
          <span style={{ color: colors.warning }}>swift</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 flex justify-center space-x-4"
        >
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition" onClick={()=>navigate("/register")}>
            Create Account
          </button>
          <button className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition" onClick={()=>navigate("/login")}>
            Go to Bank
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
