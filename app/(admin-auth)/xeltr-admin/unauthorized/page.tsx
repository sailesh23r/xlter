"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card-xl p-10 text-center space-y-6 border border-red-500/20"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Access Denied</h1>
          <p className="text-gray-500">
            You do not have the required permissions to access this section of the administrative dashboard.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link 
            href="/xeltr-admin/dashboard"
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all border border-white/10"
          >
            Back to Dashboard
          </Link>
          <Link 
            href="/xeltr-admin/login"
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-red-600/20"
          >
            Switch Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
