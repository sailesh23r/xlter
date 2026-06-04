"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Eye,
  BarChart,
  LayoutGrid,
  FileEdit,
  Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  createdAt: string;
  updatedAt?: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

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

  const openSanity = () => {
    router.push("/studio");
  };

  const totalPosts = blogs.length;
  const draftPosts = blogs.filter(b => b.status === "DRAFT").length;
  const publishedPosts = blogs.filter(b => b.status === "PUBLISHED").length;
  const totalCategories = categories.length;

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
            <h1 className="text-2xl font-bold text-white tracking-tight">Blogs Management</h1>
          </div>
          <p className="text-gray-400 text-sm">Create, manage, and publish blog content through Sanity CMS.</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Posts", value: totalPosts, icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Published", value: publishedPosts, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Drafts", value: draftPosts, icon: FileEdit, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Categories", value: totalCategories, icon: LayoutGrid, color: "text-purple-400", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-4 hover:border-white/20 transition-all">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{loading ? "-" : stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button onClick={openSanity} className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(243,100,88,0.5)] border border-white/10 backdrop-blur-md"
          style={{ background: "linear-gradient(135deg, rgba(243,100,88,0.9), rgba(249,115,22,0.9))", boxShadow: "0 0 20px rgba(243,100,88,0.3)" }}>
          <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5">
            <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm-1.895 24.316a5.79 5.79 0 01-5.79-5.789v-8.42h3.473v8.42a2.316 2.316 0 104.632 0v-4.632h3.474v4.632a5.79 5.79 0 01-5.789 5.789z" />
          </svg>
          Open CMS
        </button>
        <button onClick={openSanity} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm hover:backdrop-blur-xl">
          <Plus className="w-4 h-4" /> Create New Post
        </button>
        <Link href="/blog" target="_blank" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm hover:backdrop-blur-xl">
          <Eye className="w-4 h-4" /> View Published Blogs
        </Link>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-base font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <BarChart className="w-4 h-4 text-primary" /> Recent Posts
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/[0.02] text-xs uppercase text-gray-500 font-black tracking-widest border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Publish Date</th>
                <th className="px-6 py-4">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                    No blogs found. Head over to Sanity Studio to create one.
                  </td>
                </tr>
              ) : (
                blogs.map(blog => (
                  <tr key={blog._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0">
                          <Image src={blog.thumbnail || '/placeholder.png'} alt={blog.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold line-clamp-1">{blog.title}</p>
                          <p className="text-[10px] text-primary uppercase tracking-widest">{blog.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${blog.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{blog.author || "Unknown"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(blog.publishDate || blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
