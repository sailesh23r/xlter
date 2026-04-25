"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Trash2,
  Plus,
  Minus,
  X,
  ImageIcon,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Edit3,
  Globe,
  Settings,
  User,
  Tag,
  Calendar,
  HelpCircle,
  Star,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  faqs: FAQ[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  twitterHandle?: string;
  noIndex?: boolean;
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [catLoading, setCatLoading] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "basic" | "faqs">("basic");

  // Form State
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "GENERAL",
    description: "",
    content: "",
    tags: "",
    author: "Xlter Studio",
    publishDate: new Date().toISOString().split("T")[0],
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    twitterHandle: "@xlterstudio",
    noIndex: false,
  });
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFAQChange = (index: number, field: keyof FAQ, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const addFAQ = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFAQ = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogRes, catRes] = await Promise.all([
        fetch("/api/blogs"),
        fetch("/api/categories")
      ]);
      const blogData = await blogRes.json();
      const catData = await catRes.json();
      
      if (blogData.success) setBlogs(blogData.blogs);
      if (catData.success) setCategories(catData.categories);
    } catch {
      showToast("error", "Failed to load data.");
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

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    setCatLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name: newCat.toUpperCase() }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Category added.");
        setCategories([...categories, data.category]);
        setNewCat("");
      } else {
        showToast("error", data.error || "Failed to add.");
      }
    } catch {
      showToast("error", "Network error.");
    } finally {
      setCatLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Remove this category? Blogs using it will be automatically moved to 'GENERAL'.")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCategories(categories.filter(c => c._id !== id));
        showToast("success", "Category removed.");
        fetchData();
      }
    } catch {
      showToast("error", "Delete failed.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearFile = () => {
    setThumbnail(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleEdit = (blog: Blog) => {
    setEditId(blog._id);
    setFormData({
      title: blog.title,
      slug: blog.slug || "",
      category: blog.category,
      description: blog.description,
      content: blog.content || "",
      tags: blog.tags?.join(", ") || "",
      author: blog.author || "Xlter Studio",
      publishDate: new Date(blog.publishDate || blog.createdAt).toISOString().split("T")[0],
      status: blog.status || "PUBLISHED",
      featured: blog.featured || false,
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      canonicalUrl: blog.canonicalUrl || "",
      twitterHandle: blog.twitterHandle || "@xlterstudio",
      noIndex: blog.noIndex || false,
    });
    setFaqs(blog.faqs || []);
    setPreview(blog.thumbnail);
    setThumbnail(null);
    setActiveTab("basic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      title: "",
      slug: "",
      category: "GENERAL",
      description: "",
      content: "",
      tags: "",
      author: "Xlter Studio",
      publishDate: new Date().toISOString().split("T")[0],
      status: "PUBLISHED",
      featured: false,
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      twitterHandle: "@xlterstudio",
      noIndex: false,
    });
    setFaqs([]);
    clearFile();
    setActiveTab("basic");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || (!thumbnail && !editId)) {
      showToast("error", "Title, description, and thumbnail are required.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => fd.append(key, val as any));
      fd.append("faqs", JSON.stringify(faqs));
      if (thumbnail) fd.append("thumbnail", thumbnail);

      const url = editId ? `/api/blogs/${editId}` : "/api/blogs";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      const data = await res.json();

      if (data.success) {
        showToast("success", editId ? "Blog updated!" : "Blog published!");
        resetForm();
        fetchData();
      } else {
        showToast("error", data.error || "Operation failed.");
      }
    } catch {
      showToast("error", "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Blog removed.");
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        showToast("error", "Failed to delete.");
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
            key="toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-medium border backdrop-blur-xl
              ${toast.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Blog Manager</h1>
            <p className="text-gray-400 text-sm mt-0.5">Craft and publish your stories with full SEO control</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden"
            >
              {/* Form Tabs */}
              <div className="flex border-b border-white/5 bg-white/2">
                {[
                  { id: "basic", label: "Basic Info", icon: FileText },
                  { id: "content", label: "Content", icon: Edit3 },
                  { id: "faqs", label: "FAQs", icon: HelpCircle },
                  { id: "seo", label: "SEO & Index", icon: Globe },
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
                      {/* Thumbnail */}
                      <div className="space-y-4">
                        <label className="text-sm text-gray-400 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4" /> Thumbnail
                        </label>
                        {preview ? (
                          <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-video">
                            <Image src={preview} alt="Preview" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button type="button" onClick={clearFile} className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="w-full aspect-video border-2 border-dashed border-white/10 hover:border-primary/40 bg-white/5 hover:bg-primary/5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
                          >
                            <UploadCloud className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" />
                            <span className="text-sm text-gray-500 group-hover:text-gray-300">Upload Thumbnail</span>
                          </button>
                        )}
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </div>

                      <div className="space-y-6">
                        {/* Title */}
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Blog Title</label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter title..."
                            className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm"
                          />
                        </div>
                        {/* Slug */}
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">URL Slug (leave empty for auto)</label>
                          <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            placeholder="e.g. my-awesome-post"
                            className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm"
                          />
                        </div>
                        {/* Category */}
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Category</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm"
                          >
                            <option value="GENERAL">GENERAL</option>
                            {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
                          </select>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="text-sm text-gray-400 mb-2 block">Status</label>
                            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-xl py-2.5 px-4 outline-none focus:border-primary/50 text-xs font-bold">
                              <option value="PUBLISHED">PUBLISHED</option>
                              <option value="DRAFT">DRAFT</option>
                            </select>
                          </div>
                          <div className="flex items-end pb-2 gap-2">
                             <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" />
                             <label htmlFor="featured" className="text-xs text-gray-400 cursor-pointer flex items-center gap-1"><Star size={12} className={formData.featured ? "text-yellow-500" : ""} /> Featured</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block flex items-center gap-1.5"><User className="w-4 h-4" /> Author</label>
                        <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Publish Date</label>
                        <input type="date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block flex items-center gap-1.5"><Tag className="w-4 h-4" /> Tags (comma separated)</label>
                      <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="AI, Design, Tech..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Excerpt / Brief Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "content" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-400 block">Rich Content Body</label>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Supports Markdown</span>
                    </div>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write your full story here..."
                      className="w-full h-[500px] bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 outline-none focus:border-primary/50 text-sm resize-none font-mono leading-relaxed"
                    />
                  </div>
                )}

                {activeTab === "faqs" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-400">Article FAQs</h3>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">URL Slug</label>
                        <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="auto-generated-if-empty" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                      </div>
                      <div className="flex items-end pb-3 gap-3">
                         <input type="checkbox" id="noIndex" name="noIndex" checked={formData.noIndex} onChange={handleInputChange} className="w-4 h-4 rounded border-white/10 bg-white/5 text-red-600 focus:ring-red-500" />
                         <label htmlFor="noIndex" className="text-xs text-red-500 font-bold cursor-pointer flex items-center gap-1"><EyeOff size={12} /> Hide from Search Engines (no-index)</label>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Meta Title</label>
                      <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Meta Description</label>
                      <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} rows={3} className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-sm" />
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="mt-8 flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold rounded-xl py-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : editId ? "Update Post" : "Publish Post"}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Categories */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Settings className="w-5 h-5 text-gray-500" /> Categories</h2>
              <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
                <input type="text" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50" />
                <button type="submit" disabled={catLoading} className="bg-primary/10 text-primary border border-primary/20 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-primary/20 transition-all uppercase tracking-widest">
                  {catLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <div key={cat._id} className="group flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs">
                    <span className="text-gray-400">{cat.name}</span>
                    <button onClick={() => handleDeleteCategory(cat._id)} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center justify-between">
                Posts <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-500">{blogs.length}</span>
              </h2>
              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-700" /></div>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <motion.div
                      key={blog._id}
                      layout
                      className="group bg-[#111111] border border-white/10 rounded-2xl p-3 flex gap-4 hover:border-white/20 transition-all"
                    >
                      <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden bg-white/5">
                        <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-white truncate group-hover:text-primary transition-colors">{blog.title}</h3>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold">{blog.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => handleEdit(blog)} className="p-1.5 rounded-lg bg-white/5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDelete(blog._id)} disabled={deleting === blog._id} className="p-1.5 rounded-lg bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                            {deleting === blog._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  );
}
