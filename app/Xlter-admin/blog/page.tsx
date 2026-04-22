"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Trash2,
  Plus,
  X,
  ImageIcon,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
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

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
        // Refresh blogs to show updated "GENERAL" categories
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !thumbnail) {
      showToast("error", "All fields are required.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("category", category);
      fd.append("description", description);
      fd.append("thumbnail", thumbnail);

      const res = await fetch("/api/blogs", { method: "POST", body: fd });
      const data = await res.json();

      if (data.success) {
        showToast("success", "Blog published successfully!");
        setTitle("");
        setCategory("GENERAL");
        setDescription("");
        clearFile();
        fetchData();
      } else {
        showToast("error", data.error || "Failed to create blog.");
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Toast */}
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

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/xlter-admin/dashboard" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Blog Manager</h1>
            <p className="text-gray-400 text-sm mt-0.5">Create and manage your blog posts and categories</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* ── Category Manager ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] border border-white/10 rounded-3xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold">Categories</h2>
              </div>
              
              <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  placeholder="New category..."
                  className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl py-2.5 px-4 outline-none focus:border-blue-500/50 text-sm"
                />
                <button
                  type="submit"
                  disabled={catLoading}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                >
                  {catLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
                </button>
              </form>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <div key={cat._id} className="group flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs transition-all hover:border-white/20">
                    <span className="text-gray-300 font-medium">{cat.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Add Blog Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#111111] border border-white/10 rounded-3xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold">Add New Blog</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Thumbnail Upload */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" /> Thumbnail
                  </label>
                  {preview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                      <Image
                        src={preview}
                        alt="Preview"
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={clearFile}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur hover:bg-red-500/20 text-white border border-white/20 px-4 py-2 rounded-xl text-sm transition-colors"
                        >
                          <X className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-full h-48 border-2 border-dashed border-white/10 hover:border-purple-500/40 bg-white/5 hover:bg-purple-500/5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
                    >
                      <UploadCloud className="w-8 h-8 text-gray-500 group-hover:text-purple-400 transition-colors" />
                      <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Click to upload thumbnail</span>
                      <span className="text-xs text-gray-600">PNG, JPG, WEBP up to 10MB</span>
                    </button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                  >
                    <option value="GENERAL" className="bg-[#111111]">GENERAL</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c.name} className="bg-[#111111]">{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Blog Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a compelling title..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Blog Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write your blog content here..."
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full group flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-xl py-3.5 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:hover:scale-100"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add to Blog
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* ── Blog List ── */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Blog Posts
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                  {blogs.length}
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-7 h-7 animate-spin text-gray-500" />
              </div>
            ) : blogs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-48 rounded-3xl border border-dashed border-white/10 bg-white/5 text-gray-500"
              >
                <FileText className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">No blog posts yet</p>
                <p className="text-xs mt-1 text-gray-600">Add your first blog on the left</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {blogs.map((blog, i) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, scale: 0.97 }}
                      transition={{ delay: i * 0.05 }}
                      className="group bg-[#111111] border border-white/10 rounded-2xl overflow-hidden flex gap-4 p-4 hover:border-white/20 transition-colors"
                    >
                      {/* Thumbnail */}
                        <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden bg-white/5">
                          <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            fill
                            sizes="100px"
                            className="object-cover"
                          />
                        </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-white text-sm truncate">{blog.title}</h3>
                          <span className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                            {blog.category}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs line-clamp-2">{blog.description}</p>
                        <p className="text-gray-600 text-xs mt-2">
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(blog._id)}
                        disabled={deleting === blog._id}
                        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all self-center"
                      >
                        {deleting === blog._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
