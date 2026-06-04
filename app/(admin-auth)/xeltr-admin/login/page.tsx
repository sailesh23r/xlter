"use client";

import AuthCard from "@/components/admin/auth/AuthCard";
import LoginForm from "@/components/admin/auth/LoginForm";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background">
      
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[600px] bg-primary/[0.04] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <AuthCard>
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="w-10 h-10 flex items-center justify-center mb-1">
              <img 
                src="/Transparent-06.png" 
                alt="Xeltr Logo" 
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-foreground tracking-tight">XELTR ADMIN</h1>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <Sparkles size={12} className="text-primary/70" />
                <span className="text-[12px] font-medium text-muted-foreground">Secure Control Centre</span>
              </div>
            </div>
          </div>
          
          <LoginForm />

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              Secure Auth
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              Encrypted Session
            </div>
          </div>
        </AuthCard>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="flex gap-4 justify-center items-center">
            <a href="#" className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <div className="w-1 h-1 rounded-full bg-border" />
            <a href="#" className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <div className="w-1 h-1 rounded-full bg-border" />
            <span className="text-[11px] font-medium text-muted-foreground">&copy; 2026 Xeltr</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
