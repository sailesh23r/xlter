import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteConfirmModalProps) {
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#080b1a] p-6 shadow-2xl pointer-events-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-red-500">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Delete User</h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mb-8 text-slate-300">
                Are you sure you want to delete <strong className="text-white">{userName}</strong>? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  Delete User
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
