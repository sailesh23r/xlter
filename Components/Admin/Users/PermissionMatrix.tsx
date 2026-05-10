import React from "react";
import { Check, X, Shield } from "lucide-react";

export default function PermissionMatrix() {
  const roles = ["SUPER_ADMIN", "ADMIN", "SEO_MANAGER", "CONTENT_EDITOR", "MARKETING_MANAGER"];
  const modules = [
    "pages",
    "blogs",
    "SEO",
    "redirects",
    "analytics",
    "users",
    "scripts",
    "backups",
  ];

  const hasPermission = (role: string, module: string) => {
    if (role === "SUPER_ADMIN") return true;
    if (role === "ADMIN") return ["pages", "blogs", "analytics"].includes(module);
    if (role === "SEO_MANAGER") return ["SEO", "redirects", "analytics"].includes(module);
    if (role === "CONTENT_EDITOR") return ["blogs", "pages"].includes(module);
    if (role === "MARKETING_MANAGER") return ["analytics", "scripts"].includes(module);
    return false;
  };

  const getRoleLabel = (role: string) => role.replace("_", " ");

  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-md overflow-x-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
          <Shield className="h-5 w-5 text-purple-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Advanced RBAC Matrix</h3>
          <p className="text-xs text-slate-400">Role-Based Access Control Permissions</p>
        </div>
      </div>

      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-3 px-4 font-semibold text-slate-300">Module</th>
            {roles.map((role) => (
              <th key={role} className="py-3 px-4 font-semibold text-slate-300 text-center">
                {getRoleLabel(role)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {modules.map((module) => (
            <tr key={module} className="hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-medium text-slate-300 capitalize">{module}</td>
              {roles.map((role) => {
                const isGranted = hasPermission(role, module);
                return (
                  <td key={`${module}-${role}`} className="py-3 px-4 text-center">
                    {isGranted ? (
                      <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    ) : (
                      <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-slate-500/20 text-slate-500">
                        <X className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
