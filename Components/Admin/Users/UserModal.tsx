import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ShieldAlert } from "lucide-react";
import { User, Role, UserStatus } from "./mockData";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
  initialData?: User | null;
  currentUserRole: Role;
}

export default function UserModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  currentUserRole,
}: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User>>(
    initialData || {
      name: "",
      email: "",
      role: "VIEWER",
      status: "ACTIVE",
    }
  );

  const isSuperAdmin = currentUserRole === "SUPER_ADMIN";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#080b1a] shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white">
                  {initialData ? "Edit User" : "Create New User"}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                <form id="user-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Avatar Upload area */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group overflow-hidden">
                      {formData.avatar ? (
                        <img src={formData.avatar} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <Upload className="h-6 w-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">Change</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">Profile Image</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    {!initialData && (
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-300">
                          Password
                        </label>
                        <input
                          required
                          type="password"
                          name="password"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-300">
                          Role
                        </label>
                        <select
                          name="role"
                          value={formData.role || "VIEWER"}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-[#0f1428] px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                          {isSuperAdmin && <option value="SUPER_ADMIN">Super Admin</option>}
                          <option value="ADMIN">Admin</option>
                          <option value="SEO_MANAGER">SEO Manager</option>
                          <option value="CONTENT_EDITOR">Content Editor</option>
                          <option value="MARKETING_MANAGER">Marketing Manager</option>
                          <option value="VIEWER">Viewer</option>
                        </select>
                        {!isSuperAdmin && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-500">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            <span>Only Super Admins can assign Super Admin role.</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-300">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status || "ACTIVE"}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-[#0f1428] px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="SUSPENDED">Suspended</option>
                          <option value="INVITED">Invited</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="border-t border-white/10 p-6 flex justify-end gap-3 bg-white/[0.02]">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="user-form"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  {initialData ? "Save Changes" : "Create User"}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
