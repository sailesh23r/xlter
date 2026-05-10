"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle2, XCircle, Tag, Zap } from "lucide-react";

interface SEOHealthProps {
    health: { score: number; indexedPages: number; brokenLinks: number; topKeywords: string[]; };
    performance: { lcp: string; cls: string; };
}

function ScoreRing({ score }: { score: number }) {
    const r = 34;
    const circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    const color = score >= 90 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444";

    return (
        <svg width="88" height="88" viewBox="0 0 88 88" className="progress-ring"
            style={{ "--dash-offset": offset } as React.CSSProperties}>
            <circle cx="44" cy="44" r={r} fill="none" strokeWidth="4"
                stroke="rgba(255,255,255,0.05)" />
            <circle cx="44" cy="44" r={r} fill="none" strokeWidth="4"
                stroke={color} strokeLinecap="round" strokeDasharray={circ}
                strokeDashoffset={offset}
                style={{ transformOrigin: "center", transform: "rotate(-90deg)",
                    filter: `drop-shadow(0 0 8px ${color}80)` }} />
            <text x="44" y="44" textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="16" fontWeight="900" fontFamily="inherit">
                {score}
            </text>
            <text x="44" y="57" textAnchor="middle" dominantBaseline="middle"
                fill={color} fontSize="7" fontWeight="700" fontFamily="inherit">
                /100
            </text>
        </svg>
    );
}

export default function SEOHealthCard({ health, performance }: SEOHealthProps) {
    const score = health?.score ?? 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card-xl relative overflow-hidden p-8"
        >
            {/* Ambient orb */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%)" }} />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.2)" }}>
                        <Activity size={16} className="text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-wide">SEO & Performance</h2>
                        <p className="text-[10px] text-gray-600 mt-0.5">Real-time health monitor</p>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)", color: "#a855f7" }}>
                    Live
                </div>
            </div>

            {/* Score + Metrics grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                {/* Score ring */}
                <div className="flex flex-col items-center gap-2">
                    <ScoreRing score={score} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">SEO Score</span>
                </div>

                {/* Indexed Pages */}
                <div className="p-5 rounded-2xl space-y-3"
                    style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">Indexed Pages</p>
                    <p className="text-2xl font-black text-white">{health?.indexedPages ?? 0}</p>
                    <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <motion.div className="h-full rounded-full bg-green-500"
                            initial={{ width: 0 }} animate={{ width: "90%" }}
                            transition={{ duration: 1.2, delay: 0.3, ease: [0.4,0,0.2,1] }} />
                    </div>
                </div>

                {/* Core Vitals */}
                <div className="p-5 rounded-2xl space-y-3"
                    style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">Core Web Vitals</p>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-400" />
                        <span className="text-sm font-black text-green-400">Healthy</span>
                    </div>
                    <p className="text-[10px] text-gray-600">LCP: {performance?.lcp ?? "N/A"} · CLS: {performance?.cls ?? "N/A"}</p>
                </div>

                {/* Broken Links */}
                <div className="p-5 rounded-2xl space-y-3"
                    style={{
                        background: (health?.brokenLinks ?? 0) > 0 ? "rgba(239,68,68,0.06)" : "rgba(16,185,129,0.05)",
                        border: `1px solid ${(health?.brokenLinks ?? 0) > 0 ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.1)"}`,
                    }}>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">Broken Links</p>
                    <div className="flex items-center gap-2">
                        {(health?.brokenLinks ?? 0) > 0
                            ? <XCircle size={14} className="text-red-400" />
                            : <CheckCircle2 size={14} className="text-green-400" />}
                        <p className="text-2xl font-black text-white">{health?.brokenLinks ?? 0}</p>
                    </div>
                    <p className="text-[10px] text-gray-600">{(health?.brokenLinks ?? 0) > 0 ? "Needs attention" : "All links healthy"}</p>
                </div>
            </div>

            {/* Keywords */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-2 mb-4">
                    <Tag size={12} className="text-purple-400" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Top Search Intent</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {health?.topKeywords?.length > 0 ? (
                        health.topKeywords.map((kw: string, i: number) => (
                            <motion.span
                                key={kw}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                                className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-400 hover:text-purple-300 transition-all cursor-default truncate max-w-[200px]"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                                title={kw}
                            >
                                {kw}
                            </motion.span>
                        ))
                    ) : (
                        <p className="text-gray-700 text-[10px] italic flex items-center gap-2">
                            <Zap size={10} /> No keyword data yet
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
