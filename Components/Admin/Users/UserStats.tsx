import React from "react";
import { Users, UserCheck, UserX, ShieldCheck, AlertTriangle } from "lucide-react";

interface UserStatsProps {
  stats: {
    total: number;
    active: number;
    suspended: number;
    twoFactorEnabled: number;
    failedLogins: number;
  };
}

export default function UserStats({ stats }: UserStatsProps) {
  const statCards = [
    {
      title: "Total Users",
      value: stats.total,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Active Users",
      value: stats.active,
      icon: UserCheck,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      title: "Suspended",
      value: stats.suspended,
      icon: UserX,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      title: "2FA Enabled",
      value: stats.twoFactorEnabled,
      icon: ShieldCheck,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      title: "Failed Logins",
      value: stats.failedLogins,
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-3xl border border-white/5 bg-white/5 p-5 backdrop-blur-md transition-all hover:bg-white/10 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-400">{stat.title}</span>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.bg} ${stat.border} border`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </div>
        );
      })}
    </div>
  );
}
