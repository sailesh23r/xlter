"use client";

import { useActionState } from "react";
import { forgotPasswordAction } from "@/app/(admin-dashboard)/xeltr-admin/auth-actions";
import { Mail, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const initialState = { error: "", success: "" };

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#020617" }}>
      
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
          <div className="mb-8">
            <Link href="/xeltr-admin/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-10">
              <ArrowLeft size={14} /> Back to Login
            </Link>
            
            <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Reset Password</h1>
            <p className="text-slate-400 text-sm">Enter your email and we'll send you a recovery link.</p>
          </div>

          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  name="email" 
                  required
                  placeholder="admin@xeltr.com"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            {state?.error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                {state.error}
              </div>
            )}

            {state?.success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                {state.success}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {pending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Sparkles size={16} />
                  Send Reset Link
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
