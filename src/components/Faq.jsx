import React from "react";
import "../style/style.css";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Aivise?",
      answer:
        "Aivise is an AI-powered business advisor designed to help entrepreneurs, startups, and professionals make better strategic decisions by providing insights based on proven frameworks.",
    },
    {
      question: "How does Aivise work?",
      answer:
        "Aivise uses advanced AI models integrated with curated business strategies. You can ask questions or seek advice, and the system will respond with actionable recommendations based on best practices.",
    },
    {
      question: "Is Aivise free to use?",
      answer:
        "Yes! Aivise offers a free version with basic features. For premium features like personalized mentoring and advanced analytics, you can upgrade to a Pro plan.",
    },
    {
      question: "Can I choose a specific mentor?",
      answer:
        "Absolutely. Aivise allows you to select advice based on the principles of famous business mentors like Michael E. Gerber, Stephen R. Covey, and Eric Ries.",
    },
    {
      question: "How secure is my data?",
      answer:
        "Your privacy and data security are our top priority. Aivise uses encrypted storage and secure authentication protocols to keep your information safe.",
    },
  ];

  return (
    <div className="px-10 sm:px-20 md:px-40 lg:px-60 xl:px-100 py-16 pb-20">
      {/* Animasi Fade-in untuk judul */}
      <motion.h1
        className="text-6xl font-bold mb-10 text-center font-Montserrat max-md:text-4xl max-lg:text-5xl"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        FAQ
      </motion.h1>

      <div className="space-y-4 bg-white">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border rounded-xl p-5 shadow-sm cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-md font-semibold">{item.question}</h2>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDownIcon className="w-6 h-6" />
              </motion.div>
            </div>

            {/* Smooth Expand/Collapse + Fade */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3"
                >
                  <p className="text-gray-600">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
