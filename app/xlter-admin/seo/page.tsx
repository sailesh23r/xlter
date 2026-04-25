"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Plus,
  Minus,
  X,
  Trash2,
  Edit3,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Link as LinkIcon,
  Search,
  HelpCircle,
  EyeOff,
  Settings,
  FileText,
} from "lucide-react";
import Link from "next/link";

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

export default function AdminSEOPage() {
  const [seoEntries, setSeoEntries] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"basic" | "faqs" | "advanced">("basic");

  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    route: "",
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
    canonicalUrl: "",
    twitterHandle: "@xlterstudio",
    noIndex: false,
  });
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFAQChange = (index: number, field: keyof FAQ, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const addFAQ = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFAQ = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/seo");
      const data = await res.json();
      if (data.success) setSeoEntries(data.seoEntries);
    } catch {
      showToast("error", "Failed to load SEO data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
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
      twitterHandle: entry.twitterHandle || "@xlterstudio",
      noIndex: entry.noIndex || false,
    });
    setFaqs(entry.faqs || []);
    setActiveTab("basic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      route: "",
      title: "",
      description: "",
      keywords: "",
      ogImage: "",
      canonicalUrl: "",
      twitterHandle: "@xlterstudio",
      noIndex: false,
    });
    setFaqs([]);
    setActiveTab("basic");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.route || !formData.title || !formData.description) {
      showToast("error", "Route, Title and Description are required.");
      return;
    }
    setSubmitting(true);
    try {
      const url = editId ? `/api/seo/${editId}` : "/api/seo";
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
        fetchData();
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
      const res = await fetch(`/api/seo/${id}`, { method: "DELETE" });
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
    <>
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

        <div className="flex items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Global SEO Manager</h1>
            <p className="text-gray-400 text-sm mt-0.5">Manage metadata for every page on your website</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden h-fit">
            <div className="flex border-b border-white/5 bg-white/2">
              {[
                { id: "basic", label: "Basic", icon: FileText },
                { id: "faqs", label: "FAQs", icon: HelpCircle },
                { id: "advanced", label: "Advanced", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all
                    ${activeTab === tab.id ? "text-primary bg-primary/5 border-b-2 border-primary" : "text-gray-500 hover:text-gray-300"}
                  `}
                >
                  <tab.icon className="w-3 h-3" />
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {activeTab === "basic" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Route Path</label>
                    <div className="relative">
                      <span className="absolute left-4 inset-y-0 flex items-center text-gray-500 text-sm">/</span>
                      <input type="text" name="route" value={formData.route.startsWith("/") ? formData.route.substring(1) : formData.route} onChange={(e) => setFormData({...formData, route: "/" + e.target.value.replace(/^\//, "")})} placeholder="about" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-7 pr-4 outline-none focus:border-primary/50 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Meta Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Page Title" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Meta Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Page description..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm resize-none" />
                  </div>
                </div>
              )}

              {activeTab === "faqs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-400">Page FAQs</h3>
                    <button type="button" onClick={addFAQ} className="flex items-center gap-2 text-[10px] font-black uppercase bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/20 transition-all">
                      <Plus size={14} /> Add
                    </button>
                  </div>
                  {faqs.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-gray-500 text-xs">No FAQs added yet.</div>
                  ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="p-4 bg-white/2 border border-white/5 rounded-xl space-y-3 relative group">
                          <button type="button" onClick={() => removeFAQ(idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><X size={12} /></button>
                          <input type="text" value={faq.question} onChange={(e) => handleFAQChange(idx, "question", e.target.value)} placeholder="Question" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs outline-none focus:border-primary/50" />
                          <textarea value={faq.answer} onChange={(e) => handleFAQChange(idx, "answer", e.target.value)} placeholder="Answer" rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs outline-none focus:border-primary/50 resize-none" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="space-y-6">
                   <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Keywords (comma separated)</label>
                    <input type="text" name="keywords" value={formData.keywords} onChange={handleInputChange} placeholder="Design, AI, Studio..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">OG Image URL</label>
                      <input type="text" name="ogImage" value={formData.ogImage} onChange={handleInputChange} placeholder="/images/og.jpg" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Twitter Handle</label>
                      <input type="text" name="twitterHandle" value={formData.twitterHandle} onChange={handleInputChange} placeholder="@xlterstudio" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Canonical URL</label>
                    <input type="text" name="canonicalUrl" value={formData.canonicalUrl} onChange={handleInputChange} placeholder="https://xlter.com/..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                      <input type="checkbox" id="noIndex" name="noIndex" checked={formData.noIndex} onChange={handleInputChange} className="w-4 h-4 rounded border-white/10 bg-white/5 text-red-600 focus:ring-red-500" />
                      <label htmlFor="noIndex" className="text-xs text-red-500 font-bold cursor-pointer flex items-center gap-2"><EyeOff size={14} /> Hide page from search engines</label>
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button type="submit" disabled={submitting} className="flex-1 bg-white text-black font-bold py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : editId ? "Update Entry" : "Save Entry"}
                </button>
                {editId && <button type="button" onClick={resetForm} className="px-6 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">Cancel</button>}
              </div>
            </form>
          </motion.div>

          {/* List */}
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search routes..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/50 text-sm" />
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-800" /></div>
              ) : filteredEntries.length === 0 ? (
                <div className="text-center py-20 bg-white/2 rounded-3xl border border-dashed border-white/10">
                  <Globe className="w-10 h-10 text-gray-700 mx-auto mb-4 opacity-20" />
                  <p className="text-gray-500 text-sm">No SEO entries found</p>
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <motion.div key={entry._id} layout className="group bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-3.5 h-3.5 text-primary" />
                        <span className="text-sm font-bold text-white tracking-tight">{entry.route}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleEdit(entry)} className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(entry._id)} disabled={deleting === entry._id} className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                          {deleting === entry._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-300 line-clamp-1 mb-1">{entry.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{entry.description}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
    </>
  );
}
