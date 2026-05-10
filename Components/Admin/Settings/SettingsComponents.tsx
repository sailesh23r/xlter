"use client";

import React from "react";
import { motion } from "framer-motion";
import { Save, RefreshCw, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

// ─── Settings Page Header ────────────────────────────────────────────────────
export const SettingsHeader = ({
  title,
  description,
  badge,
  actions,
}: {
  title: string;
  description: string;
  badge?: string;
  actions?: React.ReactNode;
}) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/5">
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-black text-white tracking-tight">{title}</h1>
        {badge && (
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest">
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-500 text-sm leading-relaxed max-w-lg">{description}</p>
    </div>
    {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
  </div>
);

// ─── Settings Card (glass) ────────────────────────────────────────────────────
export const SettingsCard = ({
  title,
  description,
  icon,
  children,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-white/[0.02] border border-white/8 rounded-[28px] p-8 backdrop-blur-sm hover:border-white/15 transition-colors duration-300">
    {(title || icon) && (
      <div className="flex items-start gap-4 mb-8 pb-6 border-b border-white/5">
        {icon && (
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
          </div>
        )}
        <div>
          {title && <h3 className="text-base font-black text-white">{title}</h3>}
          {description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>}
        </div>
      </div>
    )}
    {children}
  </div>
);

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
export const ToggleSwitch = ({
  label,
  description,
  checked,
  onChange,
  danger = false,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  danger?: boolean;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
    <div className="space-y-0.5 pr-8">
      <p className="text-sm font-bold text-white">{label}</p>
      {description && <p className="text-xs text-gray-500 leading-relaxed">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-all duration-300 ${
        checked
          ? danger
            ? "bg-red-500"
            : "bg-blue-500"
          : "bg-white/10"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-lg ${
          checked ? "right-1" : "left-1"
        }`}
      />
    </button>
  </div>
);

// ─── Text Input Field ──────────────────────────────────────────────────────────
export const SettingsInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  hint,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
      {label} {required && <span className="text-blue-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/60 transition-colors placeholder:text-gray-700"
    />
    {hint && <p className="text-[10px] text-gray-600">{hint}</p>}
  </div>
);

// ─── Textarea Field ────────────────────────────────────────────────────────────
export const SettingsTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/60 transition-colors resize-none placeholder:text-gray-700"
    />
    {hint && <p className="text-[10px] text-gray-600">{hint}</p>}
  </div>
);

// ─── Select Field ──────────────────────────────────────────────────────────────
export const SettingsSelect = ({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/60 transition-colors appearance-none cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-[#020617]">
          {opt.label}
        </option>
      ))}
    </select>
    {hint && <p className="text-[10px] text-gray-600">{hint}</p>}
  </div>
);

// ─── Upload Field ──────────────────────────────────────────────────────────────
export const UploadField = ({
  label,
  currentUrl,
  accept = "image/*",
  hint,
}: {
  label: string;
  currentUrl?: string;
  accept?: string;
  hint?: string;
}) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{label}</label>
    <div className="flex items-center gap-4">
      {currentUrl && (
        <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentUrl} alt={label} className="w-full h-full object-contain" />
        </div>
      )}
      <label className="flex-1 cursor-pointer">
        <div className="flex items-center justify-center gap-2 border-2 border-dashed border-white/10 hover:border-blue-500/40 rounded-2xl py-5 px-6 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-blue-400 transition-all">
          Upload {label}
        </div>
        <input type="file" accept={accept} className="hidden" />
      </label>
    </div>
    {hint && <p className="text-[10px] text-gray-600">{hint}</p>}
  </div>
);

// ─── Security Badge ────────────────────────────────────────────────────────────
export const SecurityBadge = ({
  status,
  label,
}: {
  status: "secure" | "warning" | "danger";
  label: string;
}) => {
  const map = {
    secure: { icon: CheckCircle2, cls: "text-green-400 bg-green-500/10 border-green-500/20" },
    warning: { icon: AlertTriangle, cls: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
    danger: { icon: AlertTriangle, cls: "text-red-400 bg-red-500/10 border-red-500/20" },
  };
  const { icon: Icon, cls } = map[status];
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${cls}`}>
      <Icon size={12} />
      {label}
    </div>
  );
};

// ─── Save Button ──────────────────────────────────────────────────────────────
export const SaveButton = ({
  onClick,
  loading,
  label = "Save Changes",
}: {
  onClick: () => void;
  loading: boolean;
  label?: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    disabled={loading}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-colors shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs disabled:opacity-60"
  >
    {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
    {loading ? "Saving..." : label}
  </motion.button>
);

// ─── Integration Card ─────────────────────────────────────────────────────────
export const IntegrationCard = ({
  icon,
  name,
  description,
  connected,
  children,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  connected: boolean;
  children?: React.ReactNode;
}) => (
  <div className={`rounded-[24px] border p-6 transition-all ${connected ? "border-blue-500/30 bg-blue-500/5" : "border-white/8 bg-white/[0.02]"}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 text-xl">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-gray-700"}`} />
    </div>
    {children && <div className="mt-4 pt-4 border-t border-white/5 space-y-3">{children}</div>}
  </div>
);

// ─── Number Input ──────────────────────────────────────────────────────────────
export const SettingsNumberInput = ({
  label,
  value,
  onChange,
  min,
  max,
  hint,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  hint?: string;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{label}</label>
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/60 transition-colors"
    />
    {hint && <p className="text-[10px] text-gray-600">{hint}</p>}
  </div>
);
