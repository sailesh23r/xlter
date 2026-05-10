"use client";

import { useActionState, useState, useEffect } from "react";
import { verify2FAAction } from "@/app/(admin-dashboard)/xeltr-admin/auth-actions";
import { ShieldCheck, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const initialState = { error: "" };

export default function TwoFactorPage() {
  const [state, formAction, pending] = useActionState(verify2FAAction, initialState);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#020617" }}>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl text-center">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-8">
            <ShieldCheck size={40} />
          </div>

          <h1 className="text-3xl font-black text-white tracking-tighter mb-4">Security Check</h1>
          <p className="text-slate-400 text-sm mb-10">Please enter the 6-digit code sent to your email.</p>

          <form action={formAction} className="space-y-8">
            <div className="flex justify-center gap-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                  className="w-12 h-14 bg-slate-950/50 border border-white/10 rounded-xl text-center text-xl font-bold text-white focus:border-blue-500/50 focus:outline-none transition-all"
                  autoFocus={index === 0}
                />
              ))}
              <input type="hidden" name="otp" value={otp.join("")} />
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
                  Verify Identity
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-xs text-slate-500 uppercase tracking-widest font-bold">
            Didn't receive a code? <button className="text-blue-500 hover:underline">Resend OTP</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
