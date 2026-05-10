import React from "react";
import { activityLogs } from "./mockData";
import { Activity, ShieldAlert, UserPlus, RefreshCw, Key } from "lucide-react";

export default function ActivityLogs() {
  const getIcon = (type: string) => {
    switch (type) {
      case "create": return <UserPlus className="h-4 w-4 text-green-500" />;
      case "update": return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case "security": return <Key className="h-4 w-4 text-purple-500" />;
      case "danger": return <ShieldAlert className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-md h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
          <Activity className="h-5 w-5 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {activityLogs.map((log) => (
          <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#080b1a] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(8,11,26,1)]">
              {getIcon(log.type)}
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-white">{log.action}</span>
                <span className="text-xs text-slate-500">{log.time}</span>
              </div>
              <div className="text-xs text-slate-400">
                <span className="text-slate-300">{log.target}</span> by {log.by}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
