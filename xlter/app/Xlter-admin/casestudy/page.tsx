"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Trash2,
  Plus,
  X,
  ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Tag,
  Code2,
  ExternalLink,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CaseStudy {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  skills: string[];
  liveUrl?: string;
  pdfUrl?: string;
  mockupUrl?: string;
  posterUrl?: string;
  createdAt: string;
}

const CATEGORIES = [
  "WEB DEVELOPMENT",
  "APP DEVELOPMENT",
  "DIGITAL MARKETING",
  "BRANDING",
  "UI/UX DESIGN",
];

const ACCENT_MAP: Record<string, string> = {
  "WEB DEVELOPMENT": "#3b82f6",
  "APP DEVELOPMENT": "#22c55e",
  "DIGITAL MARKETING": "#ec4899",
  BRANDING: "#f59e0b",
  "UI/UX DESIGN": "#a855f7",
};

export default function AdminCaseStudyPage() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [liveUrl, setLiveUrl] = useState("");
  
  // New file states
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [mockupFile, setMockupFile] = useState<File | null>(null);
  const [mockupPreview, setMockupPreview] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const mockupRef = useRef<HTMLInputElement>(null);
  const posterRef = useRef<HTMLInputElement>(null);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/casestudies");
      const data = await res.json();
      if (data.success) setItems(data.casestudies);
    } catch {
      showToast("error", "Failed to load case studies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'pdf' | 'mockup' | 'poster') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 5MB Limit check
    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "File size exceeds 5MB limit.");
      e.target.value = "";
      return;
    }

    if (type === 'thumbnail') {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    } else if (type === 'pdf') {
      setPdfFile(file);
    } else if (type === 'mockup') {
      setMockupFile(file);
      setMockupPreview(URL.createObjectURL(file));
    } else if (type === 'poster') {
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const clearFile = (type: 'thumbnail' | 'pdf' | 'mockup' | 'poster') => {
    if (type === 'thumbnail') {
      setThumbnail(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } else if (type === 'pdf') {
      setPdfFile(null);
      if (pdfRef.current) pdfRef.current.value = "";
    } else if (type === 'mockup') {
      setMockupFile(null);
      setMockupPreview(null);
      if (mockupRef.current) mockupRef.current.value = "";
    } else if (type === 'poster') {
      setPosterFile(null);
      setPosterPreview(null);
      if (posterRef.current) posterRef.current.value = "";
    }
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(CATEGORIES[0]);
    setSkills([]);
    setSkillInput("");
    setLiveUrl("");
    setPdfFile(null);
    setMockupFile(null);
    setMockupPreview(null);
    setPosterFile(null);
    setPosterPreview(null);
    clearFile('thumbnail');
    clearFile('pdf');
    clearFile('mockup');
    clearFile('poster');
    setEditingId(null);
  };

  const handleEdit = (cs: CaseStudy) => {
    setEditingId(cs._id);
    setTitle(cs.title);
    setDescription(cs.description);
    setCategory(cs.category);
    setSkills(cs.skills);
    setLiveUrl(cs.liveUrl || "");
    setPreview(cs.thumbnail);
    // Reset file inputs since we are showing existing URLs in preview
    setThumbnail(null);
    setPdfFile(null);
    setMockupFile(null);
    setMockupPreview(cs.mockupUrl || null);
    setPosterFile(null);
    setPosterPreview(cs.posterUrl || null);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || (!thumbnail && !editingId)) {
      showToast("error", "Title, description, category and thumbnail are required.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("category", category);
      fd.append("skills", JSON.stringify(skills));
      if (thumbnail) fd.append("thumbnail", thumbnail);
      fd.append("liveUrl", liveUrl);
      if (pdfFile) fd.append("pdfFile", pdfFile);
      if (mockupFile) fd.append("mockupFile", mockupFile);
      if (posterFile) fd.append("posterFile", posterFile);

      const url = editingId ? `/api/casestudies/${editingId}` : "/api/casestudies";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, { method, body: fd });
      const data = await res.json();

      if (data.success) {
        showToast("success", editingId ? "Case study updated!" : "Case study published!");
        resetForm();
        fetchItems();
      } else {
        showToast("error", data.error || "Failed to create.");
      }
    } catch {
      showToast("error", "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/casestudies/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Case study removed.");
        setItems((prev) => prev.filter((i) => i._id !== id));
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
              ${
                toast.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/Xlter-admin/dashboard"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Case Study Manager
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              Create and manage your portfolio case studies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* ── Add Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#111111] border border-white/10 rounded-3xl p-6 h-fit sticky top-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                {editingId ? <Pencil className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-blue-400" />}
              </div>
              <h2 className="text-lg font-semibold">{editingId ? "Edit Case Study" : "Add Case Study"}</h2>
              {editingId && (
                <button 
                  onClick={resetForm}
                  className="ml-auto text-xs text-gray-500 hover:text-white transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Thumbnail */}
              <div>
                <label className="text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" /> Thumbnail
                </label>
                {preview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => clearFile('thumbnail')}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur hover:bg-red-500/20 text-white border border-white/20 px-4 py-2 rounded-xl text-sm"
                      >
                        <X className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full h-44 border-2 border-dashed border-white/10 hover:border-blue-500/40 bg-white/5 hover:bg-blue-500/5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
                  >
                    <UploadCloud className="w-8 h-8 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                      Click to upload thumbnail
                    </span>
                    <span className="text-xs text-gray-600">
                      PNG, JPG, WEBP up to 10MB
                    </span>
                  </button>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                  className="hidden"
                />
              </div>

              {/* Title */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. FinTech Dashboard"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the project, challenges, and outcomes..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                  <Tag className="w-4 h-4" /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-[#111111]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" /> Skills / Tech Stack
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Next.js, React, MongoDB..."
                    className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-2">
                  Press Enter or click + to add a skill
                </p>
              </div>

              {/* Optional Links */}
              <div className="space-y-3">
                <label className="text-sm text-gray-400 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4" /> Preview Links
                  <span className="text-gray-600 text-xs ml-1">(optional)</span>
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="Live URL  (e.g. https://project.com)"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm"
                />

                {/* PDF Upload */}
                <div className="space-y-2">
                   <label className="text-xs text-gray-500">Case Study PDF (Max 5MB)</label>
                   <div className="flex gap-2">
                     <button
                        type="button"
                        onClick={() => pdfRef.current?.click()}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm ${pdfFile ? 'text-blue-400 border-blue-500/30' : 'text-gray-400'}`}
                      >
                        <UploadCloud className="w-4 h-4" />
                        {pdfFile ? pdfFile.name : 'Upload PDF'}
                      </button>
                      {pdfFile && (
                        <button
                          type="button"
                          onClick={() => clearFile('pdf')}
                          className="px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                   </div>
                   <input
                    ref={pdfRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'pdf')}
                    className="hidden"
                  />
                </div>

                {/* Mockup Upload */}
                <div className="space-y-2">
                   <label className="text-xs text-gray-500">Mockup Image (Max 5MB)</label>
                   {mockupPreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-white/10 group h-32">
                        <img src={mockupPreview} alt="Mockup" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => clearFile('mockup')}
                            className="bg-red-500/20 text-white border border-red-500/30 px-3 py-1.5 rounded-lg text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                   ) : (
                      <button
                        type="button"
                        onClick={() => mockupRef.current?.click()}
                        className="w-full py-6 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-sm text-gray-500 flex flex-col items-center gap-1"
                      >
                        <ImageIcon className="w-5 h-5 mb-1" />
                        Upload Mockup
                      </button>
                   )}
                   <input
                    ref={mockupRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'mockup')}
                    className="hidden"
                  />
                </div>

                {/* Poster Upload */}
                <div className="space-y-2">
                   <label className="text-xs text-gray-500">Poster Image (Max 5MB)</label>
                   {posterPreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-white/10 group h-32">
                        <img src={posterPreview} alt="Poster" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => clearFile('poster')}
                            className="bg-red-500/20 text-white border border-red-500/30 px-3 py-1.5 rounded-lg text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                   ) : (
                      <button
                        type="button"
                        onClick={() => posterRef.current?.click()}
                        className="w-full py-6 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-sm text-gray-500 flex flex-col items-center gap-1"
                      >
                        <ImageIcon className="w-5 h-5 mb-1" />
                        Upload Poster
                      </button>
                   )}
                   <input
                    ref={posterRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'poster')}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-xl py-3.5 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {editingId ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editingId ? "Update Case Study" : "Publish Case Study"}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* ── List ── */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Case Studies
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                  {items.length}
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-7 h-7 animate-spin text-gray-500" />
              </div>
            ) : items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-48 rounded-3xl border border-dashed border-white/10 bg-white/5 text-gray-500"
              >
                <Code2 className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">No case studies yet</p>
                <p className="text-xs mt-1 text-gray-600">
                  Add your first one on the left
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((cs, i) => {
                    const accent = ACCENT_MAP[cs.category] ?? "#3b82f6";
                    return (
                      <motion.div
                        key={cs._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.97 }}
                        transition={{ delay: i * 0.04 }}
                        className="group bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                      >
                        <div className="flex gap-4 p-4">
                          {/* Thumbnail */}
                          <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden bg-white/5">
                            <img
                              src={cs.thumbnail}
                              alt={cs.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-xs font-bold tracking-widest uppercase mb-1"
                              style={{ color: accent }}
                            >
                              {cs.category}
                            </p>
                            <h3 className="font-semibold text-white text-sm truncate">
                              {cs.title}
                            </h3>
                            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                              {cs.description}
                            </p>
                            {cs.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {cs.skills.slice(0, 4).map((s) => (
                                  <span
                                    key={s}
                                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400"
                                  >
                                    {s}
                                  </span>
                                ))}
                                {cs.skills.length > 4 && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                                    +{cs.skills.length - 4}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 self-center">
                            <button
                              onClick={() => handleEdit(cs)}
                              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(cs._id)}
                              disabled={deleting === cs._id}
                              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                            >
                              {deleting === cs._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Bottom accent */}
                        <div
                          className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                          style={{ background: accent }}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
