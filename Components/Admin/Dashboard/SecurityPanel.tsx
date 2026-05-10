"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, AlertCircle, Lock, Monitor } from "lucide-react";

interface SecurityProps {
    recentLogins: { name: string; time: string; ip: string }[];
    showFullSecurity: boolean;
}

export default function SecurityPanel({ recentLogins, showFullSecurity }: SecurityProps) {
    return (
        <div className="space-y-5">
            {/* Status card */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="glass-card-xl relative overflow-hidden p-6"
            >
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(74,222,128,0.08), transparent 70%)" }} />

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.15)" }}>
                        <ShieldCheck size={14} className="text-green-400" />
                    </div>
                    <h3 className="text-xs font-black text-white uppercase tracking-wide">Security Status</h3>
                </div>

                <div className="space-y-3">
                    {/* JWT */}
                    <div className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.1)" }}>
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "rgba(74,222,128,0.1)" }}>
                                <Lock size={12} className="text-green-400" />
                            </div>
                            <div>
                                <p className="text-white text-[11px] font-bold">JWT Sessions</p>
                                <p className="text-[9px] text-gray-600">Encrypted & Secure</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={11} className="text-green-400" />
                            <span className="text-[9px] font-black text-green-400 uppercase">Active</span>
                        </div>
                    </div>

                    {/* 2FA */}
                    <div className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "rgba(245,158,11,0.1)" }}>
                                <AlertCircle size={12} className="text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-white text-[11px] font-bold">2FA Security</p>
                                <p className="text-[9px] text-gray-600">Not configured</p>
                            </div>
                        </div>
                        <button
                            className="text-[9px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors px-2 py-1 rounded-lg"
                            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.15)" }}
                            aria-label="Enable 2FA">
                            Enable
                        </button>
                    </div>

                    {/* SSL */}
                    <div className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "rgba(59,130,246,0.1)" }}>
                                <Monitor size={12} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white text-[11px] font-bold">SSL Certificate</p>
                                <p className="text-[9px] text-gray-600">94 days remaining</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={11} className="text-blue-400" />
                            <span className="text-[9px] font-black text-blue-400 uppercase">Valid</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Recent logins — SUPER_ADMIN only */}
            {showFullSecurity && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.65 }}
                    className="glass-card-xl p-6"
                >
                    <h3 className="text-xs font-black text-white uppercase tracking-wide mb-5">Recent Logins</h3>
                    <div className="space-y-2">
                        {recentLogins?.length > 0 ? (
                            recentLogins.map((login, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: 0.7 + i * 0.06 }}
                                    className="flex items-center justify-between p-3 rounded-xl"
                                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-black text-purple-300"
                                            style={{ background: "rgba(168,85,247,0.12)" }}>
                                            {login.name[0].toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white text-[11px] font-bold truncate">{login.name}</p>
                                            <p className="text-[9px] text-gray-600">{login.ip === "192.168.1.1" ? "Internal Auth" : login.ip}</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] text-gray-600 font-bold shrink-0">{login.time}</span>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-700 text-[10px] font-black uppercase tracking-widest text-center py-6">
                                No recent activity
                            </p>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
