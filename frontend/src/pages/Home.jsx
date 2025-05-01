import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaUserPlus, FaUserCheck, FaLock, FaBolt, FaChartLine,
  FaShieldAlt, FaCreditCard, FaChevronDown, FaChevronUp,
  FaGithub, FaInstagram, FaLinkedin, FaMoneyBillWave,
  FaUserShield, FaHandHoldingUsd, FaFingerprint, FaHistory, FaKey
} from "react-icons/fa";
import { CiBank } from "react-icons/ci";

export default function Home() {
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const features = [
    {
      icon: <FaMoneyBillWave size={40} />,
      title: "Instant Money Transfer",
      desc: "Send and receive money instantly with secure PIN verification."
    },
    {
      icon: <FaUserShield size={40} />,
      title: "KYC Verification",
      desc: "Automatic PAN verification & employee approval system for enhanced security."
    },
    {
      icon: <FaCreditCard size={40} />,
      title: "Add Money",
      desc: "Add funds to your account instantly using cards or UPI."
    },
    {
      icon: <FaHandHoldingUsd size={40} />,
      title: "Request Money",
      desc: "Request money from other FinFlow users with ease."
    },
    {
      icon: <FaFingerprint size={40} />,
      title: "Transaction PIN",
      desc: "Secure all transactions with a 4-digit PIN for extra protection."
    },
    {
      icon: <FaHistory size={40} />,
      title: "Transaction History",
      desc: "View detailed history of all your financial activities."
    }
  ];

  const steps = [
    {
      icon: <FaUserPlus size={40} />,
      title: "Quick Registration",
      desc: "Register with PAN Card, Face Verification & Basic KYC details."
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Get Verified",
      desc: "Automatic verification with PAN or quick employee verification."
    },
    {
      icon: <FaKey size={40} />,
      title: "Set Transaction PIN",
      desc: "Set your secure 4-digit PIN and start banking instantly."
    }
  ];

  const faqs = [
    {
      question: "What documents do I need for registration?",
      answer: "You'll need your PAN card for verification, and you'll complete face verification during registration. We'll also need basic KYC details like address proof."
    },
    {
      question: "How does verification work?",
      answer: "We offer two verification methods: 1) Instant verification through PAN card matching 2) Manual verification by our banking team within 24 hours."
    },
    {
      question: "How do I set up my Transaction PIN?",
      answer: "After account verification, you can set your 4-digit transaction PIN from the dashboard's security settings. This PIN will be required for all transactions."
    },
    {
      question: "What are the transaction limits?",
      answer: "Verified accounts have no daily transaction limits. All transactions require PIN verification for security."
    },
    {
      question: "Can I request money from other users?",
      answer: "Yes, you can send money requests to other FinFlow users. They can accept or reject these requests through their dashboard."
    }
  ];

  const sectionStyle = "min-h-screen w-full snap-start flex items-center justify-center px-4";

  return (
    <motion.div
      className="h-screen flex flex-col w-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Hero Section */}
      <section className="min-h-screen w-full snap-center snap-mandatory flex items-center justify-center relative" style={{ background: colors.gradient }}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />
        <div className="z-10 text-center max-w-3xl px-4">
          <motion.h1 className="text-5xl font-bold text-white" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Welcome to <span style={{ color: colors.warning }}>FinFlow</span>
          </motion.h1>
          <motion.p className="mt-4 text-lg text-white" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Banking made <span style={{ color: colors.success }}>simple</span>,{" "}
            <span style={{ color: colors.danger }}>secure</span> &{" "}
            <span style={{ color: colors.warning }}>swift</span>.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          >
            <button
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:scale-105 transition-transform"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
            <button
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              onClick={() => navigate("/login")}
            >
              Go to Bank
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className={`${sectionStyle} snap-center snap-mandatory`}>
        <div className="max-w-6xl w-full">
          <h2 className="text-4xl font-bold text-center mb-10">Why Choose <span style={{ color: colors.primary }}>FinFlow</span>?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg text-center hover:shadow-md hover:shadow-blue-500/50 transition-all duration-300"
                style={{ backgroundColor: colors.card }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-3 flex justify-center text-3xl text-blue-500">{item.icon}</div>
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-sm mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`${sectionStyle} snap-center snap-mandatory`}>
        <div className="max-w-6xl w-full">
          <h2 className="text-4xl font-bold text-center mb-10">How <span style={{ color: colors.primary }}>FinFlow</span> Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-md hover:shadow-blue-500/50 transition-all duration-300"
                style={{ backgroundColor: colors.card }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="mb-4 text-3xl text-blue-600 flex justify-center">{step.icon}</div>
                <h4 className="text-xl font-semibold">{step.title}</h4>
                <p className="text-sm mt-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${sectionStyle} snap-center snap-mandatory`}>
        <div className="max-w-3xl w-full">
          <h2 className="text-4xl font-bold text-center mb-6">
            Frequently Asked <span style={{ color: colors.primary }}>Questions</span>
          </h2>
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-4  px-4 py-2 border rounded-md flex flex-col overflow-hidden" style={{ borderColor: colors.primaryDark }}>
              <button onClick={() => toggleFAQ(idx)} className="w-full flex justify-between items-center">
                <span className="font-semibold">{faq.question}</span>
                {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    className="text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="w-full py-6 border-t text-center snap-end"
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          borderColor: `${colors.text}44`
        }}
      >
        <p className="text-sm">&copy; {new Date().getFullYear()} <b>FinFlow</b> — Modern Banking, Made for You.</p>
        <div className="flex justify-center gap-6 mt-4 text-2xl">
          <a href="https://instagram.com/cdn_lgn" target="_blank" rel="noreferrer">
            <FaInstagram className="hover:scale-110 transition-transform" style={{ color: colors.primary }} />
          </a>
          <a href="https://github.com/cdn-lgn" target="_blank" rel="noreferrer">
            <FaGithub className="hover:scale-110 transition-transform" style={{ color: colors.primary }} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin className="hover:scale-110 transition-transform" style={{ color: colors.primary }} />
          </a>
        </div>
      </footer>
    </motion.div>
  );
}
