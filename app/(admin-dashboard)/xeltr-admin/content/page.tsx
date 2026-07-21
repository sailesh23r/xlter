"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
    FileText, 
    MessageSquare, 
    Layers, 
    BookOpen, 
    ArrowUpRight, 
    Plus,
    Clock,
    Edit3
} from "lucide-react";

interface DraftItem {
    title: string;
    type: string;
    updatedAt: string;
    sanityId?: string;
}

interface ContentCounts {
    blogs: number;
    casestudies: number;
    testimonials: number;
    pages: number;
    drafts: DraftItem[];
    loading: boolean;
}

export default function ContentDashboard() {
    const [counts, setCounts] = useState<ContentCounts>({
        blogs: 0, casestudies: 0, testimonials: 0, pages: 0,
        drafts: [], loading: true,
    });

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [blogRes, csRes, testRes, pageRes] = await Promise.all([
                    fetch("/api/admin/content/blog").catch(() => null),
                    fetch("/api/admin/content/casestudy").catch(() => null),
                    fetch("/api/admin/content/testimonials").catch(() => null),
                    fetch("/api/admin/content/pages").catch(() => null),
                ]);

                const blogData = blogRes?.ok ? await blogRes.json().catch(() => null) : null;
                const csData = csRes?.ok ? await csRes.json().catch(() => null) : null;
                const testData = testRes?.ok ? await testRes.json().catch(() => null) : null;
                const pageData = pageRes?.ok ? await pageRes.json().catch(() => null) : null;

                const blogs: any[] = blogData?.blogs ?? [];
                const draftBlogs: DraftItem[] = blogs
                    .filter((b: any) => b.status === "DRAFT")
                    .slice(0, 5)
                    .map((b: any) => ({
                        title: b.title,
                        type: "Blog",
                        updatedAt: b.updatedAt || b.createdAt,
                        sanityId: b._id,
                    }));

                setCounts({
                    blogs: blogs.length,
                    casestudies: csData?.casestudies?.length ?? 0,
                    testimonials: Array.isArray(testData) ? testData.length : (testData?.length ?? 0),
                    pages: pageData?.pages?.length ?? 0,
                    drafts: draftBlogs,
                    loading: false,
                });
            } catch {
                setCounts(prev => ({ ...prev, loading: false }));
            }
        };
        fetchAll();
    }, []);

    const formatTimeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    const contentModules = [
        {
            title: "Blog Posts",
            description: "Articles, news, and insights for your audience.",
            href: "/xeltr-admin/content/blog",
            count: counts.loading ? "…" : counts.blogs.toString(),
            icon: BookOpen,
            color: "#a855f7"
        },
        {
            title: "Case Studies",
            description: "Detailed success stories and project portfolios.",
            href: "/xeltr-admin/content/casestudy",
            count: counts.loading ? "…" : counts.casestudies.toString(),
            icon: Layers,
            color: "#3b82f6"
        },
        {
            title: "Testimonials",
            description: "Client feedback and industry endorsements.",
            href: "/xeltr-admin/content/testimonials",
            count: counts.loading ? "…" : counts.testimonials.toString(),
            icon: MessageSquare,
            color: "#06b6d4"
        },
        {
            title: "Pages",
            description: "Static content pages and site structure.",
            href: "/xeltr-admin/content/pages",
            count: counts.loading ? "…" : counts.pages.toString(),
            icon: FileText,
            color: "#f59e0b"
        }
    ];

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
                    <Link
                        href="/studio"
                        target="_blank"
                        className="px-6 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-purple-500/20 transition-all"
                    >
                        <Plus size={16} /> Create New
                    </Link>
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
                    {counts.loading ? (
                        <div className="text-center py-8 text-gray-600 text-sm">Loading drafts…</div>
                    ) : counts.drafts.length === 0 ? (
                        <div className="text-center py-8 text-gray-700 text-sm font-medium">
                            No draft posts. All content is published or create new in Sanity Studio.
                        </div>
                    ) : (
                        counts.drafts.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
                                <div className="flex items-center gap-5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                                        <Edit3 size={16} className="text-yellow-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">{item.title}</p>
                                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">
                                            {item.type} • Last edited {formatTimeAgo(item.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shrink-0">
                                    Draft
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    );
}

