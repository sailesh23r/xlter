"use client";

import AuthCard from "@/components/admin/auth/AuthCard";
import LoginForm from "@/components/admin/auth/LoginForm";
import { ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#020617" }}>
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/[0.03] blur-[100px] sm:blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/[0.03] blur-[100px] sm:blur-[150px] rounded-full" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-center gap-8"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="/Transparent-06.png" 
              alt="Xeltr Logo" 
              className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Xeltr <span className="text-blue-500">Admin</span></h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Sparkles size={14} className="text-blue-400/80" />
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-blue-400/50">Control Centre</span>
            </div>
          </div>
        </motion.div>

        <AuthCard>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500 text-sm">Authorized personnel only. All activity is monitored.</p>
          </div>
          
          <LoginForm />

          {/* Trust Indicators */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              Secure Auth
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              Encrypted Session
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              Protected Access
            </div>
          </div>
        </AuthCard>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <a href="#" className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em] hover:text-slate-500 transition-colors">Terms of Service</a>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-800" />
            <a href="#" className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em] hover:text-slate-500 transition-colors">Privacy Shield</a>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-800" />
            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em]">&copy; 2026 Xeltr Control</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
