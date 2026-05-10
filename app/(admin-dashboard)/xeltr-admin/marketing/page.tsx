"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
    BarChart3, 
    Users, 
    Layout, 
    Code, 
    ArrowUpRight, 
    Sparkles, 
    Target,
    Zap,
    TrendingUp
} from "lucide-react";

const marketingModules = [
    {
        title: "Analytics",
        description: "Deep-dive into visitor behavior, session duration, and source tracking.",
        href: "/xeltr-admin/marketing/analytics",
        icon: BarChart3,
        color: "#3b82f6",
        status: "Real-time"
    },
    {
        title: "Leads",
        description: "Capture, qualify and manage incoming business inquiries.",
        href: "/xeltr-admin/marketing/leads",
        icon: Users,
        color: "#a855f7",
        status: "12 New Today"
    },
    {
        title: "Landing Pages",
        description: "High-conversion marketing pages and A/B test variants.",
        href: "/xeltr-admin/marketing/landing-pages",
        icon: Layout,
        color: "#10b981",
        status: "4 Live"
    },
    {
        title: "Tracking Scripts",
        description: "Manage pixel tracking, GTM, and custom marketing scripts.",
        href: "/xeltr-admin/marketing/scripts",
        icon: Code,
        color: "#f59e0b",
        status: "Verified"
    }
];

export default function MarketingDashboardPage() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-4">
                        <Target className="w-10 h-10 text-purple-500" /> Marketing Intelligence
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">Harness data to drive growth and optimize conversion funnels.</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                    <Sparkles className="text-purple-400 w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">AI Growth Suggestions: 3</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketingModules.map((module, i) => (
                    <motion.div
                        key={module.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <Link 
                            href={module.href}
                            className="group block p-8 glass-card-xl hover-lift relative overflow-hidden"
                        >
                            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-5 blur-2xl" style={{ background: module.color }} />
                            
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5" style={{ color: module.color }}>
                                    <module.icon className="w-5 h-5" />
                                </div>
                            </div>

                            <h2 className="text-lg font-black text-white mb-2 group-hover:text-purple-400 transition-colors uppercase tracking-tight">{module.title}</h2>
                            <p className="text-gray-500 text-[11px] leading-relaxed mb-8">{module.description}</p>

                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">
                                    {module.status}
                                </span>
                                <ArrowUpRight size={14} className="text-gray-700 group-hover:text-purple-400 transition-colors" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card-xl p-8">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-blue-400 w-5 h-5" /> Conversion Pipeline
                        </h3>
                        <div className="flex gap-2">
                            {["7D", "30D", "90D"].map(p => (
                                <button key={p} className="px-3 py-1 rounded-lg text-[9px] font-black border border-white/5 bg-white/5 text-gray-500 hover:text-white transition-all">
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        {[
                            { label: "Awareness", value: 124500, sub: "Unique Visitors", color: "#3b82f6", width: "100%" },
                            { label: "Interest", value: 18400, sub: "Page Interactions", color: "#a855f7", width: "65%" },
                            { label: "Consideration", value: 4200, sub: "Qualified Leads", color: "#ec4899", width: "35%" },
                            { label: "Conversion", value: 840, sub: "Successful Signups", color: "#10b981", width: "12%" },
                        ].map((step, i) => (
                            <div key={step.label} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs font-black text-white uppercase tracking-wider">{step.label}</p>
                                        <p className="text-[10px] text-gray-600 font-bold">{step.sub}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-white">{step.value.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: step.width }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{ background: step.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card-xl p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8">
                        <Zap size={48} className="text-yellow-400 opacity-10" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Marketing Score</h3>
                        <div className="text-6xl font-black text-white mb-2">A<span className="text-purple-500 text-2xl">+</span></div>
                        <p className="text-gray-500 text-xs leading-relaxed">Your funnels are performing 24% better than industry average for digital agencies.</p>
                    </div>
                    
                    <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Top Growth Channels</p>
                        <div className="flex flex-wrap gap-2">
                            {["Organic", "Referral", "Direct", "Social"].map(c => (
                                <span key={c} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-bold">
                                    {c}
                                </span>
                            ))}
                        </div>
                        <button className="w-full py-4 rounded-2xl bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20">
                            Download Growth Report
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
