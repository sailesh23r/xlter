"use client";
import React from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
