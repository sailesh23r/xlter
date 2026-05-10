"use client";

import { motion } from "framer-motion";
import { Code, Save, Zap, AlertCircle, CheckCircle2, Copy, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function MarketingScriptsPage() {
    const [scripts, setScripts] = useState([
        { id: 1, name: "Google Tag Manager", location: "Head", status: "Active", lastEdited: "2 days ago" },
        { id: 2, name: "Facebook Pixel", location: "Body", status: "Active", lastEdited: "1 week ago" },
        { id: 3, name: "Hotjar Tracking", location: "Head", status: "Inactive", lastEdited: "3 weeks ago" },
    ]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                        <Code className="w-10 h-10 text-orange-400" /> Tracking Scripts
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">Manage global marketing pixels and custom code injections.</p>
                </div>
                <button className="px-6 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-orange-500/20 transition-all">
                    <Plus size={16} /> Add New Script
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {scripts.map((script) => (
                    <div key={script.id} className="glass-card-xl p-8 relative overflow-hidden group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-orange-500/30 transition-all">
                                    <Code size={20} className="text-gray-400 group-hover:text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white mb-1">{script.name}</h3>
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                        <span className="flex items-center gap-1.5">
                                            <Zap size={10} /> {script.location} Injection
                                        </span>
                                        <span>•</span>
                                        <span>Last edited {script.lastEdited}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                    script.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-gray-500/10 text-gray-500 border border-white/10"
                                )}>
                                    {script.status}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-3 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                        <Copy size={16} />
                                    </button>
                                    <button className="p-3 rounded-xl bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Code Preview Placeholder */}
                        <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-gray-500 overflow-hidden">
                            <code>
                                &lt;script async src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX"&gt;&lt;/script&gt;
                            </code>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card-xl p-10 bg-gradient-to-br from-orange-500/5 to-transparent border-orange-500/10">
                <div className="flex items-center gap-4 mb-4">
                    <AlertCircle size={20} className="text-orange-400" />
                    <h4 className="text-white font-black uppercase tracking-widest text-sm">Security Advisory</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                    External scripts can significantly impact page performance and security. We recommend using a Content Security Policy (CSP) and auditing third-party scripts regularly for compliance.
                </p>
            </div>
        </motion.div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
