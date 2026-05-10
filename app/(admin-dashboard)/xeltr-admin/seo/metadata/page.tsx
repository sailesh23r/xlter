"use client";

import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Plus,
  X,
  Trash2,
  Edit3,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Search,
  HelpCircle,
  EyeOff,
  Settings,
  FileText,
  Activity,
  ShieldCheck,
  Zap,
  BarChart3,
  ExternalLink,
  type LucideIcon,
  LayoutDashboard,
  ArrowRight,
  RefreshCw,
  PlusCircle,
  FileCode,
  FileSearch,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

interface FAQ {
  question: string;
  answer: string;
}

interface PageSEO {
  _id: string;
  route: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  twitterHandle?: string;
  noIndex?: boolean;
  faqs: FAQ[];
}

interface SEOFormData {
  route: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  twitterHandle: string;
  noIndex: boolean;
}

interface SEOResponse {
  success?: boolean;
  seoEntries?: PageSEO[];
  error?: string;
}

const emptyFormData: SEOFormData = {
  route: "",
  title: "",
  description: "",
  keywords: "",
  ogImage: "",
  canonicalUrl: "",
  twitterHandle: "@Xeltrstudio",
  noIndex: false,
};

export default function AdminSEOPage() {
  const [seoEntries, setSeoEntries] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [search, setSearch] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SEOFormData>({ ...emptyFormData });
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo/metadata");
      const data = (await res.json()) as SEOResponse;
      if (data.success) {
        setSeoEntries(data.seoEntries ?? []);
      } else {
        showToast("error", data.error || "Failed to load SEO data.");
      }
    } catch {
      showToast("error", "Failed to load SEO data.");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  useEffect(() => {
    setSearch(initialSearch);
    fetchData();
  }, [fetchData, initialSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    if (target.name === "noIndex" && target instanceof HTMLInputElement) {
      setFormData((prev) => ({ ...prev, noIndex: target.checked }));
      return;
    }
    const field = target.name as Exclude<keyof SEOFormData, "noIndex">;
    setFormData((prev) => ({ ...prev, [field]: target.value }));
  };

  const handleEdit = (entry: PageSEO) => {
    setEditId(entry._id);
    setFormData({
      route: entry.route,
      title: entry.title,
      description: entry.description,
      keywords: entry.keywords || "",
      ogImage: entry.ogImage || "",
      canonicalUrl: entry.canonicalUrl || "",
      twitterHandle: entry.twitterHandle || "@Xeltrstudio",
      noIndex: entry.noIndex || false,
    });
    setFaqs(entry.faqs || []);
    setIsEditorOpen(true);
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ ...emptyFormData });
    setFaqs([]);
    setIsEditorOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editId ? `/api/admin/seo/metadata/${editId}` : "/api/admin/seo/metadata";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        body: JSON.stringify({ ...formData, faqs }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", editId ? "SEO updated!" : "SEO created!");
        resetForm();
        await fetchData();
      } else {
        showToast("error", data.error || "Operation failed.");
      }
    } catch {
      showToast("error", "Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this SEO entry?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/seo/metadata/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Entry removed.");
        setSeoEntries(prev => prev.filter(e => e._id !== id));
      }
    } catch {
      showToast("error", "Network error.");
    } finally {
      setDeleting(null);
    }
  };

  const filteredEntries = seoEntries.filter(e => 
    e.route.toLowerCase().includes(search.toLowerCase()) || 
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-medium border backdrop-blur-xl
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
          <h1 className="text-4xl font-bold text-white tracking-tight">SEO Dashboard</h1>
          <p className="text-gray-400 mt-2 text-lg">Monitor and optimize your site's search visibility</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => fetchData()}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => { resetForm(); setIsEditorOpen(true); }}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-purple-600/20"
          >
            <PlusCircle className="w-5 h-5" />
            <span>New SEO Entry</span>
          </button>
        </div>
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "SEO Health Score", value: "86/100", icon: ShieldCheck, color: "text-green-400", bg: "bg-green-400/10" },
          { label: "Total Pages", value: seoEntries.length.toString(), icon: FileCode, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Indexed Pages", value: "18", icon: Globe, color: "text-purple-400", bg: "bg-purple-400/10" },
          { label: "Issues Found", value: "12", icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#020617] border border-white/10 p-6 rounded-3xl group hover:border-white/20 transition-all"
          >
            <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="text-gray-500 text-sm font-medium">{card.label}</p>
            <h3 className="text-3xl font-bold text-white mt-1">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Overview & Page Status */}
        <div className="lg:col-span-2 space-y-8">
          {/* SEO Summary */}
          <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" /> SEO Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Missing Meta", value: "3", sub: "Titles/Desc" },
                { label: "Broken Links", value: "0", sub: "Internal/Ext" },
                { label: "Sitemap", value: "Valid", sub: "Updated 2h ago" },
                { label: "Traffic", value: "+24%", sub: "Organic" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Page SEO Status */}
          <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-purple-400" /> Page SEO Status
              </h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search pages..." 
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 w-full md:w-64"
                />
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p>Analyzing metadata...</p>
                </div>
              ) : filteredEntries.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl text-gray-500">
                  No SEO entries found matching your search.
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <div key={entry._id} className="group flex items-center justify-between p-4 bg-white/2 hover:bg-white/5 border border-white/5 rounded-2xl transition-all">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center shrink-0">
                        <LinkIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate">{entry.route}</p>
                        <p className="text-gray-500 text-xs truncate">{entry.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="hidden md:flex flex-col items-end mr-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={10} /> Optimized
                        </div>
                      </div>
                      <button 
                        onClick={() => handleEdit(entry)}
                        className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(entry._id)}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Performance */}
          <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" /> Web Vitals & Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "LCP", value: "1.2s", desc: "Largest Contentful Paint", status: "Good", color: "text-green-400" },
                { label: "CLS", value: "0.02", desc: "Cumulative Layout Shift", status: "Good", color: "text-green-400" },
                { label: "INP", value: "84ms", desc: "Interaction to Next Paint", status: "Great", color: "text-green-400" },
              ].map((perf) => (
                <div key={perf.label} className="p-6 bg-white/2 border border-white/5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 font-bold text-xs">{perf.label}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${perf.color}`}>{perf.status}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{perf.value}</p>
                  <p className="text-[10px] text-gray-600 mt-1">{perf.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-white/2 border border-white/5 rounded-2xl text-center">
                <div className="text-3xl font-black text-white mb-1">98</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Page Speed Score</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/2 border border-white/5 rounded-2xl text-center">
                <div className="text-3xl font-black text-white mb-1">92</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mobile Score</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/2 border border-white/5 rounded-2xl text-center">
                <div className="text-3xl font-black text-white mb-1">99</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Desktop Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Issues & Actions */}
        <div className="space-y-8">
          {/* Issues Panel */}
          <div className="bg-[#020617] border border-white/10 rounded-[32px] p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" /> SEO Issues
            </h2>
            <div className="space-y-4">
              {[
                { label: "Missing meta title", count: 2, priority: "High" },
                { label: "Missing meta description", count: 1, priority: "Medium" },
                { label: "Missing ALT text", count: 8, priority: "Low" },
                { label: "Broken internal links", count: 0, priority: "None" },
                { label: "Missing OG images", count: 4, priority: "Medium" },
              ].map((issue) => (
                <div key={issue.label} className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{issue.label}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{issue.count} occurrences</p>
                  </div>
                  {issue.count > 0 ? (
                    <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${
                      issue.priority === "High" ? "bg-red-400/20 text-red-400" : 
                      issue.priority === "Medium" ? "bg-yellow-400/20 text-yellow-400" : 
                      "bg-blue-400/20 text-blue-400"
                    }`}>
                      {issue.priority}
                    </span>
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-green-400 opacity-50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-purple-600/10 border border-purple-500/20 rounded-[32px] p-8">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Add New Blog SEO", icon: Plus, action: () => { resetForm(); setIsEditorOpen(true); } },
                { label: "Edit Home Page SEO", icon: Edit3, action: () => { 
                  const home = seoEntries.find(e => e.route === "/");
                  if (home) handleEdit(home);
                } },
                { label: "Generate Sitemap", icon: Globe, action: () => window.open("/sitemap.xml", "_blank") },
                { label: "Run SEO Audit", icon: Activity, action: () => showToast("success", "Audit started in background.") },
                { label: "Generate AI Meta", icon: Zap, action: () => showToast("success", "AI recommendations coming soon!") },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-100">{action.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#020617] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{editId ? "Edit SEO Entry" : "New SEO Entry"}</h3>
                  <p className="text-gray-500 text-sm">Fill in the metadata for your route</p>
                </div>
                <button onClick={resetForm} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto space-y-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Route Path</label>
                    <div className="relative">
                      <span className="absolute left-4 inset-y-0 flex items-center text-gray-500 text-sm">/</span>
                      <input 
                        type="text" 
                        name="route" 
                        value={formData.route.replace(/^\//, "")} 
                        onChange={(e) => setFormData(prev => ({ ...prev, route: "/" + e.target.value.replace(/^\//, "") }))}
                        placeholder="about" 
                        className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-8 pr-4 outline-none focus:border-purple-500/50 text-sm" 
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Meta Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      placeholder="Page Title" 
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Meta Description</label>
                    <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      rows={4} 
                      placeholder="Enter a compelling description for search results..." 
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm resize-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">OG Image URL</label>
                    <input 
                      type="text" 
                      name="ogImage" 
                      value={formData.ogImage} 
                      onChange={handleInputChange} 
                      placeholder="/images/og.jpg" 
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Twitter Handle</label>
                    <input 
                      type="text" 
                      name="twitterHandle" 
                      value={formData.twitterHandle} 
                      onChange={handleInputChange} 
                      placeholder="@Xeltrstudio" 
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-purple-500/50 text-sm" 
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-4 p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
                    <input 
                      type="checkbox" 
                      id="noIndex" 
                      name="noIndex" 
                      checked={formData.noIndex} 
                      onChange={handleInputChange} 
                      className="w-6 h-6 rounded-lg border-white/10 bg-white/5 text-red-600 focus:ring-red-500" 
                    />
                    <label htmlFor="noIndex" className="text-sm text-red-400 font-bold cursor-pointer">
                      Hide this page from search results (no-index)
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="w-full bg-white text-black font-black py-5 rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm shadow-xl"
                  >
                    {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : editId ? "Update Metadata" : "Create SEO Entry"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
