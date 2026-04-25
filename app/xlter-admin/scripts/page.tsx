"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Plus,
  Trash2,
  Edit3,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Search,
  Eye,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

interface InjectedScript {
  _id: string;
  name: string;
  location: "head" | "body";
  content: string;
  enabled: boolean;
}

export default function AdminScriptsPage() {
  const [scripts, setScripts] = useState<InjectedScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "head" as "head" | "body",
    content: "",
    enabled: true,
  });

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/scripts");
      const data = await res.json();
      if (data.success) setScripts(data.scripts);
    } catch {
      showToast("error", "Failed to load scripts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleEdit = (script: InjectedScript) => {
    setEditId(script._id);
    setFormData({
      name: script.name,
      location: script.location,
      content: script.content,
      enabled: script.enabled,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      name: "",
      location: "head",
      content: "",
      enabled: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      showToast("error", "Name and Content are required.");
      return;
    }
    setSubmitting(true);
    try {
      const url = editId ? `/api/admin/scripts/${editId}` : "/api/admin/scripts";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", editId ? "Script updated!" : "Script created!");
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
    if (!confirm("Delete this script?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/scripts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Script removed.");
        setScripts((prev) => prev.filter((s) => s._id !== id));
      }
    } catch {
      showToast("error", "Network error.");
    } finally {
      setDeleting(null);
    }
  };

  const toggleStatus = async (script: InjectedScript) => {
    try {
      const res = await fetch(`/api/admin/scripts/${script._id}`, {
        method: "PUT",
        body: JSON.stringify({ enabled: !script.enabled }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setScripts((prev) =>
          prev.map((s) => (s._id === script._id ? { ...s, enabled: !s.enabled } : s))
        );
      }
    } catch {
      showToast("error", "Failed to toggle status.");
    }
  };

  const filteredScripts = scripts.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
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
            <h1 className="text-3xl font-bold text-white tracking-tight">Script Injection Manager</h1>
            <p className="text-gray-400 text-sm mt-0.5">Manage custom head and body scripts securely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111111] border border-white/10 rounded-3xl p-8 h-fit">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-400" /> {editId ? "Edit Script" : "Add New Script"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Script Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Google Analytics" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 text-sm" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Injection Location</label>
                <select name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 text-sm">
                  <option value="head">Head (Before {"</head>"})</option>
                  <option value="body">Body (Before {"</body>"})</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Script Content</label>
                <div className="relative">
                  <textarea name="content" value={formData.content} onChange={handleInputChange} rows={8} placeholder="<script>...</script>" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-purple-500/50 text-sm font-mono resize-none" />
                  <div className="absolute top-3 right-3 opacity-20 pointer-events-none">
                    <Code size={16} />
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-gray-500 flex items-center gap-1.5">
                  <ShieldAlert size={12} className="text-yellow-500" />
                  Only <code className="bg-white/5 px-1 rounded">{"<script>"}</code> and <code className="bg-white/5 px-1 rounded">{"<meta>"}</code> tags are allowed.
                </p>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input type="checkbox" id="enabled" name="enabled" checked={formData.enabled} onChange={handleInputChange} className="w-4 h-4 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500" />
                <label htmlFor="enabled" className="text-sm text-gray-400 cursor-pointer">Enable script immediately</label>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" disabled={submitting} className="flex-1 bg-white text-black font-bold py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : editId ? "Update Script" : "Add Script"}
                </button>
                {editId && <button type="button" onClick={resetForm} className="px-6 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">Cancel</button>}
              </div>
            </form>
          </motion.div>

          {/* List */}
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search scripts..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-purple-500/50 text-sm" />
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-800" /></div>
              ) : filteredScripts.length === 0 ? (
                <div className="text-center py-20 bg-white/2 rounded-3xl border border-dashed border-white/10">
                  <Code className="w-10 h-10 text-gray-700 mx-auto mb-4 opacity-20" />
                  <p className="text-gray-500 text-sm">No scripts found</p>
                </div>
              ) : (
                filteredScripts.map((script) => (
                  <motion.div key={script._id} layout className={`group bg-[#111111] border rounded-2xl p-5 transition-all ${script.enabled ? "border-white/10 hover:border-purple-500/30" : "border-red-500/10 opacity-60"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${script.location === "head" ? "bg-blue-500/10 text-blue-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                          <Code size={16} />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">{script.name}</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Inject in {script.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => toggleStatus(script)} className={`p-2 rounded-lg transition-all ${script.enabled ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-500"}`} title={script.enabled ? "Disable" : "Enable"}>
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEdit(script)} className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(script._id)} disabled={deleting === script._id} className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                          {deleting === script._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-black/40 rounded-xl p-3 border border-white/5 overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] text-gray-600 font-mono">CODE PREVIEW</span>
                        <Eye size={12} className="text-gray-700" />
                      </div>
                      <pre className="text-[10px] text-gray-500 font-mono line-clamp-3 whitespace-pre-wrap">
                        {script.content}
                      </pre>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
    </>
  );
}
