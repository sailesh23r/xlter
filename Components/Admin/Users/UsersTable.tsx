import React from "react";
import { User, Role } from "./mockData";
import RoleBadge from "./RoleBadge";
import SessionStatus from "./SessionStatus";
import UserActionsMenu from "./UserActionsMenu";

interface UsersTableProps {
  users: User[];
  currentUserRole: Role;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSuspend: (user: User) => void;
  onResetPassword: (user: User) => void;
}

export default function UsersTable({
  users,
  currentUserRole,
  onEdit,
  onDelete,
  onSuspend,
  onResetPassword,
}: UsersTableProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md">
      <table className="w-full whitespace-nowrap text-left text-sm">
        <thead className="border-b border-white/10 bg-white/5">
          <tr>
            <th className="px-6 py-4 font-semibold text-slate-300">User</th>
            <th className="px-6 py-4 font-semibold text-slate-300">Role & Status</th>
            <th className="px-6 py-4 font-semibold text-slate-300">Security</th>
            <th className="px-6 py-4 font-semibold text-slate-300">Activity</th>
            <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-slate-400">
                No users found matching your criteria.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-white/5 group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2 items-start">
                    <RoleBadge role={user.role} />
                    <span
                      className={`text-xs font-medium ${
                        user.status === "ACTIVE"
                          ? "text-green-500"
                          : user.status === "SUSPENDED"
                          ? "text-red-500"
                          : "text-amber-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <SessionStatus
                    twoFactorEnabled={user.twoFactorEnabled}
                    failedAttempts={user.failedAttempts}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-300">
                      <span className="text-slate-500">Last Login:</span>{" "}
                      {formatDate(user.lastLogin)}
                    </span>
                    <span className="text-xs text-slate-300">
                      <span className="text-slate-500">Created:</span>{" "}
                      {formatDate(user.createdDate)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <UserActionsMenu
                    user={user}
                    currentUserRole={currentUserRole}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSuspend={onSuspend}
                    onResetPassword={onResetPassword}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
