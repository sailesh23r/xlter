"use client";

import { useState, useEffect } from "react";
import { Gauge, Search, Box, Timer, Activity, AlertTriangle, ChevronRight } from "lucide-react";
import { PerformanceTable, OptimizationAlert, MonitoringCard } from "@/Components/Admin/Performance/PerformanceComponents";
import { SettingsHeader } from "@/Components/Admin/Settings/SettingsComponents";

export default function PageSpeedPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/admin/performance/speed");
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

  if (loading) return <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Analyzing Speed…</div>;

  if (!data) {
    return (
      <div className="space-y-8">
        <SettingsHeader title="Page Speed" description="Deep dive into page-level performance and bundle metrics." />
        <div className="bg-white/[0.02] border border-white/8 rounded-[28px] py-24 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-gray-700 mx-auto" />
          <p className="text-white font-black uppercase tracking-widest text-sm">No performance data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader 
        title="Page Speed" 
        description="Monitor route performance, bundle sizes, and slow page detection."
        badge="Live Metrics"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MonitoringCard title="Avg. Load Time" value={data.avgLoadTime + "s"} trend={{ val: "0.2s", positive: true }} icon={Timer} />
        <MonitoringCard title="Total Bundle Size" value={data.bundleSize + " MB"} trend={{ val: "1.2MB", positive: false }} icon={Box} />
        <MonitoringCard title="Avg. Render Time" value={data.avgRenderTime + "ms"} icon={Activity} />
        <MonitoringCard title="API Latency" value={data.avgApiLatency + "ms"} trend={{ val: "5ms", positive: true }} icon={Gauge} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black text-white">Route Performance</h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <Search size={14} /> Search Route
            </div>
          </div>
          <PerformanceTable 
            headers={["Route", "Load Time", "Render Time", "API Latency", "Status"]}
            rows={data.routes.map((r: any) => [
              <span key={r.path} className="font-mono text-blue-400">{r.path}</span>,
              r.loadTime + "s",
              r.renderTime + "ms",
              r.apiLatency + "ms",
              <span key={r.path + "-st"} className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${r.loadTime < 1.5 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {r.loadTime < 1.5 ? 'FAST' : 'SLOW'}
              </span>
            ])}
          />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-black text-white">Optimization Alerts</h2>
          <div className="space-y-4">
            {data.alerts.map((alert: any, idx: number) => (
              <OptimizationAlert 
                key={idx}
                title={alert.title}
                description={alert.description}
                severity={alert.severity}
              />
            ))}
            {data.alerts.length === 0 && (
              <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8 text-center text-gray-500 text-xs">
                No optimization issues detected. Great job!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
