import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, Trash2, ShieldOff, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Role } from "./mockData";

interface UserActionsMenuProps {
  user: User;
  currentUserRole: Role;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSuspend: (user: User) => void;
  onResetPassword: (user: User) => void;
}

export default function UserActionsMenu({
  user,
  currentUserRole,
  onEdit,
  onDelete,
  onSuspend,
  onResetPassword,
}: UserActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isSuperAdmin = currentUserRole === "SUPER_ADMIN";
  const canEdit = isSuperAdmin || currentUserRole === "ADMIN";
  const canDelete = isSuperAdmin;
  const canSuspend = isSuperAdmin || currentUserRole === "ADMIN";
  const canResetPassword = isSuperAdmin;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-white/10 bg-[#0c1024] p-1 shadow-xl backdrop-blur-xl"
          >
            {canEdit && (
              <button
                onClick={() => {
                  onEdit(user);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                Edit User
              </button>
            )}

            {canSuspend && (
              <button
                onClick={() => {
                  onSuspend(user);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-amber-500 hover:bg-amber-500/10 transition-colors"
              >
                <ShieldOff className="h-4 w-4" />
                {user.status === "SUSPENDED" ? "Unsuspend" : "Suspend"}
              </button>
            )}

            {canResetPassword && (
              <button
                onClick={() => {
                  onResetPassword(user);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <KeyRound className="h-4 w-4" />
                Reset Password
              </button>
            )}

            {canDelete && (
              <>
                <div className="my-1 h-px bg-white/10" />
                <button
                  onClick={() => {
                    onDelete(user);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete User
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
