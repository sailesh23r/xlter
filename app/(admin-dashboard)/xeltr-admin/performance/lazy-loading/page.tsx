"use client";

import { motion } from "framer-motion";
import { Zap, AlertTriangle, CheckCircle2, Search, Filter, Loader2, MousePointer2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function LazyLoadingPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching real lazy loading data
    setTimeout(() => {
      setData({
        stats: {
          totalComponents: 142,
          lazyLoaded: 84,
          savings: "1.4MB",
          status: "Optimal"
        },
        warnings: [
          { id: 1, component: "HeroImage.tsx", issue: "Above the fold image lazy-loaded", impact: "LCP Delay", severity: "High" },
          { id: 2, component: "Testimonials.tsx", issue: "Large component not dynamic", impact: "Main Thread", severity: "Medium" },
          { id: 3, component: "Footer.tsx", issue: "Unnecessary eager loading", impact: "TBT", severity: "Low" }
        ],
        monitor: [
          { path: "/app/Components/Admin/Sidebar", method: "Dynamic", size: "12KB", loaded: "On Interaction" },
          { path: "/app/Components/SEO/Charts", method: "Dynamic", size: "84KB", loaded: "On Viewport" },
          { path: "/app/Components/Common/Modal", method: "Dynamic", size: "4KB", loaded: "On Trigger" }
        ]
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="text-white">No lazy loading data available.</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Lazy Loading & Imports</h1>
          <p className="text-slate-500 font-medium">Monitoring code-splitting and dynamic import efficiency.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
            <Filter size={14} /> Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all">
            Scan Codebase
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Dynamic Components", val: data.stats.lazyLoaded, total: data.stats.totalComponents, icon: Zap, color: "text-blue-500" },
          { label: "Bundle Savings", val: data.stats.savings, icon: CheckCircle2, color: "text-green-500" },
          { label: "Optimization Status", val: data.stats.status, icon: MousePointer2, color: "text-purple-500" },
          { label: "Total Components", val: data.stats.totalComponents, icon: Search, color: "text-slate-500" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl"
          >
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color} mb-4`}>
              <item.icon size={20} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{item.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-white">{item.val}</h3>
              {item.total && <span className="text-slate-600 text-sm">/ {item.total}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Warnings */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-500" /> Critical Warnings
          </h2>
          <div className="space-y-4">
            {data.warnings.map((warn: any) => (
              <div key={warn.id} className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl group hover:bg-amber-500/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-500">
                    {warn.severity}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{warn.impact}</span>
                </div>
                <h4 className="text-white font-bold mb-1">{warn.component}</h4>
                <p className="text-slate-400 text-xs">{warn.issue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Import Table */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white">Import Activity Monitor</h2>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Component Path</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Method</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Chunk Size</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.monitor.map((item: any, i: number) => (
                  <tr key={i} className="group hover:bg-white/5 transition-all">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-300">{item.path}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-blue-500/10 text-blue-500">
                        {item.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{item.size}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-500">{item.loaded}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
