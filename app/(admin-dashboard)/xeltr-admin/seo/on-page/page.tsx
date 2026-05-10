"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
    Layout, 
    FileText, 
    Search, 
    Users, 
    Briefcase, 
    Mail, 
    ArrowUpRight, 
    ShieldCheck, 
    Activity,
    Globe,
    Zap,
    TrendingUp,
    CheckCircle2,
    Eye
} from "lucide-react";

const keyPages = [
    {
        title: "Homepage",
        route: "/",
        description: "Primary landing page and brand introduction.",
        icon: Layout,
        color: "#3b82f6",
        score: "98/100",
        status: "Optimized"
    },
    {
        title: "Services",
        route: "/services",
        description: "Showcase of core offerings and value props.",
        icon: Zap,
        color: "#a855f7",
        score: "92/100",
        status: "Good"
    },
    {
        title: "Case Studies",
        route: "/work",
        description: "Portfolio of success stories and results.",
        icon: Briefcase,
        color: "#10b981",
        score: "88/100",
        status: "Action Required"
    },
    {
        title: "Blog",
        route: "/blog",
        description: "Insights, articles and thought leadership.",
        icon: FileText,
        color: "#f59e0b",
        score: "95/100",
        status: "Optimized"
    },
    {
        title: "About Us",
        route: "/about",
        description: "Company mission, vision and team details.",
        icon: Users,
        color: "#ec4899",
        score: "91/100",
        status: "Optimized"
    },
    {
        title: "Contact",
        route: "/contact",
        description: "Lead generation and communication hub.",
        icon: Mail,
        color: "#6366f1",
        score: "96/100",
        status: "Optimized"
    }
];

export default function OnPageSEODashboard() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                            SEO Strategy Hub
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                        On-Page SEO <TrendingUp className="w-8 h-8 text-green-400" />
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg max-w-2xl">Manage content optimization, meta tags, and technical health for your core business pages.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="px-6 py-4 rounded-3xl bg-[#020617] border border-white/10 flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Global Health</p>
                            <p className="text-xl font-black text-white">94.2%</p>
                        </div>
                        <div className="w-px h-10 bg-white/5" />
                        <Activity className="w-6 h-6 text-green-500" />
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "Indexed Pages", value: "6/6", icon: Globe, color: "text-blue-400" },
                    { label: "Avg. Performance", value: "92ms", icon: Zap, color: "text-yellow-400" },
                    { label: "SEO Warnings", value: "2", icon: ShieldCheck, color: "text-purple-400" }
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#020617] border border-white/10 p-8 rounded-[32px] group hover:border-white/20 transition-all"
                    >
                        <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white mt-1 tracking-tighter">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Key Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {keyPages.map((page, i) => (
                    <motion.div
                        key={page.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                        <Link 
                            href={`/xeltr-admin/seo/metadata?search=${page.route}`}
                            className="group block bg-[#020617] border border-white/10 rounded-[40px] p-8 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 transition-all relative overflow-hidden"
                        >
                            {/* Accent Background */}
                            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[100px] opacity-10 transition-opacity group-hover:opacity-20" style={{ backgroundColor: page.color }} />
                            
                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-transform group-hover:scale-110" style={{ color: page.color }}>
                                    <page.icon className="w-7 h-7" />
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: page.color }}>
                                        <CheckCircle2 size={12} /> {page.status}
                                    </div>
                                    <div className="text-xl font-black text-white">{page.score}</div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-white transition-colors">{page.title}</h2>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8">{page.description}</p>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        Route: <span className="text-white">{page.route}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:translate-x-2 transition-transform">
                                        Optimize <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Analysis Tool Mockup/Info */}
            <div className="bg-[#020617] border border-white/10 rounded-[48px] p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Zap size={240} className="text-blue-500" />
                </div>
                
                <div className="flex-1 space-y-6 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Eye className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">On-Page Health Audit</h3>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed">Our advanced algorithm analyzes your core pages daily for keyword density, layout shifts, and semantic relevance. Stay ahead of search updates automatically.</p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-xl">
                            Run Full Audit
                        </button>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
                            View Report History
                        </button>
                    </div>
                </div>
                
                <div className="w-full md:w-80 grid grid-cols-2 gap-4 relative z-10">
                    {[
                        { label: "Content Quality", val: "A+" },
                        { label: "Alt Attributes", val: "92%" },
                        { label: "Meta Symmetry", val: "Match" },
                        { label: "H-Tags", val: "Clean" }
                    ].map((m, i) => (
                        <div key={i} className="p-6 bg-white/2 border border-white/5 rounded-[24px] text-center">
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">{m.label}</p>
                            <p className="text-2xl font-black text-white">{m.val}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
