"use client";

import { useState, useEffect } from "react";
import { 
    Users, 
    MousePointer2, 
    RefreshCcw, 
    BarChart3, 
    PieChart, 
    Globe, 
    Smartphone, 
    Monitor,
    Calendar,
    ArrowUpRight
} from "lucide-react";
import { 
    MarketingHeader, 
    MarketingStatsCard, 
    MarketingChart, 
    MarketingFilterBar,
    MarketingTable,
    MarketingStatusBadge
} from "@/Components/Admin/Marketing/MarketingComponents";

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch("/api/admin/marketing/analytics");
                const json = await res.json();
                if (json.success) setData(json.data);
            } catch (err) {
                console.error("Failed to fetch analytics:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-20 text-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">Loading real-time data...</div>;

    if (!data || data.totalVisitors === 0) {
        return (
            <div className="space-y-8">
                <MarketingHeader 
                    title="Analytics" 
                    description="Real-time traffic and conversion insights."
                    badge="Live"
                />
                <div className="bg-[#020617] border border-white/10 rounded-[40px] p-20 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                        <BarChart3 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">No data available.</h3>
                    <p className="text-gray-500 max-w-sm">We haven't recorded any traffic yet. Once visitors start arriving, your analytics will appear here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-20">
            <MarketingHeader 
                title="Analytics" 
                description="Monitor your growth, traffic sources, and conversion performance."
                badge="Real-time"
                actions={
                    <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-6 py-3.5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Calendar size={14} /> Last 30 Days
                    </button>
                }
            />

            {/* Core Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MarketingStatsCard 
                    label="Total Visitors" 
                    value={data.totalVisitors.toLocaleString()} 
                    icon={<Users />}
                    trend={{ value: "12%", isPositive: true }}
                />
                <MarketingStatsCard 
                    label="Leads Generated" 
                    value={data.totalLeads.toLocaleString()} 
                    icon={<MousePointer2 />}
                    trend={{ value: "8%", isPositive: true }}
                />
                <MarketingStatsCard 
                    label="Conversion Rate" 
                    value={`${data.conversionRate}%`} 
                    icon={<RefreshCcw />}
                    trend={{ value: "2.4%", isPositive: true }}
                />
                <MarketingStatsCard 
                    label="Bounce Rate" 
                    value={`${data.bounceRate}%`} 
                    icon={<PieChart />}
                    trend={{ value: "1.2%", isPositive: false }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-8">
                    <MarketingChart data={data.dailyTraffic} />
                </div>

                {/* Traffic Sources */}
                <div className="lg:col-span-4">
                    <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8 h-full">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Traffic Sources</h3>
                        <div className="space-y-6">
                            {data.sources.map((source: any, i: number) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500">
                                            <Globe size={14} />
                                        </div>
                                        <span className="text-sm text-gray-400 font-medium">{source.name}</span>
                                    </div>
                                    <span className="text-sm text-white font-bold">{source.percent}%</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Device Distribution</h4>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Monitor size={14} className="text-blue-500" />
                                    <span className="text-xs text-white font-bold">{data.devices.desktop}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Smartphone size={14} className="text-purple-500" />
                                    <span className="text-xs text-white font-bold">{data.devices.mobile}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Landing Pages */}
                <div className="lg:col-span-8">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Top Landing Pages</h3>
                    <MarketingTable headers={["Page Path", "Views", "Visitors", "Avg. Time", "Conversions"]}>
                        {data.topPages.map((page: any, i: number) => (
                            <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <code className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors">{page.path}</code>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-sm text-white font-bold">{page.views.toLocaleString()}</td>
                                <td className="px-8 py-5 text-sm text-gray-500">{page.visitors.toLocaleString()}</td>
                                <td className="px-8 py-5 text-sm text-gray-500">{page.avgTime}</td>
                                <td className="px-8 py-5 text-right">
                                    <MarketingStatusBadge status={`${page.conversions} Leads`} type="success" />
                                </td>
                            </tr>
                        ))}
                    </MarketingTable>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-4">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Recent Activity</h3>
                    <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8 space-y-6">
                        {data.recentLeads?.length > 0 ? (
                            data.recentLeads.map((lead: any, i: number) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs font-black">
                                        {lead.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white">{lead.name}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">New lead from {lead.source}</p>
                                        <p className="text-[9px] text-gray-600 mt-1">{lead.timeAgo}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-600 italic text-sm">No recent activity.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
