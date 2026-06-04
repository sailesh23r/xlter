"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
  delay?: number;
}

export function PremiumCard({
  children,
  className = "",
  hoverLift = true,
  delay = 0,
}: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverLift ? { y: -6 } : {}}
      className={`group relative bg-card/10 backdrop-blur-xl border border-border/30 p-8 md:p-10 rounded-[24px] overflow-hidden transition-all duration-700 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_rgba(37,99,235,0.12)] flex flex-col h-full ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
}
