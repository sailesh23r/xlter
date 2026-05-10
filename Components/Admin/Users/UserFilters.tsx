import React from "react";
import { Search, Filter } from "lucide-react";
import { Role, UserStatus } from "./mockData";

interface UserFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  roleFilter: Role | "ALL";
  setRoleFilter: (val: Role | "ALL") => void;
  statusFilter: UserStatus | "ALL";
  setStatusFilter: (val: UserStatus | "ALL") => void;
}

export default function UserFilters({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
      <div className="relative w-full sm:w-96">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-full border border-white/10 bg-black/20 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div className="flex w-full sm:w-auto items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Filter className="h-4 w-4" />
          <span>Filters:</span>
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as Role | "ALL")}
          className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none min-w-[140px]"
        >
          <option value="ALL">All Roles</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="SEO_MANAGER">SEO Manager</option>
          <option value="CONTENT_EDITOR">Content Editor</option>
          <option value="MARKETING_MANAGER">Marketing Manager</option>
          <option value="VIEWER">Viewer</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as UserStatus | "ALL")}
          className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none min-w-[120px]"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="INVITED">Invited</option>
        </select>
      </div>
    </div>
  );
}
