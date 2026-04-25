"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  X,
  Globe,
  Settings,
  HelpCircle,
  EyeOff,
  Layout,
  Minus,
} from "lucide-react";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface PageData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  layout: "DEFAULT" | "LANDING";
  faqs: FAQ[];
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  createdAt: string;
}

export default function AdminPagesManager() {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "content" | "faqs" | "seo">("basic");

  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    layout: "DEFAULT",
    metaTitle: "",
    metaDescription: "",
    ogImage: "",
    canonicalUrl: "",
    noIndex: false,
  });
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      const data = await res.json();
      if (data.success) setPages(data.pages);
    } catch {
      showToast("error", "Failed to load pages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFAQChange = (index: number, field: keyof FAQ, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const addFAQ = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFAQ = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const handleEdit = (page: PageData) => {
    setEditId(page._id);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content || "",
      layout: page.layout || "DEFAULT",
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      ogImage: page.ogImage || "",
      canonicalUrl: page.canonicalUrl || "",
      noIndex: page.noIndex || false,
    });
    setFaqs(page.faqs || []);
    setActiveTab("basic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      layout: "DEFAULT",
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
      canonicalUrl: "",
      noIndex: false,
    });
    setFaqs([]);
    setActiveTab("basic");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      showToast("error", "Title and Slug are required.");
      return;
    }
    setSubmitting(true);
    try {
      const url = editId ? `/api/admin/pages/${editId}` : "/api/admin/pages";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        body: JSON.stringify({ ...formData, faqs }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", editId ? "Page updated!" : "Page created!");
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
    if (!confirm("Delete this page?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Page removed.");
        setPages(prev => prev.filter(p => p._id !== id));
      }
    } catch {
      showToast("error", "Network error.");
    } finally {
      setDeleting(null);
    }
  };

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
            <h1 className="text-3xl font-bold text-white tracking-tight">Page Manager</h1>
            <p className="text-gray-400 text-sm mt-0.5">Create dynamic landing pages and custom content</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
              <div className="flex border-b border-white/5 bg-white/2">
                {[
                  { id: "basic", label: "Basic", icon: FileText },
                  { id: "content", label: "Content", icon: Edit3 },
                  { id: "faqs", label: "FAQs", icon: HelpCircle },
                  { id: "seo", label: "SEO", icon: Globe },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all
                      ${activeTab === tab.id ? "text-primary bg-primary/5 border-b-2 border-primary" : "text-gray-500 hover:text-gray-300"}
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {activeTab === "basic" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">Page Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Service Name" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">URL Slug</label>
                        <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="page-slug" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                      </div>
                    </div>
                    <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">Page Layout</label>
                        <div className="flex gap-4">
                            {["DEFAULT", "LANDING"].map((l) => (
                                <button
                                    key={l}
                                    type="button"
                                    onClick={() => setFormData({...formData, layout: l as any})}
                                    className={`flex-1 py-4 rounded-xl border font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2
                                        ${formData.layout === l ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-gray-500 hover:bg-white/10"}
                                    `}
                                >
                                    <Layout size={14} /> {l}
                                </button>
                            ))}
                        </div>
                    </div>
                  </div>
                )}

                {activeTab === "content" && (
                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest block">Page Body Content</label>
                    <textarea name="content" value={formData.content} onChange={handleInputChange} rows={15} placeholder="Write your content..." className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-primary/50 text-sm resize-none font-mono leading-relaxed" />
                  </div>
                )}

                {activeTab === "faqs" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-400">Page FAQs</h3>
                      <button type="button" onClick={addFAQ} className="flex items-center gap-2 text-[10px] font-black uppercase bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/20 transition-all">
                        <Plus size={14} /> Add FAQ
                      </button>
                    </div>
                    {faqs.length === 0 ? (
                      <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-gray-500 text-xs">No FAQs added yet.</div>
                    ) : (
                      <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                          <div key={idx} className="p-4 bg-white/2 border border-white/5 rounded-xl space-y-3 relative group">
                            <button type="button" onClick={() => removeFAQ(idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><X size={12} /></button>
                            <input type="text" value={faq.question} onChange={(e) => handleFAQChange(idx, "question", e.target.value)} placeholder="Question" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50" />
                            <textarea value={faq.answer} onChange={(e) => handleFAQChange(idx, "answer", e.target.value)} placeholder="Answer" rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50 resize-none" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "seo" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-xl mb-6">
                        <input type="checkbox" id="noIndex" name="noIndex" checked={formData.noIndex} onChange={handleInputChange} className="w-4 h-4 rounded border-white/10 bg-white/5 text-red-600 focus:ring-red-500" />
                        <label htmlFor="noIndex" className="text-xs text-red-500 font-bold cursor-pointer flex items-center gap-2"><EyeOff size={14} /> Hide from Search Engines</label>
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">Meta Title</label>
                      <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">Meta Description</label>
                      <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} rows={3} className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                    </div>
                  </div>
                )}

                <div className="mt-8 flex gap-4">
                  <button type="submit" disabled={submitting} className="flex-1 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl py-4 hover:scale-[1.02] transition-all disabled:opacity-50">
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : editId ? "Update Page" : "Create Page"}
                  </button>
                  {editId && <button type="button" onClick={resetForm} className="px-8 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all font-black uppercase tracking-widest text-[10px]">Cancel</button>}
                </div>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-4">
             <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center justify-between">
                Existing Pages <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full">{pages.length}</span>
             </h2>
             {loading ? (
                 <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-gray-700" /></div>
             ) : (
                 <div className="space-y-3">
                    {pages.map((p) => (
                        <div key={p._id} className="group bg-[#111111] border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:border-primary/30 transition-all">
                            <div>
                                <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{p.title}</h3>
                                <p className="text-[10px] text-gray-500 font-medium tracking-tight">/{p.slug}</p>
                            </div>
                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                                <button onClick={() => handleEdit(p)} className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"><Edit3 size={14} /></button>
                                <button onClick={() => handleDelete(p._id)} disabled={deleting === p._id} className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                    {deleting === p._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                </button>
                            </div>
                        </div>
                    ))}
                 </div>
             )}
          </div>
        </div>
    </>
  );
}
