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
  Briefcase,
  FileText,
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
  const [isAdding, setIsAdding] = useState(false);

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
      const res = await fetch("/api/admin/content/casestudy");
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
    setIsAdding(false);
  };

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
    setDescription(newText);

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
    
    setIsAdding(true);
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

      const url = editingId ? `/api/admin/content/casestudy/${editingId}` : "/api/admin/content/casestudy";
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
      const res = await fetch(`/api/admin/content/casestudy/${id}`, { method: "DELETE" });
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
    <>
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

        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Briefcase className="w-4 h-4" />
               </div>
               <h1 className="text-2xl font-bold text-white tracking-tight">Case Study Manager</h1>
            </div>
            <p className="text-gray-400 text-sm">Create and manage your portfolio case studies</p>
          </div>
          {!isAdding && (
            <button onClick={() => { resetForm(); setIsAdding(true); }} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10 shadow-sm">
                <Plus className="w-4 h-4" /> Create Case Study
            </button>
          )}
        </div>

        <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-10 mb-12 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
               <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                 {editingId ? <Pencil className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                 {editingId ? "Edit Case Study" : "New Case Study"}
               </h2>
               <button type="button" onClick={resetForm} className="text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"><X size={16}/></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Col: Thumbnail */}
                <div className="lg:col-span-4 space-y-4">
                  <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" /> Project Thumbnail
                  </label>
                  {preview ? (
                    <div className="relative rounded-[20px] overflow-hidden border border-white/10 group aspect-[4/3] shadow-lg">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button
                          type="button"
                          onClick={() => clearFile('thumbnail')}
                          className="bg-red-500 text-white p-3 rounded-full hover:scale-110 hover:bg-red-600 transition-all shadow-xl"
                        >
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
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-primary">Upload Thumbnail</span>
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

                {/* Right Col: Basic Info */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-gray-300 mb-2 block">Project Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. FinTech Dashboard"
                        className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-1.5"><Tag className="w-4 h-4 text-primary" /> Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#11131f] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm appearance-none shadow-inner"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <label className="text-sm font-bold text-gray-300 block">Project Description</label>
                       <div className="flex gap-2">
                          <button type="button" onClick={() => insertMarkdown("**", "**")} className="px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary rounded text-[10px] font-bold transition-all">B</button>
                          <button type="button" onClick={() => insertMarkdown("*", "*")} className="px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary rounded text-[10px] font-bold italic transition-all">I</button>
                          <button type="button" onClick={() => insertMarkdown("<!-- ", " -->")} className="px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary rounded text-[10px] font-bold transition-all">Tag</button>
                       </div>
                    </div>
                    <textarea
                      ref={textareaRef}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the project, challenges, and outcomes..."
                      rows={4}
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm resize-none shadow-inner leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-1.5"><Code2 className="w-4 h-4 text-primary" /> Skills / Tech Stack</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Press Enter to add (e.g. Next.js, Figma)..."
                        className="flex-1 bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary shadow-sm"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="hover:text-red-400 transition-colors bg-white/5 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Col: Media & Links */}
              <div className="pt-8 border-t border-white/5 space-y-6">
                 <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2"><ExternalLink className="w-4 h-4 text-primary" /> Media & External Links</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live URL (Optional)</label>
                        <input
                        type="url"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="https://project.com"
                        className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm shadow-inner h-12"
                        />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">PDF Report (Max 5MB)</label>
                       <div className="flex gap-2">
                         <button
                            type="button"
                            onClick={() => pdfRef.current?.click()}
                            className={`flex-1 flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-bold shadow-sm ${pdfFile ? 'text-primary border-primary/30 bg-primary/5' : 'text-gray-400'}`}
                          >
                            <FileText className="w-4 h-4" />
                            <span className="truncate max-w-[100px]">{pdfFile ? pdfFile.name : 'Upload PDF'}</span>
                          </button>
                          {pdfFile && (
                            <button
                              type="button"
                              onClick={() => clearFile('pdf')}
                              className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
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

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mockup (Max 5MB)</label>
                       {mockupPreview ? (
                          <div className="relative rounded-xl overflow-hidden border border-white/10 group h-12 flex items-center bg-white/5 px-2 gap-2">
                            <img src={mockupPreview} alt="Mockup" className="w-8 h-8 rounded object-cover" />
                            <span className="text-xs text-primary font-bold truncate">Uploaded</span>
                            <button
                                type="button"
                                onClick={() => clearFile('mockup')}
                                className="ml-auto w-8 h-8 flex items-center justify-center bg-red-500/20 text-red-400 rounded-lg"
                              >
                                <X className="w-3 h-3" />
                            </button>
                          </div>
                       ) : (
                          <button
                            type="button"
                            onClick={() => mockupRef.current?.click()}
                            className="w-full h-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-bold text-gray-400 flex items-center justify-center gap-2 shadow-sm"
                          >
                            <ImageIcon className="w-4 h-4" /> Upload Mockup
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

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Poster (Max 5MB)</label>
                       {posterPreview ? (
                          <div className="relative rounded-xl overflow-hidden border border-white/10 group h-12 flex items-center bg-white/5 px-2 gap-2">
                            <img src={posterPreview} alt="Poster" className="w-8 h-8 rounded object-cover" />
                            <span className="text-xs text-primary font-bold truncate">Uploaded</span>
                            <button
                                type="button"
                                onClick={() => clearFile('poster')}
                                className="ml-auto w-8 h-8 flex items-center justify-center bg-red-500/20 text-red-400 rounded-lg"
                              >
                                <X className="w-3 h-3" />
                            </button>
                          </div>
                       ) : (
                          <button
                            type="button"
                            onClick={() => posterRef.current?.click()}
                            className="w-full h-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-bold text-gray-400 flex items-center justify-center gap-2 shadow-sm"
                          >
                            <ImageIcon className="w-4 h-4" /> Upload Poster
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
              </div>

              {/* Submit */}
              <div className="pt-6 border-t border-white/5">
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-xl py-4 hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(37,99,235,0.3)] uppercase tracking-widest text-sm"
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
              </div>
            </form>
          </motion.div>
        )}
        </AnimatePresence>

        {/* ── List ── */}
        <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-base font-bold text-white uppercase tracking-widest">Active Case Studies</h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20">{items.length} Total</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 rounded-[20px] border-2 border-dashed border-white/10 bg-white/[0.01] text-gray-500"
              >
                <Code2 className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">No case studies yet</p>
                <button onClick={() => setIsAdding(true)} className="text-primary text-xs mt-2 hover:underline">Click here to create one</button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {items.map((cs, i) => {
                    const accent = ACCENT_MAP[cs.category] ?? "#3b82f6";
                    return (
                      <motion.div
                        key={cs._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.04 }}
                        className="group bg-white/[0.02] border border-white/5 rounded-[20px] overflow-hidden hover:bg-white/[0.04] hover:border-white/20 transition-all shadow-sm flex flex-col"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-full aspect-video bg-black/50 overflow-hidden border-b border-white/5">
                            <img
                              src={cs.thumbnail}
                              alt={cs.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>
                                {cs.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-bold text-white text-base leading-tight mb-2 group-hover:text-primary transition-colors">
                              {cs.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                              {cs.description}
                            </p>
                            
                            {cs.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-auto pb-4">
                                {cs.skills.slice(0, 3).map((s) => (
                                  <span
                                    key={s}
                                    className="text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-300"
                                  >
                                    {s}
                                  </span>
                                ))}
                                {cs.skills.length > 3 && (
                                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-500">
                                    +{cs.skills.length - 3}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                                <button
                                  onClick={() => handleEdit(cs)}
                                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white hover:bg-primary transition-all text-xs font-bold uppercase tracking-widest"
                                >
                                  <Pencil className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(cs._id)}
                                  disabled={deleting === cs._id}
                                  className="w-10 flex shrink-0 items-center justify-center py-2 rounded-lg bg-red-500/10 text-red-400 hover:text-white hover:bg-red-500 transition-all"
                                >
                                  {deleting === cs._id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                            </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
        </div>
    </>
  );
}
