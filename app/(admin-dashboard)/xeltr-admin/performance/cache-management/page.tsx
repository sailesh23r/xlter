"use client";

import { useState, useEffect } from "react";
import { Database, RefreshCw, Globe, ShieldCheck, AlertCircle, Zap } from "lucide-react";
import { SettingsHeader } from "@/Components/Admin/Settings/SettingsComponents";
import { PerformanceCard, OptimizationAlert } from "@/Components/Admin/Performance/PerformanceComponents";

export default function CacheManagementPage() {
  const [loading, setLoading] = useState(true);
  const [purging, setPurging] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/admin/performance/cache");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  const handlePurge = async () => {
    setPurging(true);
    try {
      await fetch("/api/admin/performance/cache/purge", { method: "POST" });
      alert("Global cache purged successfully.");
    } catch (e) {
      console.error(e);
    } finally {
      setPurging(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Loading Cache Status…</div>;

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader 
        title="Cache Management" 
        description="Monitor and control CDN, edge, and browser caching layers."
        badge="Edge Control"
        actions={
          <button 
            onClick={handlePurge}
            disabled={purging}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-red-600/20 uppercase tracking-widest text-xs disabled:opacity-60"
          >
            {purging ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            {purging ? "Purging…" : "Purge Global Cache"}
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PerformanceCard 
          title="Cache Hit Rate" 
          value={data?.hitRate || 0} 
          unit="%" 
          type="SCORE"
          description="Percentage of requests served from edge cache."
          icon={<Globe />}
        />
        <PerformanceCard 
          title="Edge TTL" 
          value={data?.edgeTtl || 0} 
          unit="hrs" 
          type="TTFB"
          description="Time-to-live for assets in the CDN layer."
          icon={<Database />}
        />
        <PerformanceCard 
          title="Purge Events" 
          value={data?.purgeCount || 0} 
          unit="last 24h" 
          type="INP"
          description="Number of manual and automatic cache purges."
          icon={<RefreshCw />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/[0.02] border border-white/8 rounded-[28px] p-8 space-y-6">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
            <ShieldCheck className="text-blue-400" /> Header Policies
          </h3>
          <div className="space-y-4">
            {data?.policies.map((p: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div>
                  <p className="text-sm font-bold text-white">{p.name}</p>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">{p.value}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${p.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
            <AlertCircle className="text-yellow-500" /> Recommendations
          </h3>
          <div className="space-y-4">
            <OptimizationAlert 
              title="Leverage Browser Caching"
              description="Increase Cache-Control max-age for static assets to reduce server load."
              severity="warning"
            />
            <OptimizationAlert 
              title="Stale-While-Revalidate"
              description="Enable SWR for blog routes to improve perceived performance."
              severity="info"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
