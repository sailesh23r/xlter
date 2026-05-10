"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
    FileText, 
    MessageSquare, 
    Layers, 
    BookOpen, 
    ArrowUpRight, 
    Plus,
    Clock,
    CheckCircle2,
    Edit3
} from "lucide-react";

const contentModules = [
    {
        title: "Blog Posts",
        description: "Articles, news, and insights for your audience.",
        href: "/xeltr-admin/content/blog",
        count: "12",
        icon: BookOpen,
        color: "#a855f7"
    },
    {
        title: "Case Studies",
        description: "Detailed success stories and project portfolios.",
        href: "/xeltr-admin/content/casestudy",
        count: "8",
        icon: Layers,
        color: "#3b82f6"
    },
    {
        title: "Testimonials",
        description: "Client feedback and industry endorsements.",
        href: "/xeltr-admin/content/testimonials",
        count: "24",
        icon: MessageSquare,
        color: "#06b6d4"
    },
    {
        title: "Pages",
        description: "Static content pages and site structure.",
        href: "/xeltr-admin/content/pages",
        count: "15",
        icon: FileText,
        color: "#f59e0b"
    }
];

export default function ContentDashboard() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-4">
                        <Edit3 className="w-10 h-10 text-purple-400" /> Content Studio
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">Manage your brand's narrative and digital assets.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all">
                        Media Library
                    </button>
                    <button className="px-6 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-purple-500/20 transition-all">
                        <Plus size={16} /> Create New
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentModules.map((module, i) => (
                    <motion.div
                        key={module.title}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <Link 
                            href={module.href}
                            className="group block p-8 glass-card-xl hover-lift relative overflow-hidden h-full"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5" style={{ color: module.color }}>
                                    <module.icon className="w-7 h-7" />
                                </div>
                                <div className="text-right">
                                    <p className="text-4xl font-black text-white leading-none">{module.count}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-1">Total Entries</p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-black text-white mb-2 group-hover:text-purple-400 transition-colors uppercase tracking-tight">{module.title}</h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">{module.description}</p>

                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-400">
                                Open Manager <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card-xl p-8">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <Clock className="text-blue-400 w-5 h-5" /> Recent Drafts
                    </h3>
                    <Link href="/xeltr-admin/content/blog" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white">
                        View All
                    </Link>
                </div>

                <div className="space-y-4">
                    {[
                        { title: "The Evolution of Digital Twins", type: "Blog", date: "2 hours ago", status: "Draft" },
                        { title: "Metaverse Branding Strategy", type: "Blog", date: "5 hours ago", status: "Review" },
                        { title: "Global Logistics Case Study", type: "Portfolio", date: "1 day ago", status: "Draft" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                                    <Edit3 size={16} className="text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</p>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">{item.type} • Last edited {item.date}</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-gray-500">
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
