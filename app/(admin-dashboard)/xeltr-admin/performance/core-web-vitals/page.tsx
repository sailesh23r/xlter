"use client";

import { useState, useEffect } from "react";
import { Smartphone, Monitor, Clock, Zap, Layout, BarChart3, AlertTriangle } from "lucide-react";
import { 
  PerformanceCard, 
  PerformanceStatusBadge, 
  MetricsChart 
} from "@/Components/Admin/Performance/PerformanceComponents";
import { SettingsHeader } from "@/Components/Admin/Settings/SettingsComponents";
import { motion } from "framer-motion";

export default function CoreWebVitalsPage() {
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/admin/performance/metrics?device=${device}`);
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [device]);

  if (loading) return <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Analyzing Vitals…</div>;

  if (!data) {
    return (
      <div className="space-y-8">
        <SettingsHeader title="Core Web Vitals" description="Real-user monitoring and field data for your site's performance." />
        <div className="bg-white/[0.02] border border-white/8 rounded-[28px] py-24 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-gray-700 mx-auto" />
          <p className="text-white font-black uppercase tracking-widest text-sm">No performance data available.</p>
          <p className="text-gray-500 text-xs">Run a performance audit to see your site's vitals.</p>
        </div>
      </div>
    );
  }

  const { metrics, trends } = data;

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader 
        title="Core Web Vitals" 
        description="Monitor how users experience your site based on Google's essential vitals."
        badge="Real Data"
        actions={
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setDevice("mobile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${device === 'mobile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}
            >
              <Smartphone size={14} /> Mobile
            </button>
            <button 
              onClick={() => setDevice("desktop")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${device === 'desktop' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}
            >
              <Monitor size={14} /> Desktop
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <PerformanceCard 
          title="LCP" 
          value={metrics.lcp} 
          unit="ms" 
          type="LCP"
          description="Largest Contentful Paint. Measures loading performance."
          icon={<Zap />}
        />
        <PerformanceCard 
          title="FCP" 
          value={metrics.fcp} 
          unit="ms" 
          type="FCP"
          description="First Contentful Paint. Time to first text/image."
          icon={<Clock />}
        />
        <PerformanceCard 
          title="CLS" 
          value={metrics.cls} 
          unit="" 
          type="CLS"
          description="Cumulative Layout Shift. Measures visual stability."
          icon={<Layout />}
        />
        <PerformanceCard 
          title="INP" 
          value={metrics.inp} 
          unit="ms" 
          type="INP"
          description="Interaction to Next Paint. Measures responsiveness."
          icon={<Smartphone />}
        />
        <PerformanceCard 
          title="TTFB" 
          value={metrics.ttfb} 
          unit="ms" 
          type="TTFB"
          description="Time to First Byte. Server response speed."
          icon={<BarChart3 />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MetricsChart 
          title="LCP Trend (Last 7 Days)" 
          data={trends.lcp} 
          height={200}
        />
        <MetricsChart 
          title="Interaction Responsiveness" 
          data={trends.inp} 
          height={200}
          color="bg-purple-600/40 group-hover:bg-purple-500"
        />
      </div>

      <div className="bg-white/[0.02] border border-white/8 rounded-[28px] p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Vitals Summary</h3>
            <p className="text-sm text-gray-500 mt-1">Overall assessment based on Google's performance standards.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Performance Score", val: metrics.score, type: "SCORE" },
            { label: "Stability Index", val: (1 - metrics.cls).toFixed(2), type: "CLS" },
            { label: "Network Latency", val: metrics.ttfb + "ms", type: "TTFB" },
            { label: "Visual Load", val: metrics.fcp + "ms", type: "FCP" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{item.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-white">{item.val}</span>
                <PerformanceStatusBadge value={parseFloat(item.val as any)} type={item.type as any} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
