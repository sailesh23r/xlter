"use client";

import { motion } from "framer-motion";
import { FileText, MessageSquare, Layers, Clock, ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ContentItem {
    type: "BLOG" | "TESTIMONIAL" | "CASESTUDY";
    title: string;
    date: string;
    status: string;
}

const TYPE_CONFIG = {
    BLOG:        { icon: FileText,      color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.15)", href: "/xeltr-admin/content/blog",        label: "Blog" },
    TESTIMONIAL: { icon: MessageSquare, color: "#06b6d4", bg: "rgba(6,182,212,0.1)",  border: "rgba(6,182,212,0.15)",  href: "/xeltr-admin/content/testimonials", label: "Testimonial" },
    CASESTUDY:   { icon: Layers,        color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.15)", href: "/xeltr-admin/content/casestudy",    label: "Case Study" },
};

export default function RecentContent({ items }: { items: ContentItem[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card-xl relative overflow-hidden p-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
                        <Clock size={16} style={{ color: "#f59e0b" }} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-wide">Recent Activity</h2>
                        <p className="text-[10px] text-gray-600 mt-0.5">Latest content changes</p>
                    </div>
                </div>
                <Link href="/xeltr-admin/content"
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-purple-400 transition-colors">
                    View All <ArrowUpRight size={10} />
                </Link>
            </div>

            <div className="space-y-2">
                {items?.length > 0 ? (
                    items.map((item, i) => {
                        const cfg = TYPE_CONFIG[item.type];
                        const isPublished = item.status === "PUBLISHED";
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                            >
                                <Link href={cfg.href}
                                    className="flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group hover-lift"
                                    style={{
                                        background: "rgba(255,255,255,0.025)",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                    }}
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                                            <cfg.icon size={15} style={{ color: cfg.color }} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white text-sm font-bold truncate group-hover:text-purple-300 transition-colors">{item.title}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">{cfg.label}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-700" />
                                                <span className="text-[9px] text-gray-600">{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0 ml-4">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                                            style={{
                                                background: isPublished ? "rgba(74,222,128,0.08)" : "rgba(245,158,11,0.08)",
                                                border: `1px solid ${isPublished ? "rgba(74,222,128,0.15)" : "rgba(245,158,11,0.15)"}`,
                                            }}>
                                            {isPublished
                                                ? <CheckCircle size={9} className="text-green-400" />
                                                : <AlertCircle size={9} className="text-yellow-400" />}
                                            <span className={`text-[8px] font-black uppercase tracking-widest ${isPublished ? "text-green-400" : "text-yellow-400"}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <ArrowUpRight size={13} className="text-gray-700 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="py-16 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <FileText size={20} className="text-gray-700" />
                        </div>
                        <p className="text-gray-700 text-xs font-bold uppercase tracking-widest">No recent content activity</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
