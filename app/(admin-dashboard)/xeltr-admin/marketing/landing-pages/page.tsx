"use client";

import { useState, useEffect } from "react";
import { 
    Plus, 
    Search, 
    MoreHorizontal, 
    ExternalLink, 
    Copy, 
    Trash2, 
    Edit, 
    Layout, 
    Globe, 
    Tag,
    Save,
    X,
    Rocket
} from "lucide-react";
import { 
    MarketingHeader, 
    MarketingTable, 
    MarketingStatusBadge, 
    MarketingFilterBar 
} from "@/Components/Admin/Marketing/MarketingComponents";

interface LandingPage {
    _id: string;
    name: string;
    slug: string;
    status: "Published" | "Draft";
    views: number;
    conversions: number;
    campaign: string;
    createdAt: string;
}

export default function LandingPagesPage() {
    const [pages, setPages] = useState<LandingPage[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        campaign: "General",
        status: "Draft" as const
    });

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const res = await fetch("/api/admin/marketing/landing-pages");
                const json = await res.json();
                if (json.success) setPages(json.pages);
            } catch (err) {
                console.error("Failed to fetch landing pages:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPages();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/marketing/landing-pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const json = await res.json();
            if (json.success) {
                setPages([json.page, ...pages]);
                setIsModalOpen(false);
                setFormData({ name: "", slug: "", campaign: "General", status: "Draft" });
            }
        } catch (err) {
            console.error("Create failed:", err);
        }
    };

    const toggleStatus = async (page: LandingPage) => {
        const newStatus = page.status === "Published" ? "Draft" : "Published";
        try {
            await fetch(`/api/admin/marketing/landing-pages?id=${page._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...page, status: newStatus }),
            });
            setPages(pages.map(p => p._id === page._id ? { ...p, status: newStatus } : p));
        } catch (err) {
            console.error("Status toggle failed:", err);
        }
    };

    const filteredPages = pages.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            <MarketingHeader 
                title="Landing Pages" 
                description="Create and manage high-conversion landing pages for your campaigns."
                badge="Campaign Manager"
                actions={
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
                    >
                        <Plus size={18} />
                        <span>Create Page</span>
                    </button>
                }
            />

            <MarketingFilterBar onSearch={setSearch} searchPlaceholder="Search by name or slug..." />

            {loading ? (
                <div className="p-20 text-center text-gray-500 uppercase tracking-widest animate-pulse font-black">Syncing Pages...</div>
            ) : filteredPages.length === 0 ? (
                <div className="bg-[#020617] border border-white/10 rounded-[40px] p-20 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                        <Layout size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">No data available.</h3>
                    <p className="text-gray-500 max-w-sm">You haven't created any landing pages yet. Start by creating your first campaign page.</p>
                </div>
            ) : (
                <MarketingTable headers={["Page Name", "URL Slug", "Status", "Campaign", "Performance", "Actions"]}>
                    {filteredPages.map((page) => (
                        <tr key={page._id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="px-8 py-6">
                                <p className="text-white font-bold group-hover:text-blue-400 transition-colors">{page.name}</p>
                                <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">Created {new Date(page.createdAt).toLocaleDateString()}</p>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                                    <Globe size={12} />
                                    <span>/{page.slug}</span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <button onClick={() => toggleStatus(page)}>
                                    <MarketingStatusBadge 
                                        status={page.status} 
                                        type={page.status === "Published" ? "success" : "neutral"} 
                                    />
                                </button>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                    <Tag size={12} className="text-blue-500" />
                                    {page.campaign}
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="space-y-1">
                                    <p className="text-sm text-white font-bold">{page.views.toLocaleString()} <span className="text-[10px] text-gray-600 font-medium ml-1">Views</span></p>
                                    <p className="text-xs text-green-400 font-medium">{((page.conversions / (page.views || 1)) * 100).toFixed(1)}% <span className="text-[10px] text-gray-600 font-medium">CR</span></p>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all"><Edit size={16} /></button>
                                    <button className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-blue-400 transition-all"><Copy size={16} /></button>
                                    <button className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </MarketingTable>
            )}

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <form onSubmit={handleCreate} className="relative w-full max-w-xl bg-[#020617] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-white">Create Landing Page</h3>
                                <p className="text-gray-500 text-sm mt-1">Set up a new conversion-focused campaign page.</p>
                            </div>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Page Internal Name</label>
                                <input 
                                    type="text" required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50"
                                    placeholder="e.g., Summer Flash Sale 2024"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">URL Slug</label>
                                    <input 
                                        type="text" required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50 font-mono"
                                        placeholder="summer-sale"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Campaign Tag</label>
                                    <input 
                                        type="text"
                                        value={formData.campaign}
                                        onChange={(e) => setFormData({...formData, campaign: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50"
                                        placeholder="Facebook Ads"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 space-y-4">
                                <h4 className="text-xs font-black text-white uppercase tracking-widest">SEO Meta Settings</h4>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Meta Title</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50"
                                        placeholder="SEO optimized title..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Meta Description</label>
                                    <textarea 
                                        rows={2}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50 resize-none"
                                        placeholder="Catchy description for search results..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button 
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-4 bg-white/5 border border-white/10 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                            >
                                <Rocket size={16} /> Create & Deploy
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
