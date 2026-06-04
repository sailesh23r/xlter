"use client";
import React from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[400px] bg-card/40 backdrop-blur-xl border border-border/50 rounded-[24px] p-8 sm:p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden group"
    >
      {/* Subtle border glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
