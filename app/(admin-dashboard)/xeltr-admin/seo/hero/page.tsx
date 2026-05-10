"use client";

import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Save,
  Globe,
  Eye,
  EyeOff,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MousePointer2,
  Type,
  Link as LinkIcon,
  RefreshCw,
  Sparkles,
  Search,
  Settings,
} from "lucide-react";
import { 
    FaXTwitter as Twitter, 
    FaFacebookF as Facebook, 
    FaLinkedinIn as Linkedin 
} from "react-icons/fa6";

interface HeroData {
  heroLabel: string;
  h1: string;
  highlightedWord: string;
  subheading: string;
  description: string;
  primaryCTA: { text: string; link: string };
  secondaryCTA: { text: string; link: string };
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  seoSlug: string;
  noIndex: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  organizationSchema: boolean;
  localBusinessSchema: boolean;
  faqSchema: boolean;
  breadcrumbSchema: boolean;
  preloadFonts: boolean;
  animationEnabled: boolean;
  ctaTrackingId: string;
}

const defaultData: HeroData = {
  heroLabel: "Digital Excellence Studio",
  h1: "EVERYTHING DIGITAL. DONE RIGHT.",
  highlightedWord: "DIGITAL",
  subheading: "",
  description: "We craft compelling digital solutions—from high-performance websites to branding and AI-driven experiences.",
  primaryCTA: { text: "EXPLORE SERVICES", link: "/services" },
  secondaryCTA: { text: "VIEW PORTFOLIO", link: "/work" },
  isActive: true,
  metaTitle: "Digital Agency in Kerala | XELTR",
  metaDescription: "XELTR builds high-performance websites, branding systems, SEO strategies and digital experiences.",
  focusKeyword: "Digital Agency Kerala",
  canonicalUrl: "https://xeltr.com",
  seoSlug: "home",
  noIndex: false,
  ogTitle: "Digital Agency in Kerala | XELTR",
  ogDescription: "XELTR builds high-performance websites, branding systems, SEO strategies and digital experiences.",
  ogImage: "",
  twitterCard: "summary_large_image",
  organizationSchema: true,
  localBusinessSchema: false,
  faqSchema: false,
  breadcrumbSchema: true,
  preloadFonts: true,
  animationEnabled: true,
  ctaTrackingId: "hero_cta_main",
};

