"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  ShieldCheck,
  X,
  RefreshCw,
  Crown,
  Eye,
  PenLine,
  Search,
} from "lucide-react";
import {
  SettingsHeader,
  SettingsCard,
  SettingsInput,
  SettingsSelect,
  SaveButton,
} from "@/Components/Admin/Settings/SettingsComponents";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin", icon: Crown, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { value: "ADMIN", label: "Admin", icon: ShieldCheck, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { value: "SEO_MANAGER", label: "SEO Manager", icon: Search, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { value: "EDITOR", label: "Editor", icon: PenLine, color: "text-green-400 bg-green-500/10 border-green-500/20" },
  { value: "VIEWER", label: "Viewer", icon: Eye, color: "text-gray-400 bg-gray-500/10 border-gray-500/20" },
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: ["All permissions — full system access"],
  ADMIN: ["Content", "SEO", "Marketing", "Settings (partial)"],
  SEO_MANAGER: ["SEO module", "Schema", "Redirects", "Header Scripts"],
  EDITOR: ["Blogs", "Case Studies", "Testimonials"],
  VIEWER: ["Read-only access to all modules"],
};

const RoleBadge = ({ role }: { role: string }) => {
  const match = ROLES.find((r) => r.value === role);
  if (!match) return <span className="text-xs text-gray-500">{role}</span>;
  const { icon: Icon, color } = match;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${color}`}>
      <Icon size={10} />
      {match.label}
    </span>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "EDITOR" });

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/system/users");
      const json = await res.json();
      if (json.success) setUsers(json.users);
    } catch (e) {
      console.error("Failed to load users:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const openCreate = () => {
    setEditUser(null);
    setForm({ name: "", email: "", password: "", role: "EDITOR" });
    setIsModalOpen(true);
  };

  const openEdit = (user: User) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editUser ? "PUT" : "POST";
      const url = editUser
        ? `/api/admin/system/users?id=${editUser._id}`
        : "/api/admin/system/users";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchUsers();
      } else {
        alert(json.error || "Operation failed");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/system/users?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) fetchUsers();
      else alert(json.error);
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader
        title="Users & Roles"
        description="Manage admin accounts and assign role-based permissions."
        badge="RBAC"
        actions={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-colors shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
          >
            <Plus size={16} /> Add User
          </button>
        }
      />

      {/* Role Matrix */}
      <SettingsCard title="Role Permissions Matrix" description="Reference guide for what each role can access." icon={<ShieldCheck />}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ROLES.map(({ value, label, icon: Icon, color }) => (
            <div key={value} className={`rounded-2xl border p-5 ${color.split(" ").slice(1).join(" ")}`}>
              <div className={`flex items-center gap-2 mb-3 font-black text-xs uppercase tracking-widest ${color.split(" ")[0]}`}>
                <Icon size={14} /> {label}
              </div>
              <ul className="space-y-1">
                {ROLE_PERMISSIONS[value].map((perm) => (
                  <li key={perm} className="text-[10px] text-gray-500 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Users Table */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-white">All Administrators</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-10 pr-5 text-sm text-white outline-none focus:border-blue-500/50 w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/8 rounded-[28px] py-20 text-center space-y-3">
            <Users className="w-10 h-10 text-gray-700 mx-auto" />
            <p className="text-white font-bold">No data available.</p>
            <p className="text-gray-500 text-sm">Add your first admin user to get started.</p>
          </div>
        ) : (
          <div className="bg-[#020617] border border-white/10 rounded-[28px] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  {["User", "Role", "Joined", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((user) => (
                  <tr key={user._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/20 border border-white/10 flex items-center justify-center font-black text-sm text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{user.name}</p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5"><RoleBadge role={user.role} /></td>
                    <td className="px-8 py-5 text-xs text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(user)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all"><Edit size={15} /></button>
                        <button onClick={() => handleDelete(user._id)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-red-400 transition-all"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md bg-[#020617] border border-white/10 rounded-[3rem] p-10 space-y-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-black text-white">{editUser ? "Edit User" : "Create Admin User"}</h3>
                <p className="text-xs text-gray-500 mt-1">Assign roles to control access levels.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-all"><X size={22} /></button>
            </div>

            <SettingsInput label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required placeholder="Jane Doe" />
            <SettingsInput label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required placeholder="jane@studio.com" />
            <SettingsInput label={editUser ? "New Password (optional)" : "Password"} type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required={!editUser} placeholder="Min. 8 characters" />
            <SettingsSelect
              label="Role"
              value={form.role}
              onChange={(v) => setForm({ ...form, role: v })}
              options={ROLES.map((r) => ({ value: r.value, label: r.label }))}
            />

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-white/5 border border-white/10 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <RefreshCw size={14} className="animate-spin" /> : null}
                {saving ? "Saving…" : editUser ? "Update User" : "Create User"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
