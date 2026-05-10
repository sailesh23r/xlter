"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Clock, 
  Layout, 
  BarChart, 
  Smartphone, 
  Monitor, 
  AlertCircle, 
  CheckCircle, 
  Info,
  ChevronRight
} from "lucide-react";

// ─── Status Badge ──────────────────────────────────────────────────────────
export const PerformanceStatusBadge = ({ 
  value, 
  type 
}: { 
  value: number | string, 
  type: "LCP" | "FCP" | "CLS" | "INP" | "TTFB" | "SCORE" 
}) => {
  let status: "good" | "needs-improvement" | "poor" = "good";
  
  if (type === "LCP") {
    const v = Number(value);
    if (v > 4000) status = "poor";
    else if (v > 2500) status = "needs-improvement";
  } else if (type === "FCP") {
    const v = Number(value);
    if (v > 3000) status = "poor";
    else if (v > 1800) status = "needs-improvement";
  } else if (type === "CLS") {
    const v = Number(value);
    if (v > 0.25) status = "poor";
    else if (v > 0.1) status = "needs-improvement";
  } else if (type === "INP") {
    const v = Number(value);
    if (v > 500) status = "poor";
    else if (v > 200) status = "needs-improvement";
  } else if (type === "TTFB") {
    const v = Number(value);
    if (v > 1800) status = "poor";
    else if (v > 800) status = "needs-improvement";
  } else if (type === "SCORE") {
    const v = Number(value);
    if (v < 50) status = "poor";
    else if (v < 90) status = "needs-improvement";
  }

  const colors = {
    good: "bg-green-500/10 text-green-400 border-green-500/20",
    "needs-improvement": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    poor: "bg-red-500/10 text-red-400 border-red-500/20"
  };

  return (
    <span className={`px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${colors[status]}`}>
      {status.replace("-", " ")}
    </span>
  );
};

// ─── Performance Card ────────────────────────────────────────────────────────
export const PerformanceCard = ({
  title,
  value,
  unit,
  type,
  description,
  icon
}: {
  title: string;
  value: number;
  unit: string;
  type: "LCP" | "FCP" | "CLS" | "INP" | "TTFB" | "SCORE";
  description: string;
  icon?: React.ReactNode;
}) => (
  <div className="bg-white/[0.02] border border-white/8 rounded-[28px] p-6 backdrop-blur-sm hover:border-white/15 transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
        {icon || <Zap size={18} />}
      </div>
      <PerformanceStatusBadge value={value} type={type} />
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-3xl font-black text-white">{value}</h3>
        <span className="text-sm font-bold text-gray-600">{unit}</span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed pt-2">{description}</p>
    </div>
  </div>
);

// ─── Metrics Chart (Simple Bar) ──────────────────────────────────────────────
export const MetricsChart = ({ 
  data, 
  title, 
  height = 120,
  color 
}: { 
  data: { label: string; value: number; color?: string }[];
  title: string;
  height?: number;
  color?: string;
}) => (
  <div className="bg-white/[0.02] border border-white/8 rounded-[28px] p-8">
    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">{title}</h4>
    <div className="flex items-end justify-between gap-4" style={{ height }}>
      {data.map((item, idx) => {
        const max = Math.max(...data.map(d => d.value));
        const percentage = (item.value / max) * 100;
        return (
          <div key={idx} className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full relative group">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${percentage}%` }}
                className={`w-full rounded-t-xl transition-all ${item.color || color || 'bg-blue-600/40 group-hover:bg-blue-500'}`}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-white">
                {item.value}
              </div>
            </div>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest text-center truncate w-full">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

// ─── Performance Table ───────────────────────────────────────────────────────
export const PerformanceTable = ({
  headers,
  rows
}: {
  headers: string[];
  rows: any[][];
}) => (
  <div className="bg-[#020617] border border-white/10 rounded-[28px] overflow-hidden">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-white/5">
          {headers.map((h, i) => (
            <th key={i} className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {rows.map((row, i) => (
          <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="px-8 py-5 text-sm">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Optimization Alert ──────────────────────────────────────────────────────
export const OptimizationAlert = ({
  title,
  description,
  severity = "warning"
}: {
  title: string;
  description: string;
  severity?: "warning" | "critical" | "info";
}) => {
  const styles = {
    warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
    critical: "border-red-500/20 bg-red-500/5 text-red-400",
    info: "border-blue-500/20 bg-blue-500/5 text-blue-400"
  };
  
  return (
    <div className={`p-5 rounded-2xl border flex gap-4 ${styles[severity]}`}>
      <AlertCircle size={20} className="flex-shrink-0" />
      <div>
        <h5 className="text-sm font-black uppercase tracking-widest mb-1">{title}</h5>
        <p className="text-xs opacity-70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// ─── Monitoring Card ─────────────────────────────────────────────────────────
export const MonitoringCard = ({
  title,
  value,
  trend,
  icon: Icon
}: {
  title: string;
  value: string;
  trend?: { val: string; positive: boolean };
  icon: any;
}) => (
  <div className="bg-white/[0.02] border border-white/8 rounded-[24px] p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
        <Icon size={18} />
      </div>
      {trend && (
        <span className={`text-[10px] font-black uppercase ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
          {trend.positive ? '+' : '-'}{trend.val}
        </span>
      )}
    </div>
    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-2xl font-black text-white">{value}</h3>
  </div>
);
