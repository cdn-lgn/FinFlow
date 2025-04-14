import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I create an account on FinFlow?",
    answer: "Just click the 'Create Account' button and fill out a few simple details.",
  },
  {
    question: "Is my data safe with FinFlow?",
    answer: "Totally encrypted & locked tight.",
  },
  {
    question: "Do I need employee verification for transactions?",
    answer: "Not for regular payments. Employee verification is for account approvals & support only.",
  },
  {
    question: "Is FinFlow free to use?",
    answer: "Totally! No hidden fees, no tricks — just pure banking bliss 😌.",
  },
];

export default function FAQSection() {
  const { colors } = useContext(ThemeContext);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-12 px-4"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Frequently Asked <span style={{ color: colors.text }}>Questions</span>
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 rounded-md border overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.primaryDark,
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-4 py-3 focus:outline-none"
            >
              <span className="font-semibold text-left text-base">
                {faq.question}
              </span>
              {openIndex === index ? (
                <FaChevronUp className="text-sm" />
              ) : (
                <FaChevronDown className="text-sm" />
              )}
            </button>

            <div
              className={`px-4 text-sm text-gray-700 dark:text-gray-300 transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-[500px] py-3" : "max-h-0"
              } overflow-hidden`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
