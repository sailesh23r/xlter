"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    Filter, 
    Download, 
    MoreHorizontal, 
    ChevronRight, 
    TrendingUp, 
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    Layout
} from "lucide-react";

// --- Dashboard Header ---
export const MarketingHeader = ({ title, description, badge, actions }: { 
    title: string; 
    description: string; 
    badge?: string; 
    actions?: React.ReactNode 
}) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black text-white tracking-tight uppercase">{title}</h1>
                {badge && (
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-gray-500 font-medium max-w-xl leading-relaxed">{description}</p>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
);

// --- Stats Card ---
export const MarketingStatsCard = ({ label, value, icon, trend, description }: {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: { value: string; isPositive: boolean };
    description?: string;
}) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="bg-[#020617] border border-white/10 rounded-[32px] p-8 flex flex-col justify-between group hover:border-blue-500/30 transition-all relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />
        <div className="flex items-start justify-between relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trend.value}
                </div>
            )}
        </div>
        <div className="mt-8 relative z-10">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{label}</p>
            <h3 className="text-3xl font-black text-white">{value}</h3>
            {description && <p className="text-xs text-gray-600 mt-2 font-medium">{description}</p>}
        </div>
    </motion.div>
);

// --- Status Badge ---
export const MarketingStatusBadge = ({ status, type = "info" }: { 
    status: string; 
    type?: "success" | "error" | "warning" | "info" | "neutral" 
}) => {
    const colors = {
        success: "bg-green-500/10 text-green-400 border-green-500/20",
        error: "bg-red-500/10 text-red-400 border-red-500/20",
        warning: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        neutral: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    };
    return (
        <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${colors[type]}`}>
            {status}
        </span>
    );
};

// --- Search & Filter Bar ---
export const MarketingFilterBar = ({ 
    onSearch, 
    onExport, 
    searchPlaceholder = "Search..." 
}: { 
    onSearch: (val: string) => void;
    onExport?: () => void;
    searchPlaceholder?: string;
}) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
                type="text" 
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-5 text-sm text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
            />
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-white/10 transition-all">
                <Filter size={14} /> Filter
            </button>
            {onExport && (
                <button 
                    onClick={onExport}
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-2xl px-5 py-3.5 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all"
                >
                    <Download size={14} /> Export CSV
                </button>
            )}
        </div>
    </div>
);

// --- Table Wrapper ---
export const MarketingTable = ({ children, headers }: { children: React.ReactNode, headers: string[] }) => (
    <div className="bg-[#020617] border border-white/10 rounded-[32px] overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5">
                        {headers.map((header, i) => (
                            <th key={i} className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {children}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Analytics Chart (Simplified) ---
export const MarketingChart = ({ data, height = 300 }: { data: any[], height?: number }) => (
    <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Traffic Overview</h3>
            <div className="flex gap-2">
                {['Day', 'Week', 'Month'].map(t => (
                    <button key={t} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${t === 'Week' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}>
                        {t}
                    </button>
                ))}
            </div>
        </div>
        <div style={{ height: `${height}px` }} className="flex items-end justify-between gap-2">
            {data.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-600 italic text-sm">No data available.</div>
            ) : (
                data.map((item, i) => (
                    <div key={i} className="flex-1 group relative flex flex-col items-center justify-end h-full">
                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-black py-1 px-2 rounded-md whitespace-nowrap z-20">
                            {item.value} visits
                        </div>
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.value / 1000) * 100}%` }}
                            className="w-full max-w-[40px] bg-blue-500/20 group-hover:bg-blue-500/40 rounded-t-lg transition-colors border-t-2 border-blue-500/50"
                        />
                        <span className="text-[9px] font-black text-gray-600 mt-4 uppercase tracking-widest">{item.label}</span>
                    </div>
                ))
            )}
        </div>
    </div>
);
