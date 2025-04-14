import React, { useContext } from "react";
import {
  FaCreditCard,
  FaLock,
  FaBolt,
  FaChartLine,
  FaUserCheck,
} from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

export default function FeaturesSection() {
  const { colors } = useContext(ThemeContext);

  const features = [
    {
      icon: <FaCreditCard size={32} color={colors.primary} />,
      title: "Virtual Banking",
      desc: "No physical cards, 100% online experience.",
    },
    {
      icon: <FaLock size={32} color={colors.primary} />,
      title: "Encrypted & Secure",
      desc: "Your data is safe & sound, just like your secrets 😉",
    },
    {
      icon: <FaBolt size={32} color={colors.primary} />,
      title: "Instant Transfers",
      desc: "Lightning fast money moves ⚡",
    },
    {
      icon: <FaChartLine size={32} color={colors.primary} />,
      title: "Real-time Analytics",
      desc: "Keep track of your finances live.",
    },
    {
      icon: <FaUserCheck size={32} color={colors.primary} />,
      title: "Employee Verification",
      desc: "Verified support when you need it.",
    },
  ];

  return (
    <section
      className="py-16 px-4 min-h-screen"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <h2 className="text-4xl font-bold text-center">
        Why Choose <span style={{ color: colors.primary }}>FinFlow</span>?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: colors.card, color: colors.text }}
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
