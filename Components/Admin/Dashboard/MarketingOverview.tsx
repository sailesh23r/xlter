"use client";

import { motion } from "framer-motion";
import { Users, MousePointer2, Layers, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface MarketingProps {
    marketing: { leads: number; conversionRate: string; activeLandingPages: number; };
}

export default function MarketingOverview({ marketing }: MarketingProps) {
    const cards = [
        {
            label: "Total Leads",
            value: marketing?.leads ?? 0,
            change: "+12% this week",
            positive: true,
            icon: Users,
            href: "/xeltr-admin/marketing/leads",
            gradient: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(219,39,119,0.05))",
            border: "rgba(236,72,153,0.18)",
            glow: "rgba(236,72,153,0.08)",
            iconColor: "#f472b6",
            iconBg: "rgba(236,72,153,0.12)",
        },
        {
            label: "Conversion Rate",
            value: marketing?.conversionRate ?? "0%",
            change: "Above industry avg",
            positive: true,
            icon: MousePointer2,
            href: "/xeltr-admin/marketing/analytics",
            gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.05))",
            border: "rgba(59,130,246,0.18)",
            glow: "rgba(59,130,246,0.08)",
            iconColor: "#60a5fa",
            iconBg: "rgba(59,130,246,0.12)",
        },
        {
            label: "Landing Pages",
            value: marketing?.activeLandingPages ?? 0,
            change: "Active & Tracking",
            positive: true,
            icon: Layers,
            href: "/xeltr-admin/marketing/landing-pages",
            gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(124,58,237,0.05))",
            border: "rgba(168,85,247,0.18)",
            glow: "rgba(168,85,247,0.08)",
            iconColor: "#a855f7",
            iconBg: "rgba(168,85,247,0.12)",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-xl relative overflow-hidden p-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(236,72,153,0.12)", border: "1px solid rgba(236,72,153,0.2)" }}>
                        <TrendingUp size={16} style={{ color: "#f472b6" }} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-wide">Marketing Intelligence</h2>
                        <p className="text-[10px] text-gray-600 mt-0.5">Leads & conversion tracking</p>
                    </div>
                </div>
                <Link href="/xeltr-admin/marketing/analytics"
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-purple-400 transition-colors">
                    Full Report <ArrowUpRight size={10} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    >
                        <Link href={card.href}
                            className="block p-6 rounded-2xl hover-lift group transition-all relative overflow-hidden"
                            style={{ background: card.gradient, border: `1px solid ${card.border}`, boxShadow: `0 0 30px ${card.glow}` }}>
                            {/* Corner glow */}
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full pointer-events-none"
                                style={{ background: `radial-gradient(circle, ${card.glow}, transparent 70%)` }} />
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: card.iconBg, border: `1px solid ${card.border}` }}>
                                    <card.icon size={15} style={{ color: card.iconColor }} />
                                </div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">{card.label}</p>
                            </div>
                            <p className="text-3xl font-black text-white mb-1.5 relative z-10">{card.value}</p>
                            <p className="text-[10px] font-bold text-green-400 relative z-10">{card.change}</p>
                            <ArrowUpRight size={13} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: card.iconColor }} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
