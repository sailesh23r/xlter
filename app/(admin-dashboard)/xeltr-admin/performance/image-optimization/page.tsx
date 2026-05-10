"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, ShieldCheck, Zap, AlertTriangle, FileWarning, CheckCircle } from "lucide-react";
import { OptimizationAlert, PerformanceTable } from "@/Components/Admin/Performance/PerformanceComponents";
import { SettingsHeader } from "@/Components/Admin/Settings/SettingsComponents";

export default function ImageOptimizationPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/admin/performance/images");
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

  if (loading) return <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Auditing Images…</div>;

  if (!data) {
    return (
      <div className="space-y-8">
        <SettingsHeader title="Image Optimization" description="Analyze image assets for size, format, and loading efficiency." />
        <div className="bg-white/[0.02] border border-white/8 rounded-[28px] py-24 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-gray-700 mx-auto" />
          <p className="text-white font-black uppercase tracking-widest text-sm">No image audit data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader 
        title="Image Optimization" 
        description="Monitor image assets, next/image usage, and automated compression."
        badge="Asset Audit"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.02] border border-white/8 rounded-[28px] p-8 flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <ShieldCheck size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Next/Image Usage</p>
            <h3 className="text-3xl font-black text-white">{data.nextImageUsage}%</h3>
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/8 rounded-[28px] p-8 flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-green-500/10 flex items-center justify-center text-green-400">
            <Zap size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Avg. Size Reduction</p>
            <h3 className="text-3xl font-black text-white">{data.avgReduction}%</h3>
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/8 rounded-[28px] p-8 flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <ImageIcon size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">WebP/AVIF Serving</p>
            <h3 className="text-3xl font-black text-white">{data.webpStatus}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-black text-white flex items-center gap-3">
            <FileWarning className="text-yellow-500" /> Critical Warnings
          </h2>
          <div className="space-y-4">
            {data.warnings.map((w: any, i: number) => (
              <OptimizationAlert key={i} title={w.title} description={w.description} severity={w.severity} />
            ))}
            {data.warnings.length === 0 && (
              <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8 text-center">
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <p className="text-white font-bold">All images optimized.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-black text-white">Large Image Assets</h2>
          <PerformanceTable 
            headers={["Asset", "Original", "Optimized", "Saved"]}
            rows={data.assets.map((a: any) => [
              <div key={a.name} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.url} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-mono text-gray-400 truncate max-w-[120px]">{a.name}</span>
              </div>,
              a.originalSize,
              a.optimizedSize,
              <span key={a.name + "-sav"} className="text-green-400 font-bold">{a.saved}</span>
            ])}
          />
        </div>
      </div>
    </div>
  );
}
