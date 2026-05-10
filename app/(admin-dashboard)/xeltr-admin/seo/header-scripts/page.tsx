"use client";

import { useState, useEffect, useCallback } from "react";
import { 
    Code, 
    Plus, 
    Trash2, 
    Edit, 
    ShieldCheck, 
    Zap,
    Save,
    Search,
    RefreshCw,
    Terminal,
    Globe
} from "lucide-react";
import { 
    SeoPageHeader, 
    SeoTable, 
    SeoStatusBadge, 
    SeoToggle,
    SeoCodeEditor,
    SeoSectionCard 
} from "@/Components/Admin/Seo/SeoComponents";

interface ScriptEntry {
    _id: string;
    name: string;
    location: "head" | "body_start" | "body_end";
    content: string;
    enabled: boolean;
}

export default function HeaderScriptsPage() {
    const [scripts, setScripts] = useState<ScriptEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState<{
        name: string;
        location: "head" | "body_start" | "body_end";
        content: string;
        enabled: boolean;
    }>({
        name: "",
        location: "head",
        content: "",
        enabled: true,
    });

    const fetchScripts = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/seo/scripts");
            const data = await res.json();
            if (data.success) {
                setScripts(data.scripts);
            }
        } catch (err) {
            console.error("Failed to fetch scripts:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchScripts();
    }, [fetchScripts]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const method = editId ? "PUT" : "POST";
        const url = "/api/admin/seo/scripts" + (editId ? `?id=${editId}` : "");

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
                setFormData({ name: "", location: "head", content: "", enabled: true });
                fetchScripts();
            }
        } catch (err) {
            console.error("Operation failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this script? This might break site features!")) return;
        try {
            const res = await fetch(`/api/admin/seo/scripts?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) fetchScripts();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleEdit = (script: ScriptEntry) => {
        setEditId(script._id);
        setFormData({
            name: script.name,
            location: script.location,
            content: script.content,
            enabled: script.enabled,
        });
        setIsModalOpen(true);
    };

    const columns = [
        {
            header: "Script Name",
            accessor: (item: ScriptEntry) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <Terminal size={16} />
                    </div>
                    <div>
                        <p className="font-bold text-white">{item.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.location.replace("_", " ")}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Status",
            accessor: (item: ScriptEntry) => (
                <SeoStatusBadge 
                    status={item.enabled ? "Active" : "Disabled"} 
                    type={item.enabled ? "success" : "info"} 
                />
            )
        },
        {
            header: "Content Snippet",
            accessor: (item: ScriptEntry) => (
                <code className="text-[10px] text-gray-600 font-mono line-clamp-1 max-w-[300px]">
                    {item.content}
                </code>
            )
        },
        {
            header: "Actions",
            className: "text-right",
            accessor: (item: ScriptEntry) => (
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
                title="Header & Footer Scripts" 
                description="Inject tracking codes, analytics, and custom scripts globally across your site."
                badge="Tracking & Pixels"
                actions={
                    <button 
                        onClick={() => { setEditId(null); setFormData({ name: "", location: "head", content: "", enabled: true }); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Script</span>
                    </button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Information Card */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/10 rounded-[32px] p-8">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-black text-white mb-4">Security Warning</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Injecting scripts can significantly impact site performance and security. Only use trusted sources for analytics, pixels, and tracking codes.
                        </p>
                        <div className="mt-8 space-y-3">
                            {[
                                "Google Tag Manager",
                                "Facebook Pixel",
                                "Google Analytics 4",
                                "Custom CSS/JS Overrides"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                                    <Zap size={12} className="text-blue-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/2 border border-white/5 rounded-[32px] p-8">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Permission Required</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Only users with <span className="text-blue-400 font-bold">SUPER_ADMIN</span> or <span className="text-blue-400 font-bold">SEO_MANAGER</span> roles are authorized to modify these settings.
                        </p>
                    </div>
                </div>

                {/* Scripts Table */}
                <div className="lg:col-span-8">
                    <SeoTable 
                        data={scripts.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))}
                        columns={columns as any}
                        onSearch={setSearch}
                        searchPlaceholder="Search scripts by name..."
                    />
                </div>
            </div>

            {/* Editor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl bg-[#020617] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-10 space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-white">{editId ? "Edit Script" : "Add Script Injection"}</h3>
                            <p className="text-gray-500 text-sm mt-1">Deploy code to specific areas of your HTML documents.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Internal Name</label>
                                <input 
                                    type="text" required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50"
                                    placeholder="e.g., Google Analytics 4"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Injection Location</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: "head", label: "Head Section" },
                                        { id: "body_start", label: "Body Start" },
                                        { id: "body_end", label: "Body End" },
                                    ].map((loc) => (
                                        <button
                                            key={loc.id}
                                            type="button"
                                            onClick={() => setFormData({...formData, location: loc.id as any})}
                                            className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                                formData.location === loc.id 
                                                    ? "bg-blue-600/10 border-blue-500/50 text-blue-400" 
                                                    : "bg-white/2 border-white/5 text-gray-600 hover:text-gray-400"
                                            }`}
                                        >
                                            {loc.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <SeoCodeEditor 
                                label="Script Content (HTML/JS/CSS)"
                                value={formData.content}
                                onChange={(val) => setFormData({...formData, content: val})}
                                language="javascript"
                            />

                            <SeoToggle 
                                label="Script Status" 
                                checked={formData.enabled}
                                onChange={(val) => setFormData({...formData, enabled: val})}
                                description="Toggle whether this script is currently active on the frontend."
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
                                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin mx-auto" /> : (editId ? "Update Script" : "Deploy Script")}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
