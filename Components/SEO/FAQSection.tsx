"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions", description }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  // JSON-LD FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="py-14 sm:py-20 lg:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-primary">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-lg font-medium opacity-60 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-[24px] overflow-hidden transition-all duration-300 ${
                isOpen ? "bg-primary/5 border-primary/40 shadow-xl shadow-primary/5" : "bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/30 shadow-md shadow-black/5"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-3 p-4 sm:p-6 text-left group"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-primary" : "text-muted-foreground opacity-40"}`} />
                  <span className={`text-base sm:text-lg font-bold uppercase tracking-tight leading-tight max-w-[85%] pr-2 ${isOpen ? "text-primary" : "text-foreground"}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`shrink-0 w-[42px] h-[42px] sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all border ${isOpen ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-background/50 border-border/50 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary"}`}>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2 text-muted-foreground text-base leading-7 md:text-lg font-medium border-t border-primary/10 mx-4 sm:mx-6">
                      <div className="pt-4 whitespace-pre-wrap">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
