import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaUserCheck } from 'react-icons/fa'; // React Icons
import { CiBank } from "react-icons/ci";
import { ThemeContext } from "../../context/ThemeContext";

const steps = [
  {
    icon: <FaUserPlus size={40} />,
    title: "Create Account",
    desc: "Sign up with your email & secure password.",
  },
  {
    icon: <FaUserCheck size={40} />,
    title: "Employee Verification",
    desc: "Our staff verifies your identity manually.",
  },
  {
    icon:<CiBank size={40} />,
    title: "Start Banking",
    desc: "Send, receive & manage funds securely.",
  },
];

export default function HowItWorksSection() {
  const { colors } = useContext(ThemeContext);

  return (
    <div className={`py-10 px-4 bg-${colors.background} text-${colors.text}`}>
      <h4 className="text-3xl font-bold text-center mb-8">
        How <span className={`text-${colors.primary}`}>FinFlow</span> Works
      </h4>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div
              className={`p-6 text-center rounded-xl bg-${colors.card} text-${colors.text} transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
            >
              <div className={`mb-4 text-${colors.primary}`}>
                {step.icon}
              </div>
              <h6 className="text-xl font-semibold">{step.title}</h6>
              <p className="mt-2 text-sm">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
