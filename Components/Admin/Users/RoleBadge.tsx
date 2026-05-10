import React from "react";
import { Role } from "./mockData";

export default function RoleBadge({ role }: { role: Role }) {
  const roleStyles = {
    SUPER_ADMIN: "bg-red-500/10 text-red-500 border border-red-500/20",
    ADMIN: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    SEO_MANAGER: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
    CONTENT_EDITOR: "bg-green-500/10 text-green-500 border border-green-500/20",
    MARKETING_MANAGER: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
    VIEWER: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
  };

  const formattedRole = role.replace("_", " ");

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${roleStyles[role]}`}
    >
      {formattedRole}
    </span>
  );
}
