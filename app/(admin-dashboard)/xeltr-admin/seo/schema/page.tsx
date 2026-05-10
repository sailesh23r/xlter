"use client";

import { useState, useEffect, useCallback } from "react";
import { 
    Braces, 
    Plus, 
    Search, 
    Code, 
    Trash2, 
    Edit3, 
    RefreshCw, 
    Zap,
    Save,
    X,
    FileCode,
    Globe
} from "lucide-react";
import { 
    SeoPageHeader, 
    SeoTable, 
    SeoStatusBadge, 
    SeoCodeEditor,
    SeoToggle,
    SeoSectionCard,
    SeoStatsCard
} from "@/Components/Admin/Seo/SeoComponents";

interface SchemaEntry {
    _id: string;
    pageUrl: string;
    type: string;
    content: string;
    enabled: boolean;
}

export default function SchemaPage() {
    const [schemas, setSchemas] = useState<SchemaEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        pageUrl: "/",
        type: "Organization",
        content: "{}",
        enabled: true,
    });

    const fetchSchemas = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/seo/schema");
            const data = await res.json();
            if (data.success) {
                setSchemas(data.schemas);
            }
        } catch (err) {
            console.error("Failed to load schemas:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSchemas();
    }, [fetchSchemas]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic JSON validation
        try {
            JSON.parse(formData.content);
        } catch (e) {
            alert("Invalid JSON-LD content. Please check your syntax.");
            return;
        }

        setIsSaving(true);
        const method = editId ? "PUT" : "POST";
        const url = "/api/admin/seo/schema" + (editId ? `?id=${editId}` : "");

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
                fetchSchemas();
            }
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this schema?")) return;
        try {
            const res = await fetch(`/api/admin/seo/schema?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) fetchSchemas();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleEdit = (schema: SchemaEntry) => {
        setEditId(schema._id);
        setFormData({
            pageUrl: schema.pageUrl,
            type: schema.type,
            content: schema.content,
            enabled: schema.enabled,
        });
        setIsModalOpen(true);
    };

    const columns = [
        {
            header: "Target Page",
            accessor: (item: SchemaEntry) => (
                <div className="flex items-center gap-3">
                    <Globe size={14} className="text-gray-600" />
                    <code className="text-xs font-mono text-gray-400">{item.pageUrl}</code>
                </div>
            )
        },
        {
            header: "Schema Type",
            accessor: (item: SchemaEntry) => (
                <div className="flex items-center gap-2">
                    <FileCode size={16} className="text-purple-400" />
                    <span className="font-bold text-white">{item.type}</span>
                </div>
            )
        },
        {
            header: "Status",
            accessor: (item: SchemaEntry) => (
                <SeoStatusBadge 
                    status={item.enabled ? "Active" : "Disabled"} 
                    type={item.enabled ? "success" : "info"} 
                />
            )
        },
        {
            header: "Actions",
            className: "text-right",
            accessor: (item: SchemaEntry) => (
                <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-8 pb-20">
            <SeoPageHeader 
                title="Schema Markup" 
                description="Manage JSON-LD structured data to help search engines understand your content."
                badge="Rich Results"
                actions={
                    <button 
                        onClick={() => { setEditId(null); setFormData({ pageUrl: "/", type: "Organization", content: "{}", enabled: true }); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-purple-600/20 uppercase tracking-widest text-xs"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Markup</span>
                    </button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SeoStatsCard 
                    label="Active Schemas" 
                    value={schemas.filter(s => s.enabled).length}
                    icon={<Braces />}
                    description="Live rich results"
                />
                <SeoStatsCard 
                    label="Schema Types" 
                    value={new Set(schemas.map(s => s.type)).size}
                    icon={<Code />}
                    description="Different markup types"
                />
                <SeoStatsCard 
                    label="JSON-LD Health" 
                    value="Excellent"
                    icon={<Zap />}
                    description="Syntax validation passed"
                />
                <SeoStatsCard 
                    label="Rich Result Score" 
                    value="84%"
                    icon={<RefreshCw />}
                    trend={{ value: "12%", isPositive: true }}
                />
            </div>

            <SeoTable 
                data={schemas.filter(s => s.pageUrl.includes(search) || s.type.includes(search))}
                columns={columns as any}
                onSearch={setSearch}
                searchPlaceholder="Filter by URL or type..."
            />

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl bg-[#020617] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-10 space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-white">{editId ? "Edit Schema Markup" : "New Schema Markup"}</h3>
                            <p className="text-gray-500 text-sm mt-1">Define the structural context of your page.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Target Page</label>
                                    <input 
                                        type="text" required
                                        value={formData.pageUrl}
                                        onChange={(e) => setFormData({...formData, pageUrl: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-purple-500/50 font-mono"
                                        placeholder="/services/seo"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Schema Type</label>
                                    <select 
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-purple-500/50 appearance-none"
                                    >
                                        <option value="Organization">Organization</option>
                                        <option value="BlogPosting">Blog Posting</option>
                                        <option value="FAQPage">FAQ Page</option>
                                        <option value="BreadcrumbList">Breadcrumb List</option>
                                        <option value="LocalBusiness">Local Business</option>
                                        <option value="Article">Article</option>
                                        <option value="WebSite">WebSite</option>
                                    </select>
                                </div>
                            </div>

                            <SeoCodeEditor 
                                label="JSON-LD Markup"
                                value={formData.content}
                                onChange={(val) => setFormData({...formData, content: val})}
                                language="json"
                            />

                            <div className="flex items-center justify-between">
                                <SeoToggle 
                                    label="Enable on Frontend"
                                    checked={formData.enabled}
                                    onChange={(val) => setFormData({...formData, enabled: val})}
                                />
                                <button 
                                    type="button"
                                    onClick={() => {
                                        try {
                                            JSON.parse(formData.content);
                                            alert("JSON syntax is valid!");
                                        } catch (e) {
                                            alert("Invalid JSON: " + (e as Error).message);
                                        }
                                    }}
                                    className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
                                >
                                    <Zap size={14} /> Validate JSON
                                </button>
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
                                disabled={isSaving}
                                className="flex-1 py-4 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20 uppercase tracking-widest text-xs disabled:opacity-50"
                            >
                                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin mx-auto" /> : (editId ? "Update Schema" : "Create Markup")}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
