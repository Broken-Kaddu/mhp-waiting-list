import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Which languages does MHP support?",
      answer: "MHP is designed for multilingual construction teams and supports major Indian languages (Hindi, Kannada, Tamil, Telugu, Marathi, Malayalam, Bengali), English, and mixed-language conversations (such as Hinglish or Tanglish) commonly used on construction sites."
    },
    {
      question: "Can workers continue sending voice notes in their own language?",
      answer: "Yes. Teams can continue communicating naturally. MHP is designed to understand multilingual construction communication and convert it into structured operational data without requiring workers to change their workflow."
    },
    {
      question: "Is my project data used to train AI models?",
      answer: "No. Your data is strictly processed for your organization's use and is never used to train public AI models or shared with third-party datasets."
    },
    {
      question: "Can AI run on our own infrastructure?",
      answer: "Yes. MHP is designed to support private and local AI deployments for organizations with stricter security and compliance requirements."
    },
    {
      question: "Are our drawings, BOQs, invoices, and project documents secure?",
      answer: "Yes. MHP is designed with enterprise security practices, end-to-end encryption in transit and at rest, and supports private processing of sensitive construction information."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-28 relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-widest uppercase flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
          </span>
          <h2 className="text-2xl md:text-4xl font-black font-display text-white">
            Everything You Need to Know
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Have questions about how MHP functions on site, our language support, or local hosting? Find answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`bg-slate-900/40 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-brand-orange/30 bg-slate-900/70" : "border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-sm md:text-base font-bold text-slate-100 font-display">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                    isOpen ? "rotate-180 text-brand-orange" : ""
                  }`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
