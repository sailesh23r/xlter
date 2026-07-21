"use client";

import { useState, useEffect } from "react";
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
    TrendingUp,
    Loader2
} from "lucide-react";

interface MarketingStats {
    leads: number;
    conversionRate: string;
    activeLandingPages: number;
    totalVisitors: number;
}

export default function MarketingDashboardPage() {
    const [stats, setStats] = useState<MarketingStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [analyticsRes, dashRes] = await Promise.all([
                    fetch("/api/admin/marketing/analytics").catch(() => null),
                    fetch("/api/admin/dashboard").catch(() => null),
                ]);
                const analyticsJson = analyticsRes?.ok ? await analyticsRes.json().catch(() => null) : null;
                const dashJson = dashRes?.ok ? await dashRes.json().catch(() => null) : null;

                setStats({
                    leads: analyticsJson?.data?.totalLeads ?? 0,
                    conversionRate: analyticsJson?.data?.conversionRate ?? "0",
                    activeLandingPages: dashJson?.analytics?.marketing?.activeLandingPages ?? 0,
                    totalVisitors: analyticsJson?.data?.totalVisitors ?? 0,
                });
            } catch {
                setStats({ leads: 0, conversionRate: "0", activeLandingPages: 0, totalVisitors: 0 });
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const marketingModules = [
        {
            title: "Analytics",
            description: "Deep-dive into visitor behavior, session duration, and source tracking.",
            href: "/xeltr-admin/marketing/analytics",
            icon: BarChart3,
            color: "#3b82f6",
            status: loading ? "Loading…" : `${stats?.totalVisitors ?? 0} Visitors`,
        },
        {
            title: "Leads",
            description: "Capture, qualify and manage incoming business inquiries.",
            href: "/xeltr-admin/marketing/leads",
            icon: Users,
            color: "#a855f7",
            status: loading ? "Loading…" : `${stats?.leads ?? 0} Total`,
        },
        {
            title: "Landing Pages",
            description: "High-conversion marketing pages and A/B test variants.",
            href: "/xeltr-admin/marketing/landing-pages",
            icon: Layout,
            color: "#10b981",
            status: loading ? "Loading…" : `${stats?.activeLandingPages ?? 0} Live`,
        },
        {
            title: "Tracking Scripts",
            description: "Manage pixel tracking, GTM, and custom marketing scripts.",
            href: "/xeltr-admin/marketing/scripts",
            icon: Code,
            color: "#f59e0b",
            status: "Configure",
        }
    ];

    const conversionRateNum = parseFloat(stats?.conversionRate ?? "0");
    const marketingGrade = conversionRateNum >= 10 ? "A+" : conversionRateNum >= 5 ? "A" : conversionRateNum >= 2 ? "B" : conversionRateNum > 0 ? "C" : "—";

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
                {!loading && (
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                        <Sparkles className="text-purple-400 w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                            {stats?.leads ?? 0} Leads Captured
                        </span>
                    </div>
                )}
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
                {/* Conversion funnel — real data or empty state */}
                <div className="lg:col-span-2 glass-card-xl p-8">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-blue-400 w-5 h-5" /> Conversion Pipeline
                        </h3>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16 text-gray-600">
                            <Loader2 className="w-6 h-6 animate-spin mr-3" /> Loading real data…
                        </div>
                    ) : (stats?.totalVisitors ?? 0) === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                            <TrendingUp className="w-10 h-10 text-gray-700" />
                            <p className="text-gray-600 font-bold text-sm uppercase tracking-widest">No traffic data yet</p>
                            <p className="text-gray-700 text-xs max-w-xs">Once visitors arrive and the analytics middleware records sessions, your conversion pipeline will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {[
                                { label: "Total Visitors", value: stats!.totalVisitors, sub: "Unique Sessions", color: "#3b82f6", pct: 100 },
                                { label: "Leads Generated", value: stats!.leads, sub: "Form Submissions", color: "#a855f7", pct: stats!.totalVisitors > 0 ? Math.min(100, Math.round((stats!.leads / stats!.totalVisitors) * 300)) : 0 },
                                { label: "Converted", value: 0, sub: "Paid Customers", color: "#10b981", pct: 0 },
                            ].map((step, i) => (
                                <div key={step.label} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs font-black text-white uppercase tracking-wider">{step.label}</p>
                                            <p className="text-[10px] text-gray-600 font-bold">{step.sub}</p>
                                        </div>
                                        <p className="text-lg font-black text-white">{step.value.toLocaleString()}</p>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${step.pct}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ background: step.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Marketing Score — real conversion rate */}
                <div className="glass-card-xl p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8">
                        <Zap size={48} className="text-yellow-400 opacity-10" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Marketing Score</h3>
                        {loading ? (
                            <div className="text-6xl font-black text-white mb-2 opacity-30">—</div>
                        ) : (
                            <>
                                <div className="text-6xl font-black text-white mb-2">
                                    {marketingGrade === "—" ? (
                                        <span className="text-gray-600">—</span>
                                    ) : (
                                        <>
                                            {marketingGrade.replace("+", "")}
                                            {marketingGrade.includes("+") && <span className="text-purple-500 text-2xl">+</span>}
                                        </>
                                    )}
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    {conversionRateNum > 0
                                        ? `Conversion rate: ${stats?.conversionRate}% — ${conversionRateNum >= 5 ? "performing above industry average" : "room to improve"}.`
                                        : "No conversion data yet. As leads arrive, your marketing score will populate here."}
                                </p>
                            </>
                        )}
                    </div>
                    
                    <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Quick Actions</p>
                        <div className="flex flex-wrap gap-2">
                            {["Leads", "Analytics", "Landing Pages"].map(c => (
                                <Link
                                    key={c}
                                    href={`/xeltr-admin/marketing/${c.toLowerCase().replace(" ", "-")}`}
                                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-bold hover:border-purple-500/40 transition-all"
                                >
                                    {c}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
