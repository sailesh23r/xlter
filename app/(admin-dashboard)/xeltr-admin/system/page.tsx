"use client";

import { motion } from "framer-motion";
import { 
    Settings, 
    Shield, 
    Database, 
    Users, 
    HardDrive, 
    History as HistoryIcon,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Lock,
    Server,
    Activity
} from "lucide-react";
import Link from "next/link";

const SYSTEM_NODES = [
    { name: "Auth Cluster", status: "Operational", latency: "12ms", load: "14%" },
    { name: "Primary DB", status: "Healthy", latency: "8ms", load: "22%" },
    { name: "Asset CDN", status: "Optimized", latency: "24ms", load: "5%" },
    { name: "Email Relay", status: "Active", latency: "140ms", load: "1%" },
];

export default function SystemDashboardPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                    <Settings className="w-10 h-10 text-gray-400" /> System Control Centre
                </h1>
                <p className="text-gray-500 mt-2 text-lg">Centralized infrastructure management and security auditing.</p>
            </div>

            {/* Infrastructure Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {SYSTEM_NODES.map((node, i) => (
                    <motion.div
                        key={node.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card-xl p-6 relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{node.name}</span>
                            <div className="w-2 h-2 rounded-full bg-green-400 neon-dot" />
                        </div>
                        <div className="text-xl font-black text-white mb-4">{node.status}</div>
                        <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-gray-600">Latency: <span className="text-white">{node.latency}</span></span>
                            <span className="text-gray-600">Load: <span className="text-white">{node.load}</span></span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Security & Access */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card-xl p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-white font-black text-lg flex items-center gap-3">
                                <Shield className="text-purple-400 w-5 h-5" /> Security Enforcement
                            </h3>
                            <Link href="/xeltr-admin/system/users" className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300">
                                Manage Access <ArrowUpRight size={12} className="inline ml-1" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <Lock size={18} className="text-purple-400" />
                                    <p className="text-sm font-bold text-white">RBAC Protection</p>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed mb-4">Role-based access control is currently managing 4 unique roles with granular permissions.</p>
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#08080c] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                            U{i}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <HistoryIcon size={18} className="text-blue-400" />
                                    <p className="text-sm font-bold text-white">Audit Trail</p>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed mb-4">Every system change is logged and cryptographically signed for verification.</p>
                                <Link href="/xeltr-admin/system/history" className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                    View Audit Logs
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card-xl p-8">
                        <h3 className="text-white font-black text-lg mb-8 flex items-center gap-3">
                            <Database className="text-cyan-400 w-5 h-5" /> Storage & Assets
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <HardDrive size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Media Library Usage</p>
                                        <p className="text-xs text-gray-600">84% capacity utilized</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-white">42.8 GB / 50 GB</p>
                                    <div className="w-40 h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-cyan-500 w-[84%]" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-white/5 flex justify-between">
                                <Link href="/xeltr-admin/system/media" className="text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300">
                                    Launch Media Manager
                                </Link>
                                <Link href="/xeltr-admin/system/backup" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white">
                                    Configure Backups
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Quick Links & Health */}
                <div className="space-y-8">
                    <div className="glass-card-xl p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                        <div className="flex items-center gap-3 mb-6">
                            <Server size={20} className="text-green-400" />
                            <h3 className="text-white font-black text-lg">Platform Health</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Uptime", value: "99.99%", icon: Activity },
                                { label: "Backups", value: "Daily Sync", icon: CheckCircle2 },
                                { label: "Updates", value: "v2.4.1", icon: Clock },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <item.icon size={14} className="text-green-400" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    <span className="text-xs font-bold text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card-xl p-8">
                        <h3 className="text-white font-black text-lg mb-6">Configuration</h3>
                        <div className="space-y-3">
                            <Link href="/xeltr-admin/system/settings" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                                <span className="text-xs font-bold text-gray-400 group-hover:text-white">Global Settings</span>
                                <ArrowUpRight size={14} className="text-gray-700 group-hover:text-purple-400" />
                            </Link>
                            <Link href="/xeltr-admin/system/users" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                                <span className="text-xs font-bold text-gray-400 group-hover:text-white">User Management</span>
                                <ArrowUpRight size={14} className="text-gray-700 group-hover:text-purple-400" />
                            </Link>
                            <Link href="/xeltr-admin/system/history" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                                <span className="text-xs font-bold text-gray-400 group-hover:text-white">Audit History</span>
                                <ArrowUpRight size={14} className="text-gray-700 group-hover:text-purple-400" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
