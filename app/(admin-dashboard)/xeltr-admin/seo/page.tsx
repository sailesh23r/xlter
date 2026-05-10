"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
    Globe, 
    Search, 
    Map, 
    Braces, 
    ArrowRightLeft,
    Sparkles,
    BarChart3,
    ArrowUpRight,
    TrendingUp
} from "lucide-react";

const seoModules = [
    {
        title: "Metadata",
        description: "Global site titles, descriptions, and Open Graph settings.",
        href: "/xeltr-admin/seo/metadata",
        icon: Globe,
        color: "#3b82f6",
        status: "95% Configured"
    },
    {
        title: "Home Hero SEO",
        description: "Optimization specific to the high-impact landing hero section.",
        href: "/xeltr-admin/seo/hero",
        icon: Sparkles,
        color: "#a855f7",
        status: "Score: 92%"
    },
    {
        title: "Schema Markup",
        description: "Structured data (JSON-LD) for better rich result visibility.",
        href: "/xeltr-admin/seo/schema",
        icon: Braces,
        color: "#10b981",
        status: "Active"
    },
    {
        title: "Sitemap",
        description: "XML sitemap generation and search engine indexing control.",
        href: "/xeltr-admin/seo/sitemap",
        icon: Map,
        color: "#f59e0b",
        status: "Auto-syncing"
    },
    {
        title: "Redirects",
        description: "Manage 301 and 302 redirects to preserve link equity.",
        href: "/xeltr-admin/seo/redirects",
        icon: ArrowRightLeft,
        color: "#ec4899",
        status: "0 Broken"
    }
];

export default function SEODashboard() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-4">
                        <Globe className="w-10 h-10 text-blue-400" /> SEO Command Centre
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">Maximize search visibility and technical health across the platform.</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-500 neon-dot" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Search Sync: Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {seoModules.map((module, i) => (
                    <motion.div
                        key={module.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <Link 
                            href={module.href}
                            className="group block p-8 glass-card-xl hover-lift relative"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5" style={{ color: module.color }}>
                                    <module.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-gray-500 border border-white/10">
                                    {module.status}
                                </span>
                            </div>

                            <h2 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{module.title}</h2>
                            <p className="text-gray-500 text-xs leading-relaxed mb-8">{module.description}</p>

                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
                                Configure <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card-xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <BarChart3 size={120} className="text-blue-400" />
                </div>
                <div className="flex items-center gap-3 mb-10 relative z-10">
                    <BarChart3 className="text-blue-400 w-6 h-6" />
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Visibility Insights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
                    {[
                        { label: "Organic Impressions", value: "85.2k", trend: "+12%", color: "#3b82f6" },
                        { label: "Avg. Position", value: "4.2", trend: "0.1 improvement", color: "#a855f7" },
                        { label: "CTR", value: "3.4%", trend: "+0.5%", color: "#10b981" },
                        { label: "Indexed Pages", value: "42", trend: "Stable", color: "#f59e0b" }
                    ].map((stat, i) => (
                        <div key={i} className="space-y-3">
                            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                            <p className="text-4xl font-black text-white leading-none">{stat.value}</p>
                            <div className="flex items-center gap-2 text-[10px] font-bold" style={{ color: stat.color }}>
                                <TrendingUp size={12} /> {stat.trend}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
