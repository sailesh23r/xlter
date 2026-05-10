"use client";

import { useState, useEffect, useCallback } from "react";
import { 
    Link2, 
    ArrowRight, 
    Plus, 
    Trash2, 
    Edit, 
    AlertTriangle, 
    CheckCircle2, 
    Search,
    ToggleLeft,
    ToggleRight,
    RefreshCw
} from "lucide-react";
import { 
    SeoPageHeader, 
    SeoTable, 
    SeoStatusBadge, 
    SeoToggle,
    SeoSectionCard 
} from "@/Components/Admin/Seo/SeoComponents";

interface RedirectEntry {
    _id: string;
    source: string;
    destination: string;
    permanent: boolean;
    enabled: boolean;
}

export default function UrlRedirectsPage() {
    const [redirects, setRedirects] = useState<RedirectEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        source: "",
        destination: "",
        permanent: true,
        enabled: true,
    });

    const fetchRedirects = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/seo/redirects");
            const data = await res.json();
            if (data.success) {
                setRedirects(data.redirects);
            }
        } catch (err) {
            console.error("Failed to fetch redirects:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRedirects();
    }, [fetchRedirects]);

    const handleEdit = (redirect: RedirectEntry) => {
        setEditId(redirect._id);
        setFormData({
            source: redirect.source,
            destination: redirect.destination,
            permanent: redirect.permanent,
            enabled: redirect.enabled,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this redirect?")) return;
        try {
            const res = await fetch(`/api/admin/seo/redirects?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) fetchRedirects();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Loop detection: Source and destination should not be the same
        if (formData.source.trim() === formData.destination.trim()) {
            alert("Error: Source and destination cannot be the same (Redirect Loop).");
            return;
        }

        setIsSaving(true);
        const method = editId ? "PUT" : "POST";
        const url = "/api/admin/seo/redirects" + (editId ? `?id=${editId}` : "");

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                setEditId(null);
                setFormData({ source: "", destination: "", permanent: true, enabled: true });
                fetchRedirects();
            } else {
                alert(data.error || "Operation failed");
            }
        } catch (err) {
            console.error("Operation failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const toggleStatus = async (redirect: RedirectEntry) => {
        try {
            await fetch(`/api/admin/seo/redirects?id=${redirect._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...redirect, enabled: !redirect.enabled }),
            });
            fetchRedirects();
        } catch (err) {
            console.error("Toggle failed:", err);
        }
    };

    const columns = [
        {
            header: "Source Path",
            accessor: (item: RedirectEntry) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                        <Link2 size={14} />
                    </div>
                    <code className="text-xs font-mono text-gray-400">{item.source}</code>
                </div>
            )
        },
        {
            header: "Direction",
            accessor: () => <ArrowRight className="text-gray-600" size={16} />
        },
        {
            header: "Destination",
            accessor: (item: RedirectEntry) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                        <Link2 size={14} />
                    </div>
                    <code className="text-xs font-mono text-white">{item.destination}</code>
                </div>
            )
        },
        {
            header: "Type",
            accessor: (item: RedirectEntry) => (
                <SeoStatusBadge 
                    status={item.permanent ? "301 Permanent" : "302 Temporary"} 
                    type={item.permanent ? "success" : "warning"} 
                />
            )
        },
        {
            header: "Status",
            accessor: (item: RedirectEntry) => (
                <button onClick={() => toggleStatus(item)} className="transition-all hover:scale-110">
                    {item.enabled ? (
                        <div className="flex items-center gap-2 text-green-400 font-bold text-[10px] uppercase tracking-widest">
                            <ToggleRight size={20} /> Active
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-600 font-bold text-[10px] uppercase tracking-widest">
                            <ToggleLeft size={20} /> Inactive
                        </div>
                    )}
                </button>
            )
        },
        {
            header: "Actions",
            className: "text-right",
            accessor: (item: RedirectEntry) => (
                <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-8 pb-20">
            <SeoPageHeader 
                title="URL & Redirects" 
                description="Manage 301/302 redirects and ensure a healthy URL structure."
                badge="Routing Control"
                actions={
                    <button 
                        onClick={() => { setEditId(null); setFormData({ source: "", destination: "", permanent: true, enabled: true }); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Redirect</span>
                    </button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <SeoTable 
                        data={redirects.filter(r => r.source.includes(search) || r.destination.includes(search))}
                        columns={columns as any}
                        onSearch={setSearch}
                        searchPlaceholder="Search redirects by path..."
                    />
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <form onSubmit={handleSubmit} className="relative w-full max-w-xl bg-[#020617] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-10 space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-white">{editId ? "Edit Redirect" : "New Redirect Rule"}</h3>
                            <p className="text-gray-500 text-sm mt-1">Configure automated routing for your traffic.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Source Path</label>
                                <input 
                                    type="text" required
                                    value={formData.source}
                                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50 font-mono"
                                    placeholder="/old-page-url"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Destination Path</label>
                                <input 
                                    type="text" required
                                    value={formData.destination}
                                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50 font-mono"
                                    placeholder="/new-page-url"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${formData.permanent ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/2 border-white/5'}`} onClick={() => setFormData({...formData, permanent: true})}>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Permanent</p>
                                    <p className="text-sm font-bold text-white">301 Redirect</p>
                                </div>
                                <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${!formData.permanent ? 'bg-yellow-600/10 border-yellow-500/50' : 'bg-white/2 border-white/5'}`} onClick={() => setFormData({...formData, permanent: false})}>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-1">Temporary</p>
                                    <p className="text-sm font-bold text-white">302 Redirect</p>
                                </div>
                            </div>

                            <SeoToggle 
                                label="Active Rule" 
                                checked={formData.enabled}
                                onChange={(val) => setFormData({...formData, enabled: val})}
                                description="Immediately apply this redirect rule to incoming traffic."
                            />
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
                                disabled={isSaving}
                                className="flex-1 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-xl uppercase tracking-widest text-xs disabled:opacity-50"
                            >
                                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin mx-auto" /> : (editId ? "Update Rule" : "Create Redirect")}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
