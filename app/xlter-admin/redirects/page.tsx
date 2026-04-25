"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link as LinkIcon,
  Plus,
  Trash2,
  Edit3,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Search,
  ArrowRightLeft,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface RedirectEntry {
  _id: string;
  source: string;
  destination: string;
  permanent: boolean;
  enabled: boolean;
}

export default function AdminRedirectsPage() {
  const [redirects, setRedirects] = useState<RedirectEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    permanent: true,
    enabled: true,
  });

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/redirects");
      const data = await res.json();
      if (data.success) setRedirects(data.redirects);
    } catch {
      showToast("error", "Failed to load redirects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleEdit = (entry: RedirectEntry) => {
    setEditId(entry._id);
    setFormData({
      source: entry.source,
      destination: entry.destination,
      permanent: entry.permanent,
      enabled: entry.enabled,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      source: "",
      destination: "",
      permanent: true,
      enabled: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.source || !formData.destination) {
      showToast("error", "Source and Destination are required.");
      return;
    }
    setSubmitting(true);
    try {
      const url = editId ? `/api/admin/redirects/${editId}` : "/api/admin/redirects";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", editId ? "Redirect updated!" : "Redirect created!");
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
    if (!confirm("Delete this redirect?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/redirects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Redirect removed.");
        setRedirects((prev) => prev.filter((r) => r._id !== id));
      }
    } catch {
      showToast("error", "Network error.");
    } finally {
      setDeleting(null);
    }
  };

  const filteredRedirects = redirects.filter(
    (r) =>
      r.source.toLowerCase().includes(search.toLowerCase()) ||
      r.destination.toLowerCase().includes(search.toLowerCase())
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
            <h1 className="text-3xl font-bold text-white tracking-tight">Redirect Manager</h1>
            <p className="text-gray-400 text-sm mt-0.5">Manage 301 and 302 URL redirects</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111111] border border-white/10 rounded-3xl p-8 h-fit">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-blue-400" /> {editId ? "Edit Redirect" : "Create Redirect"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Source Path</label>
                <div className="relative">
                  <span className="absolute left-4 inset-y-0 flex items-center text-gray-500 text-sm">/</span>
                  <input type="text" name="source" value={formData.source.startsWith("/") ? formData.source.substring(1) : formData.source} onChange={(e) => setFormData({...formData, source: "/" + e.target.value.replace(/^\//, "")})} placeholder="old-page" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-7 pr-4 outline-none focus:border-blue-500/50 text-sm" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Destination URL/Path</label>
                <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} placeholder="/new-page or https://..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-500/50 text-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Redirect Type</label>
                  <select name="permanent" value={formData.permanent.toString()} onChange={(e) => setFormData({...formData, permanent: e.target.value === "true"})} className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-500/50 text-sm">
                    <option value="true">301 (Permanent)</option>
                    <option value="false">302 (Temporary)</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="enabled" name="enabled" checked={formData.enabled} onChange={handleInputChange} className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="enabled" className="text-sm text-gray-400 cursor-pointer">Enabled</label>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" disabled={submitting} className="flex-1 bg-white text-black font-bold py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : editId ? "Update Redirect" : "Save Redirect"}
                </button>
                {editId && <button type="button" onClick={resetForm} className="px-6 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">Cancel</button>}
              </div>
            </form>
          </motion.div>

          {/* List */}
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search routes..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50 text-sm" />
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-800" /></div>
              ) : filteredRedirects.length === 0 ? (
                <div className="text-center py-20 bg-white/2 rounded-3xl border border-dashed border-white/10">
                  <LinkIcon className="w-10 h-10 text-gray-700 mx-auto mb-4 opacity-20" />
                  <p className="text-gray-500 text-sm">No redirects found</p>
                </div>
              ) : (
                filteredRedirects.map((entry) => (
                  <motion.div key={entry._id} layout className={`group bg-[#111111] border rounded-2xl p-5 transition-all ${entry.enabled ? "border-white/10 hover:border-blue-500/30" : "border-red-500/10 opacity-60"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${entry.permanent ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"}`}>
                          {entry.permanent ? "301" : "302"}
                        </div>
                        {!entry.enabled && <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Disabled</span>}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleEdit(entry)} className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(entry._id)} disabled={deleting === entry._id} className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                          {deleting === entry._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">From</p>
                        <p className="text-white font-mono truncate">{entry.source}</p>
                      </div>
                      <div className="shrink-0 text-gray-700">
                        <ArrowRightLeft size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">To</p>
                        <div className="flex items-center gap-1 text-white font-mono truncate">
                          <span className="truncate">{entry.destination}</span>
                          <ExternalLink size={10} className="opacity-30" />
                        </div>
                      </div>
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
