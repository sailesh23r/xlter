"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Clock, 
  Server, 
  Globe, 
  Loader2, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCcw,
  AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

export default function PerformanceMonitoringPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulate real-time monitoring data
    setTimeout(() => {
      setData({
        realtime: [
          { time: "12:00", latency: 120, server: 45 },
          { time: "12:05", latency: 145, server: 52 },
          { time: "12:10", latency: 110, server: 48 },
          { time: "12:15", latency: 130, server: 55 },
          { time: "12:20", latency: 250, server: 85 },
          { time: "12:25", latency: 180, server: 60 },
          { time: "12:30", latency: 125, server: 42 }
        ],
        metrics: [
          { label: "Avg API Latency", val: "142ms", trend: "down", change: "12%", icon: Activity, color: "text-blue-500" },
          { label: "Server Response", val: "48ms", trend: "up", change: "4%", icon: Server, color: "text-green-500" },
          { label: "Global Edge Latency", val: "24ms", trend: "down", change: "2%", icon: Globe, color: "text-purple-500" },
          { label: "Error Rate", val: "0.04%", trend: "up", change: "0.01%", icon: AlertCircle, color: "text-red-500" }
        ],
        logs: [
          { id: 1, type: "API", event: "GET /api/v1/content", duration: "184ms", status: 200, time: "2 min ago" },
          { id: 2, type: "SERVER", event: "SSR Render /blog", duration: "42ms", status: 200, time: "5 min ago" },
          { id: 3, type: "API", event: "POST /api/v1/auth", duration: "342ms", status: 401, time: "12 min ago" },
          { id: 4, type: "DB", event: "Query AdminCollection", duration: "12ms", status: "OK", time: "15 min ago" }
        ]
      });
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Live System Monitoring</h1>
          <p className="text-slate-500 font-medium text-sm">Real-time API latency and server infrastructure telemetry.</p>
        </div>
        <button className="p-3 bg-slate-900 border border-white/10 rounded-xl text-white hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest">
          <RefreshCcw size={14} /> Refresh Stream
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.metrics.map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                <item.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${item.trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
                {item.trend === 'down' ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                {item.change}
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{item.label}</p>
            <h3 className="text-2xl font-black text-white">{item.val}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latency Chart */}
        <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock size={20} className="text-blue-500" /> API Latency (ms)
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Server</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.realtime}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${val}ms`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorLatency)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="server" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={0} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Logs */}
        <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl">
          <h2 className="text-xl font-bold text-white mb-8">Performance Logs</h2>
          <div className="space-y-4">
            {data.logs.map((log: any) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${log.status === 200 || log.status === 'OK' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{log.type}</span>
                      <h4 className="text-sm font-bold text-white">{log.event}</h4>
                    </div>
                    <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest mt-1">{log.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-white group-hover:text-blue-500 transition-colors">{log.duration}</span>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">Response</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
            View All Infrastructure Logs
          </button>
        </div>
      </div>
    </div>
  );
}
