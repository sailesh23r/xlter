"use client";

import { useState, useCallback, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import type { FAQItem } from "./types";

interface FAQManagerProps {
  faqs: FAQItem[];
  onChange: (faqs: FAQItem[]) => void;
}

export function FAQManager({ faqs, onChange }: FAQManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ question: string; answer: string }>({ question: "", answer: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });

  const handleAdd = () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim()) return;
    const item: FAQItem = {
      id: crypto.randomUUID(),
      question: newFAQ.question.trim(),
      answer: newFAQ.answer.trim(),
    };
    onChange([...faqs, item]);
    setNewFAQ({ question: "", answer: "" });
    setIsAdding(false);
  };

  const handleEdit = (faq: FAQItem) => {
    setEditingId(faq.id);
    setDraft({ question: faq.question, answer: faq.answer });
  };

  const handleSaveEdit = (id: string) => {
    onChange(faqs.map((f) => (f.id === id ? { ...f, ...draft } : f)));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    onChange(faqs.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          FAQ Items <span className="text-blue-400 ml-2">{faqs.length}</span>
        </p>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600/20 transition-all"
        >
          <Plus size={12} /> Add FAQ
        </button>
      </div>

      {/* Add New FAQ */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-5 space-y-3 overflow-hidden"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">New FAQ</p>
            <input
              type="text"
              value={newFAQ.question}
              onChange={(e) => setNewFAQ((p) => ({ ...p, question: e.target.value }))}
              placeholder="Question"
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500/50"
            />
            <textarea
              value={newFAQ.answer}
              onChange={(e) => setNewFAQ((p) => ({ ...p, answer: e.target.value }))}
              placeholder="Answer"
              rows={3}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500/50 resize-none leading-relaxed"
            />
            <div className="flex gap-3">
              <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                <Check size={12} /> Save
              </button>
              <button onClick={() => { setIsAdding(false); setNewFAQ({ question: "", answer: "" }); }} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-xs font-black hover:text-white transition-all">
                <X size={12} /> Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ List */}
      <div className="space-y-3">
        <AnimatePresence>
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden"
            >
              {editingId === faq.id ? (
                <div className="p-5 space-y-3">
                  <input
                    type="text"
                    value={draft.question}
                    onChange={(e) => setDraft((p) => ({ ...p, question: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500/50"
                  />
                  <textarea
                    value={draft.answer}
                    onChange={(e) => setDraft((p) => ({ ...p, answer: e.target.value }))}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500/50 resize-none leading-relaxed"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleSaveEdit(faq.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all">
                      <Check size={11} /> Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-xs font-bold hover:text-white transition-all">
                      <X size={11} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-white pr-4 leading-snug">{faq.question}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-gray-600 font-bold">#{i + 1}</span>
                      {expandedId === faq.id ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 border-t border-white/5 pt-4">
                          <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                          <div className="flex gap-2 mt-4">
                            <button onClick={() => handleEdit(faq)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-xs font-bold hover:text-white transition-all">
                              <Edit3 size={11} /> Edit
                            </button>
                            <button onClick={() => handleDelete(faq.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/5 border border-red-500/10 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/10 transition-all">
                              <Trash2 size={11} /> Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {faqs.length === 0 && !isAdding && (
          <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-gray-600 text-sm">
            No FAQs yet. Click "Add FAQ" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
