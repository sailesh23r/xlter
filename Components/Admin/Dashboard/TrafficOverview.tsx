"use client";

import { motion } from "framer-motion";
import { TrendingUp, Eye, Users2, Timer, MousePointerClick } from "lucide-react";

interface TrafficProps {
    traffic: { totalViews: number; uniqueVisitors: number; bounceRate: string; avgSession: string; };
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEIGHTS = [45, 62, 38, 78, 55, 90, 70]; // mock relative bar heights %

export default function TrafficOverview({ traffic }: TrafficProps) {
    const metrics = [
        { label: "Total Views",    value: (traffic?.totalViews ?? 0).toLocaleString(), icon: Eye,             color: "#a855f7" },
        { label: "Unique Visitors",value: (traffic?.uniqueVisitors ?? 0).toLocaleString(), icon: Users2,      color: "#3b82f6" },
        { label: "Bounce Rate",    value: traffic?.bounceRate ?? "0%",                 icon: MousePointerClick, color: "#06b6d4" },
        { label: "Avg. Session",   value: traffic?.avgSession ?? "0:00",               icon: Timer,           color: "#10b981" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card-xl relative overflow-hidden p-8"
        >
            {/* Ambient */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07), transparent 70%)" }} />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>
                        <TrendingUp size={16} className="text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-wide">Traffic Intelligence</h2>
                        <p className="text-[10px] text-gray-600 mt-0.5">7-day overview</p>
                    </div>
                </div>
                <select
                    className="text-[10px] font-black text-gray-500 px-3 py-2 rounded-xl focus:outline-none transition-colors hover:text-white"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    aria-label="Select traffic timeframe"
                >
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                </select>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {metrics.map((m, i) => (
                    <motion.div key={m.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                        className="p-4 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center gap-2 mb-2">
                            <m.icon size={11} style={{ color: m.color }} />
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">{m.label}</p>
                        </div>
                        <p className="text-xl font-black text-white">{m.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Bar chart */}
            <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-700">Sessions by Day</p>
                <div className="flex items-end gap-2 h-28">
                    {DAYS.map((day, i) => (
                        <div key={day} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end justify-center" style={{ height: "88px" }}>
                                <motion.div
                                    className="w-full rounded-t-lg relative overflow-hidden"
                                    style={{ height: `${HEIGHTS[i]}%` }}
                                    initial={{ scaleY: 0, originY: 1 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <div className="absolute inset-0 rounded-t-lg"
                                        style={{
                                            background: i === 5
                                                ? "linear-gradient(180deg, #a855f7, rgba(124,58,237,0.4))"
                                                : "linear-gradient(180deg, rgba(59,130,246,0.5), rgba(59,130,246,0.15))",
                                            boxShadow: i === 5 ? "0 0 12px rgba(168,85,247,0.3)" : undefined,
                                        }} />
                                </motion.div>
                            </div>
                            <span className="text-[8px] font-bold text-gray-700">{day}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
