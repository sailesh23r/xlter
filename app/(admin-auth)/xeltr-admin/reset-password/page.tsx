"use client";

import { useActionState, useEffect, useState, Suspense } from "react";
import { resetPasswordAction } from "@/app/(admin-dashboard)/xeltr-admin/auth-actions";
import { Lock, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const initialState = { error: "", success: "" };

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const [state, formAction, pending] = useActionState(resetPasswordAction, initialState);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#020617" }}>
        <div className="text-center p-10 bg-slate-900 border border-white/10 rounded-3xl max-w-sm">
          <h1 className="text-2xl font-black text-white mb-4">Invalid Link</h1>
          <p className="text-slate-400 mb-8">This password reset link is invalid or has expired.</p>
          <Link href="/xeltr-admin/forgot-password" className="text-blue-500 font-bold uppercase tracking-widest text-xs">Request new link</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#020617" }}>
      
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
          {state?.success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h1 className="text-2xl font-black text-white mb-2">Success!</h1>
              <p className="text-slate-400 mb-10">{state.success}</p>
              <Link href="/xeltr-admin/login" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs">
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-3xl font-black text-white tracking-tighter mb-2">New Password</h1>
                <p className="text-slate-400 text-sm">Create a secure password for your account.</p>
              </div>

              <form action={formAction} className="space-y-6">
                <input type="hidden" name="token" value={token} />
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">New Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      type="password" 
                      name="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      type="password" 
                      name="confirmPassword" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                {state?.error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                    {state.error}
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
                      Reset Password
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#020617" }}>
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
