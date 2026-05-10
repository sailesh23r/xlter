"use client";

import { useState, useEffect } from "react";
import { 
    Activity, 
    FileText, 
    Globe, 
    Settings, 
    ShieldCheck, 
    Zap,
    Save,
    RefreshCw
} from "lucide-react";
import { 
    SeoPageHeader, 
    SeoStatsCard, 
    SeoToggle, 
    SeoCodeEditor, 
    SeoSectionCard,
    SeoStatusBadge 
} from "@/Components/Admin/Seo/SeoComponents";

export default function TechnicalSeoPage() {
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Technical SEO Data
    const [seoData, setSeoData] = useState({
        sitemapStatus: "Active",
        robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://xeltr.com/sitemap.xml",
        canonicalEnabled: true,
        breadcrumbEnabled: true,
        cleanUrls: true,
        trailingSlash: false,
        healthScore: 92,
        lcp: "1.2s",
        cls: "0.01",
        indexedPages: 0,
        lastCrawl: "Never"
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/admin/seo/technical");
                const data = await res.json();
                if (data.success) {
                    setSeoData(data.settings);
                }
            } catch (error) {
                console.error("Failed to fetch technical SEO data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/seo/technical", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(seoData),
            });
            const data = await res.json();
            if (data.success) {
                alert("Settings saved successfully!");
            }
        } catch (error) {
            console.error("Failed to save settings:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <SeoPageHeader 
                title="Technical SEO" 
                description="Optimize your site's crawlability and architectural health."
                badge="Architect"
                actions={
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs disabled:opacity-50"
                    >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>{isSaving ? "Saving..." : "Save Config"}</span>
                    </button>
                }
            />

            {/* Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SeoStatsCard 
                    label="SEO Health" 
                    value={`${seoData.healthScore}%`}
                    icon={<Activity />}
                    description="Overall technical performance"
                />
                <SeoStatsCard 
                    label="Sitemap Status" 
                    value={seoData.sitemapStatus}
                    icon={<Globe />}
                    description={`Last sync: ${seoData.lastCrawl}`}
                />
                <SeoStatsCard 
                    label="Core Vitals" 
                    value="Stable"
                    icon={<Zap />}
                    description={`LCP: ${seoData.lcp} | CLS: ${seoData.cls}`}
                />
                <SeoStatsCard 
                    label="Index Status" 
                    value={seoData.indexedPages.toString()}
                    icon={<ShieldCheck />}
                    description="Pages indexed in Search Console"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-8">
                    <SeoSectionCard title="Configuration" icon={<Settings />}>
                        <div className="space-y-6">
                            <SeoToggle 
                                label="Global Canonical Tags" 
                                checked={seoData.canonicalEnabled}
                                onChange={(val) => setSeoData({...seoData, canonicalEnabled: val})}
                                description="Automatically inject canonical tags to prevent duplicate content issues."
                            />
                            <SeoToggle 
                                label="Breadcrumb Schema" 
                                checked={seoData.breadcrumbEnabled}
                                onChange={(val) => setSeoData({...seoData, breadcrumbEnabled: val})}
                                description="Enable BreadcrumbList schema injection for all sub-pages."
                            />
                            <SeoToggle 
                                label="Clean URL Structure" 
                                checked={seoData.cleanUrls}
                                onChange={(val) => setSeoData({...seoData, cleanUrls: val})}
                                description="Enforce lowercase URLs and remove unnecessary query parameters."
                            />
                            <SeoToggle 
                                label="Enforce Trailing Slash" 
                                checked={seoData.trailingSlash}
                                onChange={(val) => setSeoData({...seoData, trailingSlash: val})}
                                description="Choose between xeltr.com/page or xeltr.com/page/ for consistency."
                            />
                        </div>
                    </SeoSectionCard>

                    <SeoSectionCard title="Robots.txt Editor" icon={<FileText />}>
                        <SeoCodeEditor 
                            label="robots.txt content"
                            value={seoData.robotsTxt}
                            onChange={(val) => setSeoData({...seoData, robotsTxt: val})}
                            language="text"
                        />
                    </SeoSectionCard>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Technical Audit</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Sitemap accessibility", status: seoData.sitemapStatus, type: "success" },
                                { label: "HTTPS / SSL Encryption", status: "Secure", type: "success" },
                                { label: "Core Web Vitals", status: "Passed", type: "success" },
                                { label: "Structured data", status: "Validated", type: "success" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-2xl">
                                    <span className="text-sm text-gray-400 font-medium">{item.label}</span>
                                    <SeoStatusBadge status={item.status} type={item.type as any} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
