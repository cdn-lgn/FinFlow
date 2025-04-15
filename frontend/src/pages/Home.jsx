import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaUserPlus, FaUserCheck, FaLock, FaBolt, FaChartLine,
  FaShieldAlt, FaCreditCard, FaChevronDown, FaChevronUp,
  FaGithub, FaInstagram, FaLinkedin
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
      icon: <FaCreditCard size={40} />,
      title: "Virtual Banking",
      desc: "Experience a fully digital banking platform—no physical cards required."
    },
    {
      icon: <FaLock size={40} />,
      title: "Encrypted & Secure",
      desc: "Advanced encryption keeps your data private, secure, and fully protected."
    },
    {
      icon: <FaBolt size={40} />,
      title: "Instant Transfers",
      desc: "Transfer funds in real time with high-speed, hassle-free transactions."
    },
    {
      icon: <FaChartLine size={40} />,
      title: "Real-time Analytics",
      desc: "Track your spending and savings with live financial insights and dashboards."
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Employee Verification",
      desc: "Our verified team members ensure safe, human-powered support and onboarding."
    }
  ];


  const steps = [
    {
      icon: <FaUserPlus size={40} />,
      title: "Create Account",
      desc: "Register using your email and a secure password in just a few simple steps."
    },
    {
      icon: <FaUserCheck size={40} />,
      title: "Identity Verification",
      desc: "Our team securely verifies your identity to ensure a trusted banking environment."
    },
    {
      icon: <CiBank size={40} />,
      title: "Start Banking",
      desc: "Access all features—send, receive, and manage your funds securely and efficiently."
    }
  ];


  const faqs = [
    {
      question: "How do I create an account on FinFlow?",
      answer: "Click the 'Create Account' button and follow the guided steps to sign up."
    },
    {
      question: "Is my data safe with FinFlow?",
      answer: "Yes. All user data is encrypted and stored securely in compliance with industry standards."
    },
    {
      question: "Do I need identity verification for transactions?",
      answer: "Basic transactions do not require verification. However, identity verification is necessary for account approval and customer support."
    },
    {
      question: "Is FinFlow free to use?",
      answer: "Absolutely. FinFlow is free to use with no hidden fees or surprise charges."
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
                className="text-center p-6 rounded-lg hover:shadow-md hover:shadow-blue-500/50 transition-all duration-300 transition-all duration-300"
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
