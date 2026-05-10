"use client";

import { motion } from "framer-motion";
import { FileText, Layers, MessageSquare, Globe, TrendingUp } from "lucide-react";

interface StatsProps {
  data: { blogs: number; caseStudies: number; testimonials: number; seo: number; };
}

const STATS = [
    {
        key: "blogs" as const,
        name: "Blog Posts",
        icon: FileText,
        gradient: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.08))",
        border: "rgba(168,85,247,0.2)",
        glow: "rgba(168,85,247,0.12)",
        iconColor: "#a855f7",
        iconBg: "rgba(168,85,247,0.12)",
        trend: "+4%",
        trendPos: true,
    },
    {
        key: "caseStudies" as const,
        name: "Case Studies",
        icon: Layers,
        gradient: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(37,99,235,0.06))",
        border: "rgba(59,130,246,0.2)",
        glow: "rgba(59,130,246,0.1)",
        iconColor: "#60a5fa",
        iconBg: "rgba(59,130,246,0.12)",
        trend: "+2%",
        trendPos: true,
    },
    {
        key: "testimonials" as const,
        name: "Testimonials",
        icon: MessageSquare,
        gradient: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(14,165,233,0.06))",
        border: "rgba(6,182,212,0.2)",
        glow: "rgba(6,182,212,0.1)",
        iconColor: "#06b6d4",
        iconBg: "rgba(6,182,212,0.12)",
        trend: "+8%",
        trendPos: true,
    },
    {
        key: "seo" as const,
        name: "SEO Entries",
        icon: Globe,
        gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.06))",
        border: "rgba(16,185,129,0.2)",
        glow: "rgba(16,185,129,0.08)",
        iconColor: "#10b981",
        iconBg: "rgba(16,185,129,0.12)",
        trend: "Stable",
        trendPos: true,
    },
];

export default function StatsCards({ data }: StatsProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
                <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                    role="region"
                    aria-label={`${stat.name} stats`}
                    className="hover-lift relative overflow-hidden rounded-3xl p-6 cursor-default"
                    style={{
                        background: stat.gradient,
                        border: `1px solid ${stat.border}`,
                        boxShadow: `0 0 40px ${stat.glow}`,
                    }}
                >
                    {/* Background glow orb */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
                        style={{ background: `radial-gradient(circle, ${stat.glow}, transparent 70%)` }} />

                    <div className="flex items-start justify-between mb-5 relative z-10">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                            style={{ background: stat.iconBg, border: `1px solid ${stat.border}` }}>
                            <stat.icon size={17} style={{ color: stat.iconColor }} />
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                            style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.15)" }}>
                            <TrendingUp size={9} style={{ color: "#4ade80" }} />
                            <span className="text-[9px] font-black text-green-400">{stat.trend}</span>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 mb-1">{stat.name}</p>
                        <p className="text-3xl font-black text-white leading-none">
                            {(data?.[stat.key] ?? 0).toLocaleString()}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
