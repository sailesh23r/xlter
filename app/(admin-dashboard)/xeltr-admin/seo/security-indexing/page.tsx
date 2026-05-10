"use client";

import { useState, useEffect } from "react";
import { 
    ShieldCheck, 
    Eye, 
    EyeOff, 
    Lock, 
    Table as TableIcon,
    Save,
    RefreshCw,
    SearchCheck,
    Globe
} from "lucide-react";
import { 
    SeoPageHeader, 
    SeoTable, 
    SeoStatusBadge, 
    SeoToggle,
    SeoSectionCard,
    SeoStatsCard
} from "@/Components/Admin/Seo/SeoComponents";

interface PageIndexInfo {
    _id: string;
    route: string;
    title: string;
    noIndex: boolean;
    noFollow: boolean;
}

export default function SecurityIndexingPage() {
    const [pages, setPages] = useState<PageIndexInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    
    const [globalSettings, setGlobalSettings] = useState({
        forceHttps: true,
        globalNoIndex: false,
        sitemapAutoUpdate: true,
        sslStatus: "Active",
        sslExpiry: "N/A"
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/admin/seo/indexing");
                const data = await res.json();
                if (data.success) {
                    setPages(data.pages);
                    setGlobalSettings(data.global || globalSettings);
                }
            } catch (err) {
                console.error("Fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSaveGlobal = async () => {
        setIsSaving(true);
        try {
            await fetch("/api/admin/seo/indexing/global", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(globalSettings),
            });
            alert("Global security settings updated!");
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const togglePageIndexing = async (pageId: string, field: "noIndex" | "noFollow", value: boolean) => {
        try {
            const res = await fetch(`/api/admin/seo/indexing/page?id=${pageId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value }),
            });
            if (res.ok) {
                setPages(pages.map(p => p._id === pageId ? { ...p, [field]: value } : p));
            }
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    const columns = [
        {
            header: "Page Route",
            accessor: (item: PageIndexInfo) => (
                <div className="flex items-center gap-3">
                    <Globe size={14} className="text-gray-600" />
                    <span className="font-mono text-xs">{item.route}</span>
                </div>
            )
        },
        {
            header: "Page Title",
            accessor: "title"
        },
        {
            header: "Indexing",
            accessor: (item: PageIndexInfo) => (
                <button 
                    onClick={() => togglePageIndexing(item._id, "noIndex", !item.noIndex)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                        item.noIndex 
                            ? "bg-red-500/10 border-red-500/20 text-red-400" 
                            : "bg-green-500/10 border-green-500/20 text-green-400"
                    }`}
                >
                    {item.noIndex ? <EyeOff size={12} /> : <Eye size={12} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.noIndex ? "No-Index" : "Index"}</span>
                </button>
            )
        },
        {
            header: "Follow",
            accessor: (item: PageIndexInfo) => (
                <button 
                    onClick={() => togglePageIndexing(item._id, "noFollow", !item.noFollow)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                        item.noFollow 
                            ? "bg-orange-500/10 border-orange-500/20 text-orange-400" 
                            : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    }`}
                >
                    <SearchCheck size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.noFollow ? "No-Follow" : "Follow"}</span>
                </button>
            )
        }
    ];

    return (
        <div className="space-y-8 pb-20">
            <SeoPageHeader 
                title="Security & Indexing" 
                description="Control how search engines crawl and index your site content."
                badge="Visibility Control"
                actions={
                    <button 
                        onClick={handleSaveGlobal}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs disabled:opacity-50"
                    >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>Save Global Rules</span>
                    </button>
                }
            />

            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SeoStatsCard 
                    label="SSL Status" 
                    value={globalSettings.sslStatus}
                    icon={<Lock />}
                    description={`Expires: ${globalSettings.sslExpiry}`}
                />
                <SeoStatsCard 
                    label="Indexed Pages" 
                    value={pages.filter(p => !p.noIndex).length.toString()}
                    icon={<Eye />}
                    description="Live in Search Console"
                />
                <SeoStatsCard 
                    label="Force HTTPS" 
                    value={globalSettings.forceHttps ? "ON" : "OFF"}
                    icon={<ShieldCheck />}
                    description="Global redirection"
                />
                <SeoStatsCard 
                    label="Sitemap Sync" 
                    value={globalSettings.sitemapAutoUpdate ? "Auto" : "Manual"}
                    icon={<RefreshCw />}
                    description="Automation status"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-8">
                    <SeoSectionCard title="Global Controls" icon={<ShieldCheck />}>
                        <div className="space-y-6">
                            <SeoToggle 
                                label="Force HTTPS Redirection"
                                checked={globalSettings.forceHttps}
                                onChange={(val) => setGlobalSettings({...globalSettings, forceHttps: val})}
                                description="Redirect all HTTP traffic to secure HTTPS."
                            />
                            <SeoToggle 
                                label="Site-wide No-Index"
                                checked={globalSettings.globalNoIndex}
                                onChange={(val) => setGlobalSettings({...globalSettings, globalNoIndex: val})}
                                description="DANGER: Prevents all search engines from indexing the site."
                            />
                            <SeoToggle 
                                label="Automated Sitemap Sync"
                                checked={globalSettings.sitemapAutoUpdate}
                                onChange={(val) => setGlobalSettings({...globalSettings, sitemapAutoUpdate: val})}
                                description="Ping search engines whenever content is updated."
                            />
                        </div>
                    </SeoSectionCard>
                </div>

                <div className="lg:col-span-7">
                    <SeoSectionCard title="Page Visibility Matrix" icon={<TableIcon />}>
                        <SeoTable 
                            data={pages.filter(p => p.route.includes(search) || p.title.toLowerCase().includes(search.toLowerCase()))}
                            columns={columns as any}
                            onSearch={setSearch}
                            searchPlaceholder="Filter pages by route or title..."
                        />
                    </SeoSectionCard>
                </div>
            </div>
        </div>
    );
}
