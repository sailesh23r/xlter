"use client";

import { useActionState, useState } from "react";
import { loginAdmin } from "@/app/(admin-dashboard)/xeltr-admin/actions";
import { Mail, Lock, Eye, EyeOff, Sparkles, Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const initialState = { error: "" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-6 relative">
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
          Admin Identity
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none">
            <Mail size={18} />
          </div>
          <input 
            id="email"
            type="email" 
            name="email" 
            required
            placeholder="e.g. admin@xeltr.com"
            aria-label="Admin Email"
            className="w-full bg-slate-900/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Security Access
          </label>
          <Link 
            href="/xeltr-admin/forgot-password" 
            className="text-[11px] font-bold text-blue-500 hover:text-blue-400 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none">
            <Lock size={18} />
          </div>
          <input 
            id="password"
            type={showPassword ? "text" : "password"} 
            name="password" 
            required
            placeholder="Enter your password"
            aria-label="Admin Password"
            className="w-full bg-slate-900/60 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-3 px-1">
        <div className="relative flex items-center group cursor-pointer">
          <input 
            type="checkbox" 
            name="rememberMe" 
            id="rememberMe"
            className="peer w-5 h-5 opacity-0 absolute cursor-pointer z-10"
          />
          <div className="w-5 h-5 border border-white/10 rounded-lg bg-slate-900/60 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all group-hover:border-white/20" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all">
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <label htmlFor="rememberMe" className="text-xs font-medium text-slate-400 cursor-pointer select-none hover:text-slate-300 transition-colors">
          Stay authorized for 30 days
        </label>
      </div>

      {/* Error Alert */}
      <AnimatePresence mode="wait">
        {state?.error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center gap-3 shadow-sm"
          >
            <div className="bg-red-500/10 p-1.5 rounded-lg">
              <ShieldAlert className="text-red-500" size={16} />
            </div>
            <p className="text-red-400/90 text-sm font-medium">{state.error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={pending}
        className="w-full relative group overflow-hidden bg-blue-600 text-white py-4 rounded-2xl font-bold tracking-wider text-sm hover:bg-blue-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)]"
      >
        {pending ? (
          <>
            <Loader2 size={18} className="animate-spin relative z-10" />
            <span className="relative z-10">Signing in...</span>
          </>
        ) : (
          <>
            <Lock size={16} className="relative z-10" />
            <span className="relative z-10">Secure Login</span>
          </>
        )}
      </button>
    </form>
  );
}
