"use client";

import { useActionState, useState } from "react";
import { loginAdmin } from "@/app/(admin-dashboard)/xeltr-admin/actions";
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const initialState = { error: "" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5 relative">
      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-[12px] font-medium text-foreground/80 ml-1">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none">
            <Mail size={16} />
          </div>
          <input 
            id="email"
            type="email" 
            name="email" 
            required
            placeholder="admin@xeltr.com"
            aria-label="Admin Email"
            className="w-full bg-background/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-[14px] text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center px-1">
          <label htmlFor="password" className="text-[12px] font-medium text-foreground/80">
            Password
          </label>
          <Link 
            href="/xeltr-admin/forgot-password" 
            className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Forgot?
          </Link>
        </div>
        <div className="relative group">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none">
            <Lock size={16} />
          </div>
          <input 
            id="password"
            type={showPassword ? "text" : "password"} 
            name="password" 
            required
            placeholder="••••••••"
            aria-label="Admin Password"
            className="w-full bg-background/50 border border-border/50 rounded-xl pl-10 pr-10 py-3 text-[14px] text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50 tracking-widest"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2.5 px-1 pt-1 pb-2">
        <div className="relative flex items-center group cursor-pointer">
          <input 
            type="checkbox" 
            name="rememberMe" 
            id="rememberMe"
            className="peer w-4 h-4 opacity-0 absolute cursor-pointer z-10"
          />
          <div className="w-4 h-4 border border-border/80 rounded bg-background/50 peer-checked:bg-primary peer-checked:border-primary transition-all group-hover:border-primary/50" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-primary-foreground opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all">
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <label htmlFor="rememberMe" className="text-[12px] font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors">
          Stay signed in
        </label>
      </div>

      {/* Error Alert */}
      <AnimatePresence mode="wait">
        {state?.error && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 shadow-sm"
          >
            <ShieldAlert className="text-destructive shrink-0" size={16} />
            <p className="text-destructive text-[13px] font-medium">{state.error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={pending}
        className="w-full relative group overflow-hidden bg-primary/90 hover:bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold text-[14px] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%]" />
        {pending ? (
          <>
            <Loader2 size={16} className="animate-spin relative z-10" />
            <span className="relative z-10">Authenticating...</span>
          </>
        ) : (
          <span className="relative z-10">Continue to Dashboard</span>
        )}
      </button>
    </form>
  );
}
