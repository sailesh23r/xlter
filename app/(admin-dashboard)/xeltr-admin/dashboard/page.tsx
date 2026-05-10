"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowUpRight, AlertCircle, RefreshCw, Sparkles } from "lucide-react";

import StatsCards         from "@/Components/Admin/Dashboard/StatsCards";
import SEOHealthCard      from "@/Components/Admin/Dashboard/SEOHealthCard";
import TrafficOverview    from "@/Components/Admin/Dashboard/TrafficOverview";
import SecurityPanel      from "@/Components/Admin/Dashboard/SecurityPanel";
import DashboardSkeleton  from "@/Components/Admin/Dashboard/DashboardSkeleton";
import MarketingOverview  from "@/Components/Admin/Dashboard/MarketingOverview";
import RecentContent      from "@/Components/Admin/Dashboard/RecentContent";

import { DashboardData, AdminUser } from "./types";

export default function AdminDashboard() {
  const [data, setData]     = useState<DashboardData | null>(null);
  const [user, setUser]     = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [analyticsRes, userRes] = await Promise.all([
        fetch("/api/admin/marketing/analytics"),
        fetch("/api/admin/me"),
      ]);

      if (!analyticsRes.ok || !userRes.ok) {
        if (analyticsRes.status === 401 || userRes.status === 401) {
          window.location.href = "/xeltr-admin/login";
          return;
        }
        throw new Error("Failed to synchronize with server intelligence.");
      }

      const [analyticsJson, userJson] = await Promise.all([
        analyticsRes.json(),
        userRes.json(),
      ]);

      if (analyticsJson.success) setData(analyticsJson.analytics);
      if (userJson.success)      setUser(userJson.admin);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A critical system error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* ── States ── */
  if (loading) return <DashboardSkeleton />;

  if (error || !data) return (
    <div className="flex flex-col items-center justify-center py-40 text-center">
      <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-6"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <AlertCircle className="w-7 h-7 text-red-400" />
      </div>
      <h2 className="text-white font-black text-2xl mb-2 uppercase tracking-tight">Sync Failure</h2>
      <p className="text-gray-600 max-w-md mb-8 text-sm leading-relaxed">{error ?? "Could not retrieve dashboard intelligence."}</p>
      <button
        onClick={fetchData}
        className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-white font-black uppercase tracking-widest text-xs transition-all hover-lift"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <RefreshCw size={13} /> Retry Sync
      </button>
    </div>
  );

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 rounded-full"
              style={{ background: "linear-gradient(180deg, #a855f7, #3b82f6)" }} />
            <h1 className="text-3xl font-black tracking-tight text-white">
              Console Overview
            </h1>
          </div>
          <p className="text-gray-500 text-sm ml-4.5">
            Welcome back, <span className="text-gradient-purple font-black">{user?.name}</span>.
            {" "}Your platform is operating at peak performance.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Live pulse */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
            style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.12)" }}>
            <div className="w-2 h-2 rounded-full bg-green-400 neon-dot" style={{ color: "#4ade80" }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Live · Tier 1</span>
          </div>
          {/* AI badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.07))",
              border: "1px solid rgba(168,85,247,0.2)",
            }}>
            <Sparkles size={12} className="text-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">AI Optimised</span>
          </div>
        </div>
      </motion.div>

      {/* ── Stats row ── */}
      <StatsCards data={data.counts} />

      {/* ── Main grid: 2/3 + 1/3 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: main content column */}
        <div className="lg:col-span-2 space-y-6">
          <SEOHealthCard  health={data.seoHealth} performance={data.performance} />
          <MarketingOverview marketing={data.marketing} />
          <TrafficOverview   traffic={data.traffic} />
          <RecentContent     items={data.recentContent} />
        </div>

        {/* Right: sidebar column */}
        <div className="space-y-5">

          {/* AI Insight card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card-xl relative overflow-hidden p-7"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)" }} />

            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5 relative z-10"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}>
              <Zap className="text-white w-5 h-5" />
            </div>

            <h3 className="text-white font-black text-base mb-2 relative z-10">AI System Insight</h3>
            <p className="text-gray-500 text-sm leading-relaxed relative z-10">
              {data.seoHealth.score < 90
                ? "Your SEO score is below target. Review metadata and broken links to restore organic reach."
                : "Performance is optimal. Enable WebP conversion in Media Library to further cut LCP by ~40%."}
            </p>
            <Link href="/xeltr-admin/seo/metadata"
              className="inline-flex items-center gap-2 mt-5 text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors relative z-10">
              Manage SEO <ArrowUpRight size={12} />
            </Link>
          </motion.div>

          {/* Security */}
          <SecurityPanel
            recentLogins={data.security.recentLogins}
            showFullSecurity={isSuperAdmin}
          />
        </div>
      </div>
    </motion.div>
  );
}
