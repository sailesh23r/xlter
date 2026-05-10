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
  Monitor,
  Smartphone,
  Code2,
  ShieldAlert,
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
    author: "Xeltr Studio",
    publishDate: new Date().toISOString().split("T")[0],
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    twitterHandle: "@Xeltrstudio",
    noIndex: false,
  });
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selection = el.value.substring(start, end);
    const before = el.value.substring(0, start);
    const after = el.value.substring(end);

    const newText = before + prefix + selection + suffix + after;
    setFormData((prev) => ({ ...prev, content: newText }));

    // Restore focus and selection
    setTimeout(() => {
      el.focus();
      if (selection) {
        el.selectionStart = start;
        el.selectionEnd = start + prefix.length + selection.length + suffix.length;
      } else {
        el.selectionStart = el.selectionEnd = start + prefix.length;
      }
    }, 0);
  };

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

  // Validation & Highlighting
  const [errors, setErrors] = useState<{ line: number; message: string; type: "error" | "warning"; fix?: string }[]>([]);

  const renderHighlighted = (text: string) => {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/(&lt;\/?[a-z1-6]+.*?&gt;)/gi, '<span style="color: #ec4899; font-weight: bold;">$1</span>') // HTML Tags
      .replace(/(&lt;!--.*?--&gt;)/g, '<span style="color: #475569; font-style: italic;">$1</span>') // Comments
      .replace(/&quot;(.*?)&quot;/g, '<span style="color: #10b981;">&quot;$1&quot;</span>') // Quotes in attributes
      .replace(/(\s)([a-z-]+)(=)/gi, '$1<span style="color: #3b82f6;">$2</span>$3'); // Attributes
  };

  const validateContent = (content: string) => {
    const newErrors: typeof errors = [];
    const lines = content.split("\n");
    const stack: { tag: string; line: number }[] = [];
    const tagRegex = /<(\/?[a-z1-6]+)([^>]*)>/gi;
    const voidTags = ["img", "br", "hr", "input", "meta", "link"];

    let h1Count = 0;

    lines.forEach((lineText, index) => {
      const lineNum = index + 1;
      let match;

      while ((match = tagRegex.exec(lineText)) !== null) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();
        const attributes = match[2];

        if (tagName.startsWith("/")) {
          // Closing tag
          const actualTag = tagName.substring(1);
          if (stack.length === 0) {
            newErrors.push({ line: lineNum, message: `Unexpected closing tag </${actualTag}>`, type: "error" });
          } else {
            const last = stack.pop();
            if (last?.tag !== actualTag) {
              newErrors.push({ 
                line: lineNum, 
                message: `Expected </${last?.tag}> but found </${actualTag}>`, 
                type: "error",
                fix: `Replace with </${last?.tag}>`
              });
            }
          }
        } else {
          // Opening tag
          if (!voidTags.includes(tagName)) {
            stack.push({ tag: tagName, line: lineNum });
          }

          // Specific Checks
          if (tagName === "h1") h1Count++;
          if (tagName === "img" && !attributes.includes("alt=")) {
            newErrors.push({ line: lineNum, message: "Image missing 'alt' description", type: "warning" });
          }
          if (tagName === "a" && (attributes.includes('href=""') || attributes.includes("href=''"))) {
            newErrors.push({ line: lineNum, message: "Link has empty 'href'", type: "warning" });
          }
        }
      }

      // Markdown Heading Checks
      if (lineText.trim().startsWith("# ")) h1Count++;
    });

    // Check remaining stack
    stack.forEach(item => {
      newErrors.push({ 
        line: item.line, 
        message: `Tag <${item.tag}> was opened but never closed`, 
        type: "error",
        fix: `Add </${item.tag}> at the end of the block`
      });
    });

    if (h1Count > 1) {
      newErrors.push({ line: 1, message: "Multiple H1 tags detected. Only one H1 is recommended for SEO.", type: "warning" });
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    const timer = setTimeout(() => validateContent(formData.content), 500);
    return () => clearTimeout(timer);
  }, [formData.content]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogRes, catRes] = await Promise.all([
        fetch("/api/admin/content/blog"),
        fetch("/api/admin/content/categories")
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
    
    // Intelligent Auto-close Tag Logic
    if (name === "content" && (e.nativeEvent as any).data === ">") {
        const el = e.target as HTMLTextAreaElement;
        const pos = el.selectionStart;
        const textBefore = value.substring(0, pos);
        const tagMatch = textBefore.match(/<([a-z1-6]+)$|<([a-z1-6]+) [^>]*$/i);
        
        if (tagMatch) {
            const tagName = tagMatch[1] || tagMatch[2];
            const voidTags = ["img", "br", "hr", "input", "meta", "link"];
            if (!voidTags.includes(tagName.toLowerCase())) {
                const closeTag = `</${tagName}>`;
                const newVal = value.substring(0, pos) + closeTag + value.substring(pos);
                setFormData(prev => ({ ...prev, [name]: newVal }));
                setTimeout(() => {
                    el.selectionStart = el.selectionEnd = pos;
                }, 0);
                return;
            }
        }
    }

    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    setCatLoading(true);
    try {
      const res = await fetch("/api/admin/content/categories", {
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
      const res = await fetch(`/api/admin/content/categories/${id}`, { method: "DELETE" });
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
      author: blog.author || "Xeltr Studio",
      publishDate: new Date(blog.publishDate || blog.createdAt).toISOString().split("T")[0],
      status: blog.status || "PUBLISHED",
      featured: blog.featured || false,
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      canonicalUrl: blog.canonicalUrl || "",
      twitterHandle: blog.twitterHandle || "@Xeltrstudio",
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
      author: "Xeltr Studio",
      publishDate: new Date().toISOString().split("T")[0],
      status: "PUBLISHED",
      featured: false,
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      twitterHandle: "@Xeltrstudio",
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

    if (errors.some(e => e.type === "error")) {
      showToast("error", "Please fix critical HTML errors before publishing.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => fd.append(key, val as any));
      fd.append("faqs", JSON.stringify(faqs));
      if (thumbnail) fd.append("thumbnail", thumbnail);

      const url = editId ? `/api/admin/content/blog/${editId}` : "/api/admin/content/blog";
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
      const res = await fetch(`/api/admin/content/blog/${id}`, { method: "DELETE" });
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

        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <FileText className="w-4 h-4" />
               </div>
               <h1 className="text-2xl font-bold text-white tracking-tight">Blog Manager</h1>
            </div>
            <p className="text-gray-400 text-sm">Craft, preview, and publish your stories with full SEO control</p>
          </div>
          {editId && (
            <button onClick={resetForm} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10 shadow-sm">
                <Plus className="w-4 h-4" /> Create New Post
            </button>
          )}
        </div>

        {/* Editor Section (Full Width) */}
        <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl"
            >
              {/* Premium Segmented Form Tabs */}
              <div className="flex p-2 bg-white/[0.02] border-b border-white/5 gap-2 overflow-x-auto">
                {[
                  { id: "basic", label: "Basic Info", icon: FileText },
                  { id: "content", label: "Rich Content", icon: Edit3 },
                  { id: "faqs", label: "FAQs", icon: HelpCircle },
                  { id: "seo", label: "SEO Settings", icon: Globe },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all duration-300
                      ${activeTab === tab.id ? "bg-primary text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" : "text-gray-400 hover:text-white hover:bg-white/5"}
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-10">
                {activeTab === "basic" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Thumbnail - Left Side */}
                      <div className="lg:col-span-4 space-y-4">
                        <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-primary" /> Cover Image
                        </label>
                        {preview ? (
                          <div className="relative rounded-[20px] overflow-hidden border border-white/10 group aspect-[4/3] shadow-lg">
                            <Image src={preview} alt="Preview" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                              <button type="button" onClick={clearFile} className="bg-red-500 text-white p-3 rounded-full hover:scale-110 hover:bg-red-600 transition-all shadow-xl">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="w-full aspect-[4/3] border-2 border-dashed border-white/10 hover:border-primary/50 bg-white/[0.02] hover:bg-primary/5 rounded-[20px] flex flex-col items-center justify-center gap-3 transition-all group shadow-sm"
                          >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                               <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-primary">Upload Cover</span>
                          </button>
                        )}
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </div>

                      {/* Main Fields - Right Side */}
                      <div className="lg:col-span-8 space-y-6">
                        {/* Title */}
                        <div>
                          <label className="text-sm font-bold text-gray-300 mb-2 block">Blog Title</label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Type a captivating title..."
                            className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-4 px-5 outline-none focus:border-primary focus:bg-white/[0.05] transition-all text-base shadow-inner"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Slug */}
                            <div>
                            <label className="text-sm font-bold text-gray-300 mb-2 block">URL Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="Auto-generated if empty"
                                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm"
                            />
                            </div>
                            {/* Category */}
                            <div>
                            <label className="text-sm font-bold text-gray-300 mb-2 block">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full bg-[#11131f] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm appearance-none"
                            >
                                <option value="GENERAL">GENERAL</option>
                                {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
                            </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> Author</label>
                                <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm" />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> Date</label>
                                <input type="date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 text-gray-300 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm" />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block flex items-center gap-1.5"><Tag className="w-4 h-4 text-primary" /> Tags</label>
                                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="AI, Design..." className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm" />
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/5 pt-8">
                        <div className="lg:col-span-8">
                            <label className="text-sm font-bold text-gray-300 mb-2 block">Excerpt / Brief Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="A short summary of what this article is about..."
                                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-4 px-5 outline-none focus:border-primary transition-all text-sm resize-none shadow-inner"
                            />
                        </div>
                        <div className="lg:col-span-4 flex flex-col justify-center gap-6">
                            <div className="bg-white/[0.02] border border-white/10 p-5 rounded-xl">
                                <label className="text-sm font-bold text-gray-300 mb-3 block border-b border-white/10 pb-2">Publishing Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-[#11131f] border border-white/10 text-white rounded-lg py-2.5 px-3 outline-none focus:border-primary text-sm font-bold mb-4">
                                    <option value="PUBLISHED">🟢 PUBLISHED</option>
                                    <option value="DRAFT">🟡 DRAFT</option>
                                </select>
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                    <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-5 h-5 rounded border-white/20 bg-white/10 text-primary focus:ring-primary accent-primary cursor-pointer" />
                                    <label htmlFor="featured" className="text-sm text-white font-bold cursor-pointer flex items-center gap-2">
                                        Mark as Featured <Star size={14} className={formData.featured ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                )}

                {activeTab === "content" && (
                  <div className="space-y-6">
                    {/* Editor Control Bar (HTML Only) */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] p-4 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl">
                            <Code2 size={14} className="text-primary" /> HTML Content Editor
                        </div>
                        <div className="h-4 w-px bg-white/10" />
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                           {errors.length > 0 ? (
                             <span className={`flex items-center gap-1.5 ${errors.some(e => e.type === 'error') ? 'text-red-400' : 'text-yellow-400'}`}>
                               <ShieldAlert size={14} /> {errors.length} Issue{errors.length > 1 ? 's' : ''} Found
                             </span>
                           ) : (
                             <span className="text-green-400 flex items-center gap-1.5"><CheckCircle2 size={14} /> HTML Valid</span>
                           )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                      {/* Left Side: Editor & Errors */}
                      <div className="xl:col-span-7 space-y-4 flex flex-col h-[750px]">
                        {/* Toolbar (HTML Tags) */}
                        <div className="flex flex-wrap gap-1.5 p-2 bg-[#0a0d18] border border-white/10 rounded-xl shadow-inner shrink-0">
                           <button type="button" onClick={() => insertMarkdown("<h1>", "</h1>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">H1</button>
                           <button type="button" onClick={() => insertMarkdown("<h2>", "</h2>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">H2</button>
                           <button type="button" onClick={() => insertMarkdown("<h3>", "</h3>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">H3</button>
                           <button type="button" onClick={() => insertMarkdown("<p>", "</p>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">P</button>
                           <div className="w-px h-4 bg-white/10 mx-1 self-center" />
                           <button type="button" onClick={() => insertMarkdown("<strong>", "</strong>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">B</button>
                           <button type="button" onClick={() => insertMarkdown("<em>", "</em>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black italic transition-colors">I</button>
                           <button type="button" onClick={() => insertMarkdown('<a href="url">', "</a>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">Link</button>
                           <div className="w-px h-4 bg-white/10 mx-1 self-center" />
                           <button type="button" onClick={() => insertMarkdown("<blockquote>\n", "\n</blockquote>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">Quote</button>
                           <button type="button" onClick={() => insertMarkdown('<img src="', '" alt="description" />')} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">Img</button>
                           <button type="button" onClick={() => insertMarkdown("<pre><code>\n", "\n</code></pre>")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">Code</button>
                           <div className="w-px h-4 bg-white/10 mx-1 self-center" />
                           <button type="button" onClick={() => insertMarkdown("\n\n<!-- NUTSHELL_START -->\n<p>", "</p>\n<!-- NUTSHELL_END -->\n\n")} className="px-3 py-1.5 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary rounded text-[9px] font-black uppercase transition-colors">Nutshell</button>
                           <button type="button" onClick={() => insertMarkdown("<!-- ", " -->")} className="px-2.5 py-1.5 hover:bg-primary/20 hover:text-primary text-gray-400 rounded text-[10px] font-black transition-colors">Com</button>
                        </div>

                        <div className="flex-1 min-h-0 relative group rounded-2xl overflow-hidden border border-white/10 bg-[#050505] shadow-2xl transition-all">
                          {/* Highlighter Layer (HTML Logic) */}
                          <div 
                            className="absolute inset-0 py-6 px-8 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words pointer-events-none text-white/90 overflow-hidden"
                            dangerouslySetInnerHTML={{ __html: renderHighlighted(formData.content) + "\n\n" }}
                          />
                          
                          <textarea
                            ref={textareaRef}
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            onScroll={(e) => {
                               const highlighter = (e.target as any).previousSibling;
                               if (highlighter) highlighter.scrollTop = (e.target as any).scrollTop;
                            }}
                            placeholder="Write HTML content here..."
                            className={`absolute inset-0 w-full h-full bg-transparent text-transparent caret-primary rounded-2xl py-6 px-8 outline-none focus:border-primary/50 text-sm resize-none font-mono leading-relaxed shadow-inner transition-all
                              ${errors.some(e => e.type === 'error') ? 'border-red-500/30' : ''}`}
                            style={{ WebkitTextFillColor: 'transparent' }}
                          />
                        </div>

                        {/* Error Dashboard */}
                        <AnimatePresence>
                          {errors.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-[#0a0d18] border border-white/10 rounded-2xl overflow-hidden shadow-xl"
                            >
                               <div className="p-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syntax Validation</span>
                                  <span className="text-[9px] text-gray-500">Fix these to ensure a perfect layout</span>
                               </div>
                               <div className="max-h-[180px] overflow-y-auto p-2 space-y-2">
                                  {errors.map((err, i) => (
                                    <div key={i} className={`p-3 rounded-xl border flex gap-3 ${err.type === 'error' ? 'bg-red-500/5 border-red-500/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                                       <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${err.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                          <ShieldAlert size={16} />
                                       </div>
                                       <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between mb-1">
                                             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Line {err.line}</span>
                                             {err.fix && <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline" onClick={() => insertMarkdown("", err.fix)}>Suggest Fix</span>}
                                          </div>
                                          <p className={`text-xs font-bold leading-tight ${err.type === 'error' ? 'text-red-300' : 'text-yellow-300'}`}>{err.message}</p>
                                          {err.fix && <p className="text-[10px] text-gray-500 mt-1 italic">Suggestion: {err.fix}</p>}
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Right Side: Live HTML Preview */}
                      <div className="xl:col-span-5 flex flex-col h-[750px]">
                         <div className="flex-1 bg-[#020617] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative">
                               <div className="h-full bg-black/40 p-8 overflow-y-auto custom-scrollbar">
                                  <div className="prose prose-invert prose-blue max-w-none prose-sm">
                                      {formData.content ? (
                                          <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                                      ) : (
                                          <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                                              <Code2 size={48} className="opacity-10" />
                                              <p className="text-[10px] uppercase tracking-widest font-black">HTML Preview Empty</p>
                                          </div>
                                      )}
                                  </div>
                               </div>
                         </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "faqs" && (
                  <div className="space-y-6 max-w-4xl mx-auto py-4">
                    <div className="flex items-center justify-between bg-white/[0.02] p-6 rounded-xl border border-white/5">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">Article FAQs</h3>
                        <p className="text-xs text-gray-500">Add schema-ready frequently asked questions</p>
                      </div>
                      <button type="button" onClick={addFAQ} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] px-5 py-3 rounded-xl hover:bg-primary/90 hover:scale-105 transition-all">
                        <Plus size={16} /> Add Question
                      </button>
                    </div>
                    
                    {faqs.length === 0 ? (
                      <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl text-gray-500 text-sm bg-white/[0.01]">No FAQs added yet. Click above to add one.</div>
                    ) : (
                      <div className="space-y-5">
                        {faqs.map((faq, idx) => (
                          <div key={idx} className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl space-y-4 relative group hover:border-primary/50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">Question {idx + 1}</span>
                                <button type="button" onClick={() => removeFAQ(idx)} className="w-8 h-8 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all"><X size={14} /></button>
                            </div>
                            <input type="text" value={faq.question} onChange={(e) => handleFAQChange(idx, "question", e.target.value)} placeholder="What is the question?" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white font-bold outline-none focus:border-primary transition-all shadow-inner" />
                            <textarea value={faq.answer} onChange={(e) => handleFAQChange(idx, "answer", e.target.value)} placeholder="Provide a detailed answer..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-gray-300 outline-none focus:border-primary transition-all resize-none shadow-inner" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "seo" && (
                  <div className="space-y-8 max-w-4xl mx-auto py-4">
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Globe className="text-primary"/> SEO & Indexing</h3>
                        
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="text-sm font-bold text-gray-400 mb-2 block">Meta Title</label>
                                <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} placeholder="Overrides default title for search engines" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-4 px-5 outline-none focus:border-primary transition-all text-sm" />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-400 mb-2 block">Meta Description</label>
                                <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} rows={3} placeholder="Optimal length is 150-160 characters..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-4 px-5 outline-none focus:border-primary transition-all text-sm resize-none" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-400 mb-2 block">Canonical URL (Optional)</label>
                                    <input type="text" name="canonicalUrl" value={formData.canonicalUrl} onChange={handleInputChange} placeholder="https://..." className="w-full bg-white/5 border border-white/10 text-gray-300 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm" />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-400 mb-2 block">Twitter Handle (Optional)</label>
                                    <input type="text" name="twitterHandle" value={formData.twitterHandle} onChange={handleInputChange} placeholder="@xeltrstudio" className="w-full bg-white/5 border border-white/10 text-gray-300 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/20 rounded-xl mt-4">
                                <input type="checkbox" id="noIndex" name="noIndex" checked={formData.noIndex} onChange={handleInputChange} className="w-5 h-5 rounded border-white/20 bg-white/10 accent-red-500 cursor-pointer" />
                                <div>
                                    <label htmlFor="noIndex" className="text-sm text-red-400 font-bold cursor-pointer flex items-center gap-2"><EyeOff size={16} /> Hide from Search Engines (no-index)</label>
                                    <p className="text-xs text-red-500/70 mt-1">Check this to prevent Google from indexing this page.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="mt-10 pt-6 border-t border-white/10 flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-xl py-4 hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(37,99,235,0.3)] text-sm uppercase tracking-widest"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : editId ? "Update Published Post" : "Publish New Post"}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
        </div>

        {/* Bottom Section: Categories & Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Categories */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-xl">
                <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest"><Settings className="w-4 h-4 text-primary" /> Categories</h2>
                <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
                  <input type="text" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New Category..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary transition-all shadow-inner" />
                  <button type="submit" disabled={catLoading} className="bg-primary text-white px-5 rounded-xl text-xs font-bold hover:bg-primary/90 transition-all uppercase tracking-widest shadow-lg">
                    {catLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <div key={cat._id} className="group flex items-center gap-2 bg-white/5 border border-white/10 hover:border-primary/30 px-4 py-2 rounded-xl text-xs transition-all shadow-sm">
                      <span className="text-gray-300 font-bold">{cat.name}</span>
                      <button onClick={() => handleDeleteCategory(cat._id)} className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all ml-1"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-base font-bold text-white uppercase tracking-widest">Manage Posts</h2>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20">{blogs.length} Total</span>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogs.map((blog) => (
                      <motion.div
                        key={blog._id}
                        layout
                        className="group bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-4 hover:bg-white/[0.04] hover:border-white/20 transition-all shadow-sm"
                      >
                        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black/50 border border-white/5">
                          <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <p className="text-[9px] text-primary mb-1 uppercase tracking-widest font-black">{blog.category}</p>
                          <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">{blog.title}</h3>
                          
                          <div className="mt-auto flex items-center justify-between pt-3">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${blog.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                  {blog.status}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => handleEdit(blog)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-primary transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                                <button onClick={() => handleDelete(blog._id)} disabled={deleting === blog._id} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-red-500 transition-all">
                                  {deleting === blog._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                </button>
                              </div>
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
