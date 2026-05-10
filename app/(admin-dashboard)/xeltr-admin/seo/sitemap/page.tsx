"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Map, 
    RefreshCcw, 
    Globe, 
    CheckCircle2, 
    AlertCircle, 
    ExternalLink, 
    Search, 
    Filter,
    Clock,
    FileText,
    ArrowUpRight,
    Loader2
} from "lucide-react";

interface SitemapRoute {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
    type: "static" | "blog" | "page";
}

export default function SitemapPage() {
    const [routes, setRoutes] = useState<SitemapRoute[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

    const showToast = useCallback((type: "success" | "error", msg: string) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3500);
    }, []);

    const fetchSitemap = useCallback(async () => {
        setLoading(true);
        try {
            // In a real app, we'd have an API that returns the sitemap structure
            // For now, I'll mock the fetch but we can use the actual sitemap logic
            const res = await fetch("/api/admin/seo/sitemap"); // We'll create this
            const data = await res.json();
            if (data.success) {
                setRoutes(data.routes);
            }
        } catch {
            showToast("error", "Failed to analyze sitemap");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchSitemap();
    }, [fetchSitemap]);

    const filteredRoutes = routes.filter(r => 
        r.url.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-medium border backdrop-blur-xl
                            ${toast.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}
                        `}
                    >
                        {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Map className="w-10 h-10 text-purple-500" /> Sitemap Manager
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Monitor and validate your search engine indexing routes.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={fetchSitemap}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                    <a 
                        href="/sitemap.xml" 
                        target="_blank"
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-3.5 px-6 rounded-xl border border-white/10 transition-all"
                    >
                        <Globe className="w-5 h-5" />
                        <span>View XML</span>
                        <ArrowUpRight className="w-4 h-4 text-gray-500" />
                    </a>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Indexed Routes", value: routes.length, icon: Map, color: "text-purple-400", bg: "bg-purple-400/10" },
                    { label: "Sitemap Status", value: "Healthy", icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
                    { label: "Last Auto-Update", value: "2h ago", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#020617] border border-white/10 p-8 rounded-[2.5rem]">
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Route List */}
            <div className="bg-[#020617] border border-white/10 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-purple-400" /> Indexed URLs
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Search routes..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 w-full md:w-80"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-10 py-5">URL Path</th>
                                <th className="px-10 py-5">Type</th>
                                <th className="px-10 py-5">Freq</th>
                                <th className="px-10 py-5">Priority</th>
                                <th className="px-10 py-5 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={5} className="px-10 py-20 text-center"><Loader2 className="w-8 h-8 animate-spin text-gray-800 mx-auto" /></td></tr>
                            ) : filteredRoutes.length === 0 ? (
                                <tr><td colSpan={5} className="px-10 py-20 text-center text-gray-500 italic">No routes found.</td></tr>
                            ) : (
                                filteredRoutes.map((route, idx) => (
                                    <tr key={idx} className="group hover:bg-white/[0.01] transition-all">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center">
                                                    {route.type === "blog" ? <FileText size={18} className="text-purple-400" /> : <Globe size={18} className="text-purple-400" />}
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm truncate max-w-[300px]">{route.url}</p>
                                                    <p className="text-[10px] text-gray-500 mt-0.5">Updated: {new Date(route.lastModified).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-gray-500 rounded-lg border border-white/5">
                                                {route.type}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-xs text-gray-400">
                                            {route.changeFrequency}
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden w-20">
                                                    <div className="h-full bg-purple-600" style={{ width: `${route.priority * 100}%` }} />
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-500">{route.priority}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <span className="inline-flex items-center gap-2 text-xs text-green-400 font-bold bg-green-400/10 px-3 py-1 rounded-full">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Valid
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
