"use client";

import { useState, useEffect } from "react";
import { 
    AlertCircle, 
    Link2, 
    MessageCircle, 
    Phone, 
    Plus, 
    Trash2, 
    Save, 
    RefreshCw,
    ExternalLink,
    Layout
} from "lucide-react";
import { 
    SeoPageHeader, 
    SeoSectionCard, 
    SeoToggle, 
    SeoInput, 
    SeoTextarea 
} from "@/Components/Admin/Seo/SeoComponents";

export default function FourOhFourPage() {
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        title: "404 - Page Not Found",
        description: "The page you are looking for doesn't exist or has been moved.",
        suggestedLinks: [
            { label: "Our Services", href: "/services" },
            { label: "Latest Blogs", href: "/blog" }
        ],
        showContactCTA: true,
        showWhatsAppCTA: true
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/admin/seo/404");
                const data = await res.json();
                if (data.success) {
                    setSettings(data.settings);
                }
            } catch (err) {
                console.error("Failed to fetch 404 settings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/seo/404", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) alert("404 settings updated!");
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const addLink = () => {
        setSettings({
            ...settings,
            suggestedLinks: [...settings.suggestedLinks, { label: "", href: "" }]
        });
    };

    const removeLink = (index: number) => {
        setSettings({
            ...settings,
            suggestedLinks: settings.suggestedLinks.filter((_, i) => i !== index)
        });
    };

    const updateLink = (index: number, field: "label" | "href", value: string) => {
        const newLinks = [...settings.suggestedLinks];
        newLinks[index][field] = value;
        setSettings({ ...settings, suggestedLinks: newLinks });
    };

    return (
        <div className="space-y-8 pb-20">
            <SeoPageHeader 
                title="404 Page Settings" 
                description="Customize the experience for users who hit broken or non-existent URLs."
                badge="User Experience"
                actions={
                    <div className="flex gap-3">
                        <a 
                            href="/404-test" 
                            target="_blank"
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-black py-3.5 px-8 rounded-2xl transition-all border border-white/10 uppercase tracking-widest text-xs"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Preview Page</span>
                        </a>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs disabled:opacity-50"
                        >
                            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            <span>Save Settings</span>
                        </button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-8">
                    <SeoSectionCard title="Content & Messaging" icon={<Layout />}>
                        <div className="space-y-6">
                            <SeoInput 
                                label="404 Title"
                                name="title"
                                value={settings.title}
                                onChange={(e) => setSettings({...settings, title: e.target.value})}
                                maxLength={60}
                            />
                            <SeoTextarea 
                                label="404 Description"
                                name="description"
                                value={settings.description}
                                onChange={(e) => setSettings({...settings, description: e.target.value})}
                                maxLength={200}
                            />
                        </div>
                    </SeoSectionCard>

                    <SeoSectionCard title="Suggested Navigation" icon={<Link2 />}>
                        <div className="space-y-4">
                            {settings.suggestedLinks.map((link, i) => (
                                <div key={i} className="flex gap-4 items-end bg-white/2 p-4 rounded-2xl border border-white/5 group">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Label</label>
                                        <input 
                                            type="text"
                                            value={link.label}
                                            onChange={(e) => updateLink(i, "label", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-blue-500/50"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Path</label>
                                        <input 
                                            type="text"
                                            value={link.href}
                                            onChange={(e) => updateLink(i, "href", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-blue-500/50 font-mono"
                                        />
                                    </div>
                                    <button 
                                        onClick={() => removeLink(i)}
                                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            <button 
                                onClick={addLink}
                                className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-600 font-bold hover:border-blue-500/50 hover:text-blue-400 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={16} /> Add Link
                            </button>
                        </div>
                    </SeoSectionCard>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <SeoSectionCard title="Call to Actions" icon={<MessageCircle />}>
                        <div className="space-y-4">
                            <SeoToggle 
                                label="Show Contact Button"
                                checked={settings.showContactCTA}
                                onChange={(val) => setSettings({...settings, showContactCTA: val})}
                                description="Display a link to the contact page."
                            />
                            <SeoToggle 
                                label="Show WhatsApp Button"
                                checked={settings.showWhatsAppCTA}
                                onChange={(val) => setSettings({...settings, showWhatsAppCTA: val})}
                                description="Display a direct WhatsApp chat button."
                            />
                        </div>
                    </SeoSectionCard>

                    <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-6">
                            <AlertCircle size={24} />
                        </div>
                        <h3 className="text-xl font-black text-white mb-4">UX Tip</h3>
                        <p className="text-sm text-gray-500 leading-relaxed italic">
                            "A good 404 page doesn't just say 'error', it helps the user find what they were looking for or gives them a clear path forward."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