export default function HeroSEODashboard() {
  const [data, setData] = useState<HeroData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "social" | "advanced">("content");

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo/hero");
      const result = await res.json();
      if (result.success && result.hero) {
        setData(result.hero);
      }
    } catch {
      showToast("error", "Failed to load hero configuration.");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setData(prev => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof HeroData] as any), [child]: value }
      }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", "Hero configuration saved successfully!");
      } else {
        showToast("error", result.error || "Failed to save.");
      }
    } catch {
      showToast("error", "Network error.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-purple-500" />
        <p className="font-medium animate-pulse">Initializing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-[110] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold border backdrop-blur-xl
              ${toast.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}
            `}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
              Homepage Dashboard
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            Hero Section SEO <Sparkles className="w-6 h-6 text-yellow-400" />
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Manage your primary conversion engine and search visibility</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all hover:bg-white/10"
            title="Refresh Data"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-3 bg-white text-black font-black py-4 px-8 rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span className="uppercase tracking-widest text-xs">Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#111] border border-white/10 rounded-[32px] p-4 flex flex-col gap-1 sticky top-24">
            {[
              { id: "content", label: "Hero Content", icon: Type },
              { id: "seo", label: "SEO Metadata", icon: Globe },
              { id: "social", label: "Social Preview", icon: ImageIcon },
              { id: "advanced", label: "Performance", icon: Zap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm
                  ${activeTab === tab.id 
                    ? "bg-purple-600/10 text-purple-400 border border-purple-600/20 shadow-lg shadow-purple-600/5" 
                    : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"}
                `}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
            
            <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center justify-between px-2 mb-4">
                    <span className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em]">Live Status</span>
                    <div className={`w-2 h-2 rounded-full ${data.isActive ? "bg-green-500" : "bg-red-500"} shadow-[0_0_8px_rgba(34,197,94,0.5)]`} />
                </div>
                <label className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/5 transition-all">
                    <span className="text-xs font-bold text-gray-400">Hero Section Active</span>
                    <input 
                        type="checkbox" 
                        name="isActive" 
                        checked={data.isActive} 
                        onChange={handleInputChange} 
                        className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500"
                    />
                </label>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#111] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl"
            >
              {activeTab === "content" && (
                <div className="space-y-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center">
                        <Type className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Hero Visual Content</h2>
                        <p className="text-gray-500 text-sm">Control the main heading, subtext and call-to-actions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Main Heading (H1)</label>
                      <textarea 
                        name="h1" 
                        value={data.h1} 
                        onChange={handleInputChange} 
                        rows={2}
                        className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-5 px-6 outline-none focus:border-purple-500/50 text-xl font-bold tracking-tight" 
                      />
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Highlighted Word</label>
                            <input 
                                type="text" 
                                name="highlightedWord" 
                                value={data.highlightedWord} 
                                onChange={handleInputChange} 
                                className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm font-medium" 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Top Label</label>
                            <input 
                                type="text" 
                                name="heroLabel" 
                                value={data.heroLabel} 
                                onChange={handleInputChange} 
                                className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm font-medium" 
                            />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Description</label>
                      <textarea 
                        name="description" 
                        value={data.description} 
                        onChange={handleInputChange} 
                        rows={3}
                        className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-5 px-6 outline-none focus:border-purple-500/50 text-sm leading-relaxed text-gray-300" 
                      />
                    </div>

                    <div className="p-8 bg-white/2 border border-white/5 rounded-[32px] space-y-6">
                        <div className="flex items-center gap-3">
                            <MousePointer2 className="w-5 h-5 text-purple-400" />
                            <h3 className="font-bold text-white text-sm uppercase tracking-widest">Primary CTA</h3>
                        </div>
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                name="primaryCTA.text" 
                                value={data.primaryCTA.text} 
                                onChange={handleInputChange} 
                                placeholder="Button Text"
                                className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 text-sm" 
                            />
                            <input 
                                type="text" 
                                name="primaryCTA.link" 
                                value={data.primaryCTA.link} 
                                onChange={handleInputChange} 
                                placeholder="/services"
                                className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 text-sm" 
                            />
                        </div>
                    </div>

                    <div className="p-8 bg-white/2 border border-white/5 rounded-[32px] space-y-6">
                        <div className="flex items-center gap-3">
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                            <h3 className="font-bold text-white text-sm uppercase tracking-widest">Secondary CTA</h3>
                        </div>
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                name="secondaryCTA.text" 
                                value={data.secondaryCTA.text} 
                                onChange={handleInputChange} 
                                placeholder="Button Text"
                                className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 text-sm" 
                            />
                            <input 
                                type="text" 
                                name="secondaryCTA.link" 
                                value={data.secondaryCTA.link} 
                                onChange={handleInputChange} 
                                placeholder="/work"
                                className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 text-sm" 
                            />
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "seo" && (
                <div className="space-y-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">SEO & Meta Strategy</h2>
                        <p className="text-gray-500 text-sm">Optimize your homepage for search engines</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-6 w-full">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Meta Title</label>
                                <input 
                                    type="text" 
                                    name="metaTitle" 
                                    value={data.metaTitle} 
                                    onChange={handleInputChange} 
                                    className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Meta Description</label>
                                <textarea 
                                    name="metaDescription" 
                                    value={data.metaDescription} 
                                    onChange={handleInputChange} 
                                    rows={4}
                                    className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm leading-relaxed" 
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-80 space-y-6">
                            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        name="noIndex" 
                                        checked={data.noIndex} 
                                        onChange={handleInputChange} 
                                        className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-red-600 focus:ring-red-500"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-red-400">Enable no-index</span>
                                        <span className="text-[10px] text-red-400/60 uppercase font-black">Hide from Search Engines</span>
                                    </div>
                                </label>
                            </div>

                            <div className="p-6 bg-white/2 border border-white/5 rounded-3xl space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Schema Controls</h3>
                                <div className="space-y-3">
                                    {[
                                        { id: "organizationSchema", label: "Organization" },
                                        { id: "localBusinessSchema", label: "LocalBusiness" },
                                        { id: "faqSchema", label: "FAQ Schema" },
                                        { id: "breadcrumbSchema", label: "Breadcrumbs" },
                                    ].map(schema => (
                                        <label key={schema.id} className="flex items-center justify-between cursor-pointer group">
                                            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{schema.label}</span>
                                            <input 
                                                type="checkbox" 
                                                name={schema.id} 
                                                checked={(data as any)[schema.id]} 
                                                onChange={handleInputChange} 
                                                className="w-4 h-4 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Focus Keyword</label>
                            <input 
                                type="text" 
                                name="focusKeyword" 
                                value={data.focusKeyword} 
                                onChange={handleInputChange} 
                                className="w-full bg-white/2 border border-white/10 text-white rounded-xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Canonical URL</label>
                            <input 
                                type="text" 
                                name="canonicalUrl" 
                                value={data.canonicalUrl} 
                                onChange={handleInputChange} 
                                className="w-full bg-white/2 border border-white/10 text-white rounded-xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                            />
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "social" && (
                <div className="space-y-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Social Presence</h2>
                        <p className="text-gray-500 text-sm">Customize how your site appears on social platforms</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">OG Title</label>
                            <input 
                                type="text" 
                                name="ogTitle" 
                                value={data.ogTitle} 
                                onChange={handleInputChange} 
                                className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">OG Description</label>
                            <textarea 
                                name="ogDescription" 
                                value={data.ogDescription} 
                                onChange={handleInputChange} 
                                rows={4}
                                className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">OG Image URL (Optional)</label>
                            <div className="flex gap-3">
                                <input 
                                    type="text" 
                                    name="ogImage" 
                                    value={data.ogImage} 
                                    onChange={handleInputChange} 
                                    placeholder="/images/hero-og.jpg"
                                    className="flex-1 bg-white/2 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                                />
                                <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all">
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Twitter Card Type</label>
                            <select 
                                name="twitterCard" 
                                value={data.twitterCard} 
                                onChange={handleInputChange}
                                className="w-full bg-white/2 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm appearance-none cursor-pointer"
                            >
                                <option value="summary">Summary</option>
                                <option value="summary_large_image" className="bg-[#111]">Summary with Large Image</option>
                                <option value="app">App Card</option>
                                <option value="player">Player Card</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Eye className="w-4 h-4" /> Live Preview
                        </h3>
                        
                        {/* Facebook Preview */}
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center overflow-hidden">
                                {data.ogImage ? (
                                    <img src={data.ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-300">
                                        <ImageIcon className="w-12 h-12" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">No Image Selected</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-[#f0f2f5]">
                                <p className="text-[11px] text-gray-500 uppercase font-medium">XELTR.COM</p>
                                <h4 className="text-gray-900 font-bold text-lg leading-tight mt-1 truncate">{data.ogTitle || data.metaTitle}</h4>
                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{data.ogDescription || data.metaDescription}</p>
                            </div>
                        </div>

                        {/* Twitter Preview */}
                        <div className="bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-xl mt-8">
                             <div className="aspect-[2/1] bg-[#1a1a1a] flex items-center justify-center overflow-hidden border-b border-gray-800">
                                {data.ogImage ? (
                                    <img src={data.ogImage} alt="Twitter Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-700">
                                        <Twitter className="w-10 h-10" />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h4 className="text-white font-bold text-sm truncate">{data.ogTitle || data.metaTitle}</h4>
                                <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{data.ogDescription || data.metaDescription}</p>
                                <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                                    <LinkIcon className="w-3 h-3" /> xeltr.com
                                </p>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="space-y-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-600/10 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Performance & Tracking</h2>
                        <p className="text-gray-500 text-sm">Fine-tune behavior and conversion tracking</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="p-8 bg-white/2 border border-white/5 rounded-[32px] space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Core Performance</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Preload Hero Fonts</span>
                                        <span className="text-[10px] text-gray-500 uppercase">Reduces layout shift</span>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        name="preloadFonts" 
                                        checked={data.preloadFonts} 
                                        onChange={handleInputChange} 
                                        className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500"
                                    />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Hero Animations</span>
                                        <span className="text-[10px] text-gray-500 uppercase">Enable Framer Motion effects</span>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        name="animationEnabled" 
                                        checked={data.animationEnabled} 
                                        onChange={handleInputChange} 
                                        className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-8 bg-purple-600/5 border border-purple-500/10 rounded-[32px] space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-purple-400 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Analytics & Events
                            </h3>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">CTA Tracking ID</label>
                                <input 
                                    type="text" 
                                    name="ctaTrackingId" 
                                    value={data.ctaTrackingId} 
                                    onChange={handleInputChange} 
                                    placeholder="homepage_hero_cta"
                                    className="w-full bg-white/2 border border-white/10 text-white rounded-xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm font-mono" 
                                />
                                <p className="mt-3 text-[10px] text-gray-500 leading-relaxed uppercase font-bold tracking-tighter">
                                    Used for GTM, Facebook Pixel and Internal Analytics to track button clicks.
                                </p>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Bottom Info */}
          <div className="flex items-center justify-between px-8 py-6 bg-white/2 border border-white/5 rounded-[32px] text-gray-500 text-xs">
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Changes will be applied immediately to the homepage</span>
            </div>
            <div className="flex items-center gap-4">
                <span>Last Updated: {new Date().toLocaleDateString()}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>Version 2.4.0</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
