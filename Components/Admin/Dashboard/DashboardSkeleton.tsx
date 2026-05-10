"use client";

export default function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-9 w-64 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }} />
                    <div className="h-4 w-48 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }} />
                </div>
                <div className="h-8 w-32 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-36 rounded-3xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }} />
                ))}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="h-72 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
                    <div className="h-56 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
                    <div className="h-64 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
                </div>
                <div className="space-y-5">
                    <div className="h-64 rounded-3xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }} />
                    <div className="h-44 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
                    <div className="h-40 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
                </div>
            </div>
        </div>
    );
}
