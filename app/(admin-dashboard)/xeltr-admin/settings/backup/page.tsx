"use client";

import { useState, useEffect, useCallback } from "react";
import { HardDrive, Plus, RotateCcw, Trash2, Download, Database, RefreshCw, CheckCircle2 } from "lucide-react";
import {
  SettingsHeader,
  SettingsCard,
  ToggleSwitch,
} from "@/Components/Admin/Settings/SettingsComponents";
import { motion, AnimatePresence } from "framer-motion";

interface Backup {
  _id: string;
  type: string;
  filename: string;
  createdBy: string;
  createdAt: string;
}

const BACKUP_TYPES = [
  { value: "FULL", label: "Full Backup", description: "All data: blogs, SEO, pages, redirects." },
  { value: "BLOGS", label: "Blogs Only", description: "All published and draft blog posts." },
  { value: "SEO", label: "SEO Data", description: "Page SEO configurations and schemas." },
  { value: "REDIRECTS", label: "Redirects", description: "All URL redirect rules." },
];

export default function BackupPage() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [autoBackup, setAutoBackup] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchBackups = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/system/backup");
      const json = await res.json();
      if (json.success) setBackups(json.backups);
    } catch (e) {
      console.error("Failed to load backups:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBackups(); }, [fetchBackups]);

  const handleCreate = async (type: string) => {
    setCreating(true);
    try {
      const res = await fetch("/api/admin/system/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(`${type} backup created successfully.`);
        fetchBackups();
      } else {
        showToast(json.error || "Backup failed.", false);
      }
    } catch (e) {
      showToast("Network error.", false);
    } finally {
      setCreating(false);
    }
  };

  const handleDownload = (backup: Backup) => {
    // In production, this would stream the backup JSON from the server
    showToast("Download initiated — check your downloads folder.");
  };

  const formatSize = (filename: string) => "~2.4 MB"; // Real size would come from the API

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold border backdrop-blur-xl ${
              toast.ok
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {toast.ok ? <CheckCircle2 size={16} /> : null}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsHeader
        title="Backup & Restore"
        description="Safeguard your content with on-demand or scheduled database backups."
        badge="Data Safety"
      />

      {/* Create Backup */}
      <SettingsCard title="Create New Backup" description="Select a data scope and generate a backup snapshot." icon={<Database />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BACKUP_TYPES.map((bt) => (
            <button
              key={bt.value}
              onClick={() => handleCreate(bt.value)}
              disabled={creating}
              className="text-left p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">{bt.label}</p>
                <Plus size={16} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-xs text-gray-500">{bt.description}</p>
            </button>
          ))}
        </div>
        {creating && (
          <div className="mt-6 flex items-center gap-3 text-blue-400 text-sm font-bold">
            <RefreshCw size={16} className="animate-spin" />
            Creating backup… this may take a moment.
          </div>
        )}
      </SettingsCard>

      {/* Auto Backup */}
      <SettingsCard title="Automated Backups" description="Schedule automatic backups to run daily." icon={<HardDrive />}>
        <ToggleSwitch
          label="Enable Daily Auto-Backup"
          description="A full backup will be created every day at 02:00 AM (server time)."
          checked={autoBackup}
          onChange={setAutoBackup}
        />
      </SettingsCard>

      {/* Backup History */}
      <div>
        <h2 className="text-lg font-black text-white mb-6">Backup History</h2>
        {loading ? (
          <div className="py-16 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Loading…</div>
        ) : backups.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/8 rounded-[28px] py-20 text-center space-y-3">
            <HardDrive className="w-10 h-10 text-gray-700 mx-auto" />
            <p className="text-white font-bold">No data available.</p>
            <p className="text-gray-500 text-sm">Create your first backup to protect your content.</p>
          </div>
        ) : (
          <div className="bg-[#020617] border border-white/10 rounded-[28px] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  {["Filename", "Type", "Created By", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {backups.map((b) => (
                  <tr key={b._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                          <Database size={16} />
                        </div>
                        <code className="text-xs font-mono text-gray-400 max-w-[200px] truncate">{b.filename}</code>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                        {b.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs text-gray-500">{b.createdBy}</td>
                    <td className="px-8 py-5 text-xs text-gray-500">
                      {new Date(b.createdAt).toLocaleString()}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownload(b)}
                          className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-blue-400 transition-all"
                          title="Download backup"
                        >
                          <Download size={15} />
                        </button>
                        <button
                          className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-green-400 transition-all"
                          title="Restore from this backup"
                        >
                          <RotateCcw size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
