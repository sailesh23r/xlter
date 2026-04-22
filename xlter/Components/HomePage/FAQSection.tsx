"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridBackground from "../Animations/GridBackground";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What Services Does Xlter Offer?",
    answer:
      "We offer a comprehensive range of digital solutions including custom website design, e-commerce development, digital marketing (SEO, SEM, SMM), UI & UX design, graphic design, branding & visual identity.",
  },
  {
    question: "How Long Does It Take To Build A Website?",
    answer:
      "The timeline varies based on the project's complexity. A standard business website typically takes 2–4 weeks, while more complex e-commerce platforms or custom web applications may take 6–12 weeks.",
  },
  {
    question:
      "Do You Offer Support And Maintenance After Project Delivery?",
    answer:
      "Yes, we offer flexible maintenance packages including backups, security patches, content updates, and technical troubleshooting.",
  },
  {
    question: "What Is Your Pricing Structure?",
    answer:
      "Our pricing is project-based and tailored to your requirements. We provide transparent quotes with no hidden costs.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-transparent text-foreground py-24 md:py-32 lg:py-40 overflow-hidden relative">
      <GridBackground />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-3 sm:mb-4 md:mb-5">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl sm:max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers. Here&apos;s everything you need to know about
            our services and process.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {faqData.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Question Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8 text-left group"
                >
                  <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-card-foreground uppercase flex-1">
                    {item.question}
                  </span>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-500 bg-primary text-white">
                    {activeIndex === index ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    )}
                  </div>
                </button>
              </motion.div>

              {/* Answer Content */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-3 sm:gap-4 md:gap-6 px-4 sm:px-5 md:px-6 py-4 sm:py-6 md:py-8">
                      <div className="w-0.5 sm:w-1 bg-primary/60 rounded-full flex-shrink-0" />
                      <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
